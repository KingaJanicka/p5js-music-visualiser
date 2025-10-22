  export function p5Setup(item = null) {
    if (item != null) {
      if ($visualizerPage === 0) {
        $selectedVideoSource_0 = item;
      } else if ($visualizerPage === 2) {
        $selectedVideoSource_1 = item;
      }
    }
    //Global, for both framebuffers
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

    //For visualizer nr1
    video_0 = global_p5.createVideo(["/" + video_path_0]);
    if ($selectedVideoSource_0 != "Camera") {
      videoSource_0 = video_0 = global_p5.createVideo([
        "/" + $selectedVideoSource_0,
      ]);
      video_0.loop();
    } else {
      videoSource_0 = global_p5.createCapture(constraints);
    }

    //For visualizer nr2
    video_1 = global_p5.createVideo(["/" + video_path_1]);
    if ($selectedVideoSource_1 != "Camera") {
      videoSource_1 = video_1 = global_p5.createVideo([
        "/" + $selectedVideoSource_1,
      ]);
      video_1.loop();
    } else {
      videoSource_1 = global_p5.createCapture(constraints);
    }

    /* @ts-expect-error shrug */
    exposureFilter = global_p5.createFilterShader(exposure);
    /* @ts-expect-error shrug */
    contrastMatrixFilter = global_p5.createFilterShader(contrastMatrix);
    prevFrame_0 = global_p5.createFramebuffer({ format: global_p5.FLOAT });
    prevFrame_1 = global_p5.createFramebuffer({ format: global_p5.FLOAT });
    nextFrame_0 = global_p5.createFramebuffer({ format: global_p5.FLOAT });
    nextFrame_1 = global_p5.createFramebuffer({ format: global_p5.FLOAT });
    combinedFrame = global_p5.createFramebuffer({ format: global_p5.FLOAT });
  }

  export function draw_framebuffer_0(p5) {
    //This is for Visualiser 1
    let prevNew_0;
    let nextNew_0;
    // Feedback loop,
    // drawing the usual frame to the buffer
    prevNew_0 = nextFrame_0;
    nextNew_0 = prevFrame_0;
    nextFrame_0 = nextNew_0;
    prevFrame_0 = prevNew_0;

    nextFrame_0.begin();
    p5.clear();
    p5.push();

    p5.tint(255, 255);
    p5.image(
      videoSource_0,
      -capture.width / 2,
      -capture.height / 2,
      capture.width,
      capture.height,
    );
    if ($feedbackInvert_0 == true) {
      p5.filter("invert");
    }
    p5.tint(255, $feedbackOpacity_0);
    p5.rotate($feedbackRotation_0);
    p5.push();
    p5.pop();
    p5.image(
      prevFrame_0,
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

    nextFrame_0.end();
    // if ($feedbackInvert_0 == true) {
    //   p5.filter("invert");
    // }
  }

  export function draw_framebuffer_1(p5) {
    let prevNew_1;
    let nextNew_1;
    // Feedback loop,
    // drawing the usual frame to the buffer
    prevNew_1 = nextFrame_1;
    nextNew_1 = prevFrame_1;
    nextFrame_1 = nextNew_1;
    prevFrame_1 = prevNew_1;

    nextFrame_1.begin();
    p5.clear();
    p5.push();

    p5.tint(255, 255);

    p5.image(
      videoSource_1,
      -capture.width / 2,
      -capture.height / 2,
      capture.width,
      capture.height,
    );
    if ($feedbackInvert_1 == true) {
      p5.filter("invert");
    }
    p5.tint(255, $feedbackOpacity_1);
    p5.rotate($feedbackRotation_1);
    p5.push();
    p5.pop();
    p5.image(
      prevFrame_1,
      (-capture.width * $feedbackWindowSize_1) / 2 + $translateX_1,
      (-capture.height * $feedbackWindowSize_1) / 2 + $translateY_1,
      capture.width * $feedbackWindowSize_1,
      capture.height * $feedbackWindowSize_1,
    );

    if ($feedbackInvert_1 == true) {
      p5.filter("invert");
    }
    p5.tint(255, 255);

    contrastMatrixFilter.setUniform("red", $colorShiftR_1);
    contrastMatrixFilter.setUniform("green", $colorShiftG_1);
    contrastMatrixFilter.setUniform("blue", $colorShiftB_1);
    contrastMatrixFilter.setUniform("brightness", $colorShiftBrightness_1);
    contrastMatrixFilter.setUniform("contrast", $colorShiftContrast_1);
    p5.filter(contrastMatrixFilter);
    nextFrame_1.end();
    // if ($feedbackInvert_1 == true) {
    //   p5.filter("invert");
    // }
  }

  export function combine_framebuffers(p5) {
    combinedFrame.begin();
    p5.tint(255, 255);
    p5.tint(255, $visualizerCrossfade);

    p5.image(
      nextFrame_0,
      -capture.width / 2,
      -capture.height / 2,
      capture.width,
      capture.height,
    );
    //Not sure if this tint is working, might need both frame buffers to check
    p5.tint(255, 255);
    p5.tint(255, 255 - $visualizerCrossfade);

    p5.image(
      nextFrame_1,
      -capture.width / 2,
      -capture.height / 2,
      capture.width,
      capture.height,
    );
    combinedFrame.end();
  }
  export function draw_image(p5) {
    p5.tint(255, 255);
    p5.image(
      combinedFrame,
      -capture.width / 2,
      -capture.height / 2,
      capture.width,
      capture.height,
    );
    // p5.tint(255);s
    //This inverts the inversion, so only the feedback path is inverted
  }