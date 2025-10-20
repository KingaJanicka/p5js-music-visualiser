import { writable } from "svelte/store";


//Declerations for colour page
export let colorShiftRDefault: GLfloat = 0.5;
export let colorShiftR = writable(colorShiftRDefault);

export let colorShiftGDefault: GLfloat = 0.5;
export let colorShiftG = writable(colorShiftGDefault);

export let colorShiftBDefault: GLfloat = 0.5;
export let colorShiftB = writable(colorShiftBDefault);

export let colorShiftBrightnessDefault: GLfloat = 0;
export let colorShiftBrightness = writable(colorShiftBrightnessDefault);

export let colorShiftContrastDefault: GLfloat = -0.5;
export let colorShiftContrast = writable(colorShiftContrastDefault);

//Declerations for Feedback page
export let translateXDefault: number = 0;
export let translateX = writable(translateXDefault);

export let translateYDefault: number = 0;
export let translateY = writable(translateYDefault);

export let feedbackWindowSizeDefault: number = 1;
export let feedbackWindowSize = writable(feedbackWindowSizeDefault);

export let feedbackOpacityDefault: number = 127;
export let feedbackOpacity = writable(feedbackOpacityDefault);

export let feedbackInvertDefault: boolean = true;
export let feedbackInvert = writable(feedbackInvertDefault);

export let feedbackRotationDefault: number = 0;
export let feedbackRotation = writable(feedbackRotationDefault);


let videos_no_camera = Object.keys(import.meta.glob("../public/*.webm")).map((d) =>
d.split("/").pop(),
);
videos_no_camera.push("Camera")
export let videos = videos_no_camera;
export let selectedVideoSource = writable("cat_pupils.webm");

