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
  import VerticalSlider from "./components/verticalSlider/verticalSlider.svelte";
  import ToggleButton from "./components/toggleButton/toggleButton.svelte";

  let frameRate: number = 60;
  let prevFrame, nextFrame;
  let video_path = "/cat_pupils.webm";

  //Declerations for colour page
  let colorShiftRDefault: GLfloat = 0.5;
  let colorShiftR: GLfloat = $state(colorShiftRDefault);
  let colorShiftGDefault: GLfloat = 0.5;
  let colorShiftG: GLfloat = $state(colorShiftGDefault);
  let colorShiftBDefault: GLfloat = 0.5;
  let colorShiftB: GLfloat = $state(colorShiftBDefault);
  let colorShiftBrightnessDefault: GLfloat = 0;
  let colorShiftBrightness: GLfloat = $state(colorShiftBrightnessDefault);
  let colorShiftContrastDefault: GLfloat = -0.5;
  let colorShiftContrast: GLfloat = $state(colorShiftContrastDefault);

  //Declerations for Feedback page
  let translateXDefault: number = 0;
  let translateX: number = $state(translateXDefault);
  let translateYDefault: number = 0;
  let translateY: number = $state(translateYDefault);
  let feedbackWindowSizeDefault: number = 1;
  let feedbackWindowSize: number = $state(feedbackWindowSizeDefault);
  let feedbackOpacityDefault: number = 127;
  let feedbackOpacity: number = $state(feedbackOpacityDefault);
  let feedbackInvertDefault: boolean = false;
  let feedbackInvert: boolean = $state(feedbackInvertDefault);
  let feedbackRotationDefault: number = 0;
  let feedbackRotation: number = $state(feedbackRotationDefault);

  const sketch: Sketch = (p5) => {
    // P5js vars
    let capture: p5.Element;
    let canvas: p5.Renderer;
    let exposureFilter: any;
    // let hueShiftFilter: any;
    let contrastMatrixFilter: any;
    let video: p5.MediaElement;
    //This is the init call for p5js
    p5.setup = () => {
      canvas = p5.createCanvas(640, 480, "webgl");
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
      video = p5.createVideo([video_path]);
      /* @ts-expect-error shrug */
      exposureFilter = p5.createFilterShader(exposure);
      // /* @ts-expect-error shrug */
      // hueShiftFilter = p5.createFilterShader(hueShift);
      /* @ts-expect-error shrug */
      contrastMatrixFilter = p5.createFilterShader(contrastMatrix);
      prevFrame = p5.createFramebuffer({ format: p5.FLOAT });
      nextFrame = p5.createFramebuffer({ format: p5.FLOAT });
      // p5.imageMode(p5.CENTER);
      video.loop();
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
        video,
        -capture.width / 2,
        -capture.height / 2,
        capture.width,
        capture.height,
      );
      p5.tint(255, feedbackOpacity);
      p5.rotate(feedbackRotation);
      p5.push();
      p5.pop();
      p5.image(
        prevFrame,
        (-capture.width * feedbackWindowSize) / 2 + translateX,
        (-capture.height * feedbackWindowSize) / 2 + translateY,
        capture.width * feedbackWindowSize,
        capture.height * feedbackWindowSize,
      );
      p5.tint(255, 255);
      if (feedbackInvert == true) {
        // the invert makes things look rather cool
        p5.filter("invert");
      }
      // This is responsible for the main image
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
      //This inverts the inversion, so only the feedback path is inverted
      if (feedbackInvert == true) {
        p5.filter("invert");
      }
    };
  };
</script>

<svelte:head>
  <script src="https://lygia.xyz/resolve.js"></script>
</svelte:head>

<main>
  <h1>p5-music-vis</h1>
  <div class="card">
    <div class="colorControls">
      <VerticalSlider
        bind:valueToBind={colorShiftBrightness}
        default={colorShiftBrightnessDefault}
        min="-2.5"
        max="2.5">Brightness</VerticalSlider
      >
      <VerticalSlider
        bind:valueToBind={colorShiftContrast}
        default={colorShiftContrastDefault}
        min="-2.5"
        max="2.5">Contrast</VerticalSlider
      >
      <VerticalSlider
        bind:valueToBind={colorShiftR}
        default={colorShiftRDefault}
        min="0"
        max="1">Red</VerticalSlider
      >
      <VerticalSlider
        bind:valueToBind={colorShiftG}
        default={colorShiftGDefault}
        min="0"
        max="1">Green</VerticalSlider
      >
      <VerticalSlider
        bind:valueToBind={colorShiftB}
        default={colorShiftBDefault}
        min="0"
        max="1">Blue</VerticalSlider
      >
    </div>
    <div class="feedbackControls">
      <VerticalSlider
        bind:valueToBind={translateX}
        default={translateXDefault}
        min="-100"
        max="100">Translate X</VerticalSlider
      >
      <VerticalSlider
        bind:valueToBind={translateY}
        default={translateYDefault}
        min="-100"
        max="100">Translate Y</VerticalSlider
      >
      <VerticalSlider
        bind:valueToBind={feedbackWindowSize}
        default={feedbackWindowSizeDefault}
        min="0"
        max="2">Feedback Size</VerticalSlider
      >
      <VerticalSlider
        bind:valueToBind={feedbackOpacity}
        default={feedbackOpacityDefault}
        min="0"
        max="255">Feedback Opacity</VerticalSlider
      >
      <ToggleButton bind:valueToBind={feedbackInvert}
        >Invert Feedback</ToggleButton
      >
      <VerticalSlider
        bind:valueToBind={feedbackRotation}
        default={feedbackRotationDefault}
        min="-3.14"
        max="3.14">Feedback Skew</VerticalSlider
      >
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
  .read-the-docs {
    color: #888;
  }
  .colorControls {
    display: flex;
    justify-content: center;
  }

  .feedbackControls {
    display: flex;
    justify-content: center;
  }
</style>
