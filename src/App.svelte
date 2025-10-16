<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import appLogo from "/favicon.svg";
  import Counter from "./lib/Counter.svelte";
  import PWABadge from "./lib/PWABadge.svelte";
  import P5, { type Sketch } from "p5-svelte";
  import type p5 from "p5";
  import exposure from "./exposure.frag";
  // import hueShift from "./hueShift.frag";
  import contrastMatrix from "./contrastMatrixCustom.frag";

  let expoureVal: GLfloat = $state(1);
  let colorShiftR: GLfloat = $state(0.5);
  let colorShiftG: GLfloat = $state(0.5);
  let colorShiftB: GLfloat = $state(0.5);
  let colorShiftBrightness: GLfloat = $state(0);
  let colorShiftContrast: GLfloat = $state(0);
  let frameRate: number = 60;
  let prevFrame, nextFrame;
  let translateX: number = $state(0);
  let translateY: number = $state(0);
  let feedbackOpacity: number = $state(127);

  const sketch: Sketch = (p5) => {
    // P5js vars
    let capture: p5.Element;
    let canvas: p5.Renderer;
    let exposureFilter: any;
    // let hueShiftFilter: any;
    let contrastMatrixFilter: any;

    //This is the init call for p5js
    p5.setup = () => {
      canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight, "webgl");
      let constraints = {
        video: {
          mandatory: {
            minWidth: canvas.width,
            minHeight: canvas.height,
          },
          optional: [{ maxFrameRate: frameRate }],
        },
        audio: false,
      };

      capture = p5.createCapture(constraints);
      /* @ts-expect-error shrug */
      exposureFilter = p5.createFilterShader(exposure);
      // /* @ts-expect-error shrug */
      // hueShiftFilter = p5.createFilterShader(hueShift);
      /* @ts-expect-error shrug */
      contrastMatrixFilter = p5.createFilterShader(contrastMatrix);
      prevFrame = p5.createFramebuffer({ format: p5.FLOAT });
      nextFrame = p5.createFramebuffer({ format: p5.FLOAT });
      // p5.imageMode(p5.CENTER);
    };

    p5.draw = () => {
      let prevNew;
      let nextNew;
      // Feedback loop
      prevNew = nextFrame;
      nextNew = prevFrame;
      nextFrame = nextNew;
      prevFrame = prevNew;

      nextFrame.begin();
      p5.clear();
      p5.push();

      p5.tint(255, 255);
      p5.image(
        capture,
        -capture.width / 2,
        -capture.height / 2,
        capture.width,
        capture.height,
      );
      p5.tint(255, feedbackOpacity);
      p5.image(
        prevFrame,
        -capture.width / 2 + translateX,
        -capture.height / 2 + translateY,
        capture.width,
        capture.height,
      );
      p5.tint(255, 255);
      // p5.filter("invert");
      // This is responsible for the main image

      // p5.filter("invert");
      // p5.filter("invert");
      // p5.filter("blur", 0.85);
      // p5.filter("gray");

      // exposureFilter.setUniform("lightness", expoureVal);
      // p5.filter(exposureFilter);

      // hueShiftFilter.setUniform("angle", 0.5);
      // p5.filter(hueShiftFilter);

      contrastMatrixFilter.setUniform("red", colorShiftR);
      contrastMatrixFilter.setUniform("green", colorShiftG);
      contrastMatrixFilter.setUniform("blue", colorShiftB);
      contrastMatrixFilter.setUniform("brightness", colorShiftBrightness);
      contrastMatrixFilter.setUniform("contrast", colorShiftContrast);
      p5.filter(contrastMatrixFilter);

      // For feedback loop
      nextFrame.end();
      p5.image(
        nextFrame,
        -capture.width / 2,
        -capture.height / 2,
        capture.width,
        capture.height,
      );
      // p5.filter("invert");
    };
  };
</script>

<svelte:head>
  <script src="https://lygia.xyz/resolve.js"></script>
</svelte:head>

<main>
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={appLogo} class="logo" alt="p5-music-vis Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>p5-music-vis</h1>

  <div class="card">
    <Counter />
    <div>
      <div>
        <p>brightness</p>
        <input
          type="range"
          step="0.01"
          bind:value={colorShiftBrightness}
          min="-2.5"
          max="2.5"
        />
      </div>
      <div>
        <p>contrast</p>
        <input
          type="range"
          step="0.01"
          bind:value={colorShiftContrast}
          min="-2.5"
          max="2.5"
        />
      </div>
      <div>
        <p>Red</p>
        <input
          type="range"
          step="0.01"
          bind:value={colorShiftR}
          min="0"
          max="1"
        />
      </div>
      <div>
        <p>Green</p>
        <input
          type="range"
          step="0.01"
          bind:value={colorShiftG}
          min="0"
          max="1"
        />
      </div>
      <div>
        <p>Blue</p>
        <input
          type="range"
          step="0.01"
          bind:value={colorShiftB}
          min="0"
          max="1"
        />
      </div>
    </div>
    <div>
      <div>
        <p>Translate X</p>
        <input
          type="range"
          step="0.01"
          bind:value={translateX}
          min="-100"
          max="100"
        />
      </div>
      <div>
        <p>Translate Y</p>
        <input
          type="range"
          step="0.01"
          bind:value={translateY}
          min="-100"
          max="100"
        />
      </div>
      <div>
        <p>Feedback Opacity</p>
        <input
          type="range"
          step="0.01"
          bind:value={feedbackOpacity}
          min="0"
          max="255"
        />
      </div>
    </div>
    <P5 {sketch} />
  </div>

  <p>
    Check out <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noreferrer">SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<PWABadge />

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
