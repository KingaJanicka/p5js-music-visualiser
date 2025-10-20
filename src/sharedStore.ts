import { writable } from "svelte/store";


//Declerations for colour page
export let colorShiftRDefault: GLfloat = 0.5;
export let colorShiftR_0 = writable(colorShiftRDefault);
export let colorShiftR_1 = writable(colorShiftRDefault);

export let colorShiftGDefault: GLfloat = 0.5;
export let colorShiftG_0 = writable(colorShiftGDefault);
export let colorShiftG_1 = writable(colorShiftGDefault);

export let colorShiftBDefault: GLfloat = 0.5;
export let colorShiftB_0 = writable(colorShiftBDefault);
export let colorShiftB_1 = writable(colorShiftBDefault);

export let colorShiftBrightnessDefault: GLfloat = 0;
export let colorShiftBrightness_0 = writable(colorShiftBrightnessDefault);
export let colorShiftBrightness_1 = writable(colorShiftBrightnessDefault);

export let colorShiftContrastDefault: GLfloat = -0.5;
export let colorShiftContrast_0 = writable(colorShiftContrastDefault);
export let colorShiftContrast_1 = writable(colorShiftContrastDefault);

//Declerations for Feedback page
export let translateXDefault: number = 0;
export let translateX_0 = writable(translateXDefault);
export let translateX_1 = writable(translateXDefault);

export let translateYDefault: number = 0;
export let translateY_0 = writable(translateYDefault);
export let translateY_1 = writable(translateYDefault);

export let feedbackWindowSizeDefault: number = 1;
export let feedbackWindowSize_0 = writable(feedbackWindowSizeDefault);
export let feedbackWindowSize_1 = writable(feedbackWindowSizeDefault);

export let feedbackOpacityDefault: number = 127;
export let feedbackOpacity_0 = writable(feedbackOpacityDefault);
export let feedbackOpacity_1 = writable(feedbackOpacityDefault);

export let feedbackInvertDefault: boolean = true;
export let feedbackInvert_0 = writable(feedbackInvertDefault);
export let feedbackInvert_1 = writable(feedbackInvertDefault);

export let feedbackRotationDefault: number = 0;
export let feedbackRotation_0 = writable(feedbackRotationDefault);
export let feedbackRotation_1 = writable(feedbackRotationDefault);


let videos_no_camera = Object.keys(import.meta.glob("../public/*.webm")).map((d) =>
d.split("/").pop(),
);
videos_no_camera.push("Camera")
export let videos = videos_no_camera;
export let selectedVideoSource_0 = writable("cat_pupils.webm");
export let selectedVideoSource_1 = writable("cat_pupils.webm");


export let visualizerPage = writable(0);

