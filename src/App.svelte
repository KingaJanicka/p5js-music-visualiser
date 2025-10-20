<script lang="ts">
  import P5, { type Sketch } from "p5-svelte";
  import type p5 from "p5";
  import exposure from "./exposure.frag";
  import contrastMatrix from "./contrastMatrixCustom.frag";
  import VerticalSlider from "./components/verticalSlider/verticalSlider.svelte";
  import ToggleButton from "./components/toggleButton/toggleButton.svelte";
  import DropdownMenu from "./components/dropdownMenu/dropdownMenu.svelte";
  import VisualizerControls from "./components/visualizerControls/visualizerControls.svelte";
  import { setContext } from "svelte";
  import {
    colorShiftR,
    colorShiftG,
    colorShiftB,
    colorShiftBrightness,
    colorShiftContrast,
    translateX,
    translateY,
    feedbackWindowSize,
    feedbackOpacity,
    feedbackInvert,
    feedbackRotation,
    videos,
  } from "./sharedStore";
  let frameRate: number = 60;
  let prevFrame: p5.Framebuffer;
  let nextFrame: p5.Framebuffer;
  let video_path = "cat_pupils.webm";
  let selectedVideoSource: string = $state("cat_pupils.webm");
  let menu: number = $state(0);
  let global_p5: p5;
  // let videos = Object.keys(import.meta.glob("../public/*.webm")).map((d) =>
  //   d.split("/").pop(),
  // );
  // videos.push("Camera");

  // P5js vars
  let capture: p5.Element;
  let canvas: p5.Renderer;
  let exposureFilter: any;
  let videoSource: p5.Element;
  let contrastMatrixFilter: any;
  let video: p5.MediaElement;

  // //Declerations for colour page
  // let colorShiftRDefault: GLfloat = 0.5;
  // let colorShiftR: GLfloat = $state(colorShiftRDefault);

  // let colorShiftGDefault: GLfloat = 0.5;
  // let colorShiftG: GLfloat = $state(colorShiftGDefault);

  // let colorShiftBDefault: GLfloat = 0.5;
  // let colorShiftB: GLfloat = $state(colorShiftBDefault);

  // let colorShiftBrightnessDefault: GLfloat = 0;
  // let colorShiftBrightness: GLfloat = $state(colorShiftBrightnessDefault);

  // let colorShiftContrastDefault: GLfloat = -0.5;
  // let colorShiftContrast: GLfloat = $state(colorShiftContrastDefault);

  // //Declerations for Feedback page
  // let translateXDefault: number = 0;
  // let translateX: number = $state(translateXDefault);

  // let translateYDefault: number = 0;
  // let translateY: number = $state(translateYDefault);

  // let feedbackWindowSizeDefault: number = 1;
  // let feedbackWindowSize: number = $state(feedbackWindowSizeDefault);

  // let feedbackOpacityDefault: number = 127;
  // let feedbackOpacity: number = $state(feedbackOpacityDefault);

  // let feedbackInvertDefault: boolean = true;
  // let feedbackInvert: boolean = $state(feedbackInvertDefault);

  // let feedbackRotationDefault: number = 0;
  // let feedbackRotation: number = $state(feedbackRotationDefault);

  setContext("p5Setup", { p5Setup });
  function p5Setup() {
    canvas = global_p5.createCanvas(640, 480, "webgl");
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
    capture = global_p5.createCapture(constraints);
    video = global_p5.createVideo(["/" + video_path]);
    if (selectedVideoSource != "Camera") {
      videoSource = video = global_p5.createVideo(["/" + selectedVideoSource]);
    } else {
      videoSource = global_p5.createCapture(constraints);
    }

    /* @ts-expect-error shrug */
    exposureFilter = global_p5.createFilterShader(exposure);
    /* @ts-expect-error shrug */
    contrastMatrixFilter = global_p5.createFilterShader(contrastMatrix);
    prevFrame = global_p5.createFramebuffer({ format: global_p5.FLOAT });
    nextFrame = global_p5.createFramebuffer({ format: global_p5.FLOAT });

    video.loop();
  }

  const sketch: Sketch = (p5) => {
    global_p5 = p5;

    p5.setup = () => {
      p5Setup();
    };

    p5.draw = () => {
      //This is for Visualiser 1
      let prevNew;
      let nextNew;
      // Feedback loop,
      // drawing the usual frame to the buffer
      prevNew = nextFrame;
      nextNew = prevFrame;
      nextFrame = nextNew;
      prevFrame = prevNew;

      nextFrame.begin();
      p5.clear();
      p5.push();

      p5.tint(255, 255);
      p5.image(
        videoSource,
        -capture.width / 2,
        -capture.height / 2,
        capture.width,
        capture.height,
      );
      p5.tint(255, $feedbackOpacity);
      p5.rotate($feedbackRotation);
      p5.push();
      p5.pop();
      p5.image(
        prevFrame,
        (-capture.width * $feedbackWindowSize) / 2 + $translateX,
        (-capture.height * $feedbackWindowSize) / 2 + $translateY,
        capture.width * $feedbackWindowSize,
        capture.height * $feedbackWindowSize,
      );
      p5.tint(255, 255);

      if ($feedbackInvert == true) {
        p5.filter("invert");
      }

      contrastMatrixFilter.setUniform("red", $colorShiftR);
      contrastMatrixFilter.setUniform("green", $colorShiftG);
      contrastMatrixFilter.setUniform("blue", $colorShiftB);
      contrastMatrixFilter.setUniform("brightness", $colorShiftBrightness);
      contrastMatrixFilter.setUniform("contrast", $colorShiftContrast);
      p5.filter(contrastMatrixFilter);

      nextFrame.end();
      // This actually draws the frame
      // from the buffer to the canvas
      p5.image(
        nextFrame,
        -capture.width / 2,
        -capture.height / 2,
        capture.width,
        capture.height,
      );
      //This inverts the inversion, so only the feedback path is inverted
      if ($feedbackInvert == true) {
        p5.filter("invert");
      }
    };
  };
</script>

<svelte:head>
  <script src="https://lygia.xyz/resolve.js"></script>
</svelte:head>

<main>
  <P5 {sketch} />
  {#if menu === 0}
    <VisualizerControls />
  {:else if menu === 1}
    <div>Video mixer goes here</div>
  {:else if menu === 2}
    <div>Visualizer 2 goes here</div>
  {:else}
    <h1>You shouldn't be here, move along</h1>
  {/if}
  <ul id="menu">
    <button onclick={() => (menu = 0)}>Visualizer 1</button>
    <button onclick={() => (menu = 1)}>Video Mixer</button>
    <button onclick={() => (menu = 2)}>Visualizer 2</button>
  </ul>
</main>

<style>
</style>
