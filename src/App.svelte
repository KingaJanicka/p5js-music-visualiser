<script lang="ts">
  import P5, { type Sketch } from "p5-svelte";
  import type p5 from "p5";
  import exposure from "./exposure.frag";
  import contrastMatrix from "./contrastMatrixCustom.frag";
  import VisualizerControls from "./components/visualizerControls/visualizerControls.svelte";
  import { setContext } from "svelte";
  import {
    colorShiftR_0,
    colorShiftR_1,
    colorShiftG_0,
    colorShiftG_1,
    colorShiftB_0,
    colorShiftB_1,
    colorShiftBrightness_0,
    colorShiftBrightness_1,
    colorShiftContrast_0,
    colorShiftContrast_1,
    translateX_0,
    translateX_1,
    translateY_0,
    translateY_1,
    feedbackWindowSize_0,
    feedbackWindowSize_1,
    feedbackOpacity_0,
    feedbackOpacity_1,
    feedbackInvert_0,
    feedbackInvert_1,
    feedbackRotation_0,
    feedbackRotation_1,
    videos,
    visualizerPage,
  } from "./sharedStore";
  import VisualizerPageSelector from "./components/visualizerPageSelector/visualizerPageSelector.svelte";
  let frameRate: number = 60;
  let prevFrame: p5.Framebuffer;
  let nextFrame: p5.Framebuffer;
  let video_path = "cat_pupils.webm";
  let selectedVideoSource: string = $state("cat_pupils.webm");
  let global_p5: p5;
  // P5js vars
  let capture: p5.Element;
  let canvas: p5.Renderer;
  let exposureFilter: any;
  let videoSource: p5.Element;
  let contrastMatrixFilter: any;
  let video: p5.MediaElement;

  setContext("p5Setup", { p5Setup });
  function p5Setup(item = null) {
    if (item != null) {
      selectedVideoSource = item;
    }
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
      p5.tint(255, $feedbackOpacity_0);
      p5.rotate($feedbackRotation_0);
      p5.push();
      p5.pop();
      p5.image(
        prevFrame,
        (-capture.width * $feedbackWindowSize_0) / 2 + $translateX_0,
        (-capture.height * $feedbackWindowSize_0) / 2 + $translateY_0,
        capture.width * $feedbackWindowSize_0,
        capture.height * $feedbackWindowSize_0,
      );
      p5.tint(255, 255);

      if ($feedbackInvert_0 == true) {
        p5.filter("invert");
      }

      contrastMatrixFilter.setUniform("red", $colorShiftR_0);
      contrastMatrixFilter.setUniform("green", $colorShiftG_0);
      contrastMatrixFilter.setUniform("blue", $colorShiftB_0);
      contrastMatrixFilter.setUniform("brightness", $colorShiftBrightness_0);
      contrastMatrixFilter.setUniform("contrast", $colorShiftContrast_0);
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
      if ($feedbackInvert_0 == true) {
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
  {#if $visualizerPage === 0}
    <VisualizerControls />
  {:else if $visualizerPage === 1}
    <div>Video mixer goes here</div>
  {:else if $visualizerPage === 2}
    <div>
      <VisualizerControls />
    </div>
  {:else}
    <h1>You shouldn't be here, move along</h1>
  {/if}
  <VisualizerPageSelector />
</main>

<style>
</style>
