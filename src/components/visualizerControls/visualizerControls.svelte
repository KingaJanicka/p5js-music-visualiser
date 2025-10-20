<script lang="ts">
    // let props = $props();
    let { valueToBind = $bindable(0), ...props } = $props();
    import VerticalSlider from "../verticalSlider/verticalSlider.svelte";
    import DropdownMenu from "../dropdownMenu/dropdownMenu.svelte";
    import ToggleButton from "../toggleButton/toggleButton.svelte";
    import {
        colorShiftR,
        colorShiftRDefault,
        colorShiftG,
        colorShiftGDefault,
        colorShiftB,
        colorShiftBDefault,
        colorShiftBrightness,
        colorShiftBrightnessDefault,
        colorShiftContrast,
        colorShiftContrastDefault,
        translateX,
        translateXDefault,
        translateY,
        translateYDefault,
        feedbackWindowSize,
        feedbackWindowSizeDefault,
        feedbackOpacity,
        feedbackOpacityDefault,
        feedbackInvert,
        feedbackInvertDefault,
        feedbackRotation,
        feedbackRotationDefault,
        videos,
        selectedVideoSource,
    } from "../../sharedStore";
</script>

<div>
    <div class="pageContainer">
        <div class="colorControls">
            <DropdownMenu {videos} bind:selectedItem={$selectedVideoSource} />
            <VerticalSlider
                bind:valueToBind={$colorShiftBrightness}
                default={colorShiftBrightnessDefault}
                min="-2.5"
                max="2.5">Brightness</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$colorShiftContrast}
                default={colorShiftContrastDefault}
                min="-2.5"
                max="2.5">Contrast</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$colorShiftR}
                default={colorShiftRDefault}
                min="0"
                max="1">Red</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$colorShiftG}
                default={colorShiftGDefault}
                min="0"
                max="1">Green</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$colorShiftB}
                default={colorShiftBDefault}
                min="0"
                max="1">Blue</VerticalSlider
            >
        </div>
        <div class="feedbackControls">
            <VerticalSlider
                bind:valueToBind={$translateX}
                default={translateXDefault}
                min="-100"
                max="100">Translate X</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$translateY}
                default={translateYDefault}
                min="-100"
                max="100">Translate Y</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$feedbackWindowSize}
                default={feedbackWindowSizeDefault}
                min="0"
                max="2">Feedback Size</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$feedbackOpacity}
                default={feedbackOpacityDefault}
                min="0"
                max="255">Feedback Opacity</VerticalSlider
            >
            <ToggleButton bind:valueToBind={$feedbackInvert}
                >Invert Feedback</ToggleButton
            >
            <VerticalSlider
                bind:valueToBind={$feedbackRotation}
                default={feedbackRotationDefault}
                min="-3.14"
                max="3.14">Feedback Skew</VerticalSlider
            >
        </div>
    </div>
</div>

<style>
    .colorControls {
        display: flex;
        justify-content: center;
    }

    .feedbackControls {
        display: flex;
        justify-content: center;
    }
</style>
