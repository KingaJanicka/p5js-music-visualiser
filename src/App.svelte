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
  let color_shift_r: GLfloat = $state(0.5);
  let color_shift_g: GLfloat = $state(0.5);
  let color_shift_b: GLfloat = $state(0.5);

  const sketch: Sketch = (p5) => {
    // P5js vars
    let capture: p5.Element;
    let canvas: p5.Renderer;
    let exposureFilter: any;
    // let hueShiftFilter: any;
    let contrastMatrixFilter: any;

    let constraints = {
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720,
        },
        optional: [{ maxFrameRate: 60 }],
      },
      audio: false,
    };

    //This is the init call for p5js
    p5.setup = () => {
      canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight, "webgl");
      capture = p5.createCapture(constraints);
      /* @ts-expect-error shrug */
      exposureFilter = p5.createFilterShader(exposure);
      // /* @ts-expect-error shrug */
      // hueShiftFilter = p5.createFilterShader(hueShift);
      /* @ts-expect-error shrug */
      contrastMatrixFilter = p5.createFilterShader(contrastMatrix);
    };

    p5.draw = () => {
      p5.image(
        capture,
        -capture.width / 2,
        -capture.height / 2,
        capture.width,
        capture.height,
      );
      // p5.filter("invert");
      // p5.filter("blur", 0.85);
      // p5.filter("gray");

      exposureFilter.setUniform("lightness", expoureVal);
      p5.filter(exposureFilter);

      // hueShiftFilter.setUniform("angle", 0.5);
      // p5.filter(hueShiftFilter);

      contrastMatrixFilter.setUniform("red", color_shift_r);
      contrastMatrixFilter.setUniform("green", color_shift_g);
      contrastMatrixFilter.setUniform("blue", color_shift_b);
      p5.filter(contrastMatrixFilter);
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
      <p>Exposure</p>
      <input
        type="range"
        step="0.01"
        bind:value={expoureVal}
        min="-2.5"
        max="2.5"
      />
    </div>
    <div>
      <p>Red</p>
      <input
        type="range"
        step="0.01"
        bind:value={color_shift_r}
        min="0"
        max="1"
      />
    </div>
    <div>
      <p>Green</p>
      <input
        type="range"
        step="0.01"
        bind:value={color_shift_g}
        min="0"
        max="1"
      />
    </div>
    <div>
      <p>Blue</p>
      <input
        type="range"
        step="0.01"
        bind:value={color_shift_b}
        min="0"
        max="1"
      />
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
