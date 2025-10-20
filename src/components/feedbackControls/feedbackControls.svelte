<script lang="ts">
    // let props = $props();
    let { valueToBind = $bindable(0), ...props } = $props();
    import VerticalSlider from "../verticalSlider/verticalSlider.svelte";
    import ToggleButton from "../toggleButton/toggleButton.svelte";
    import {
        translateX,
        translateXDefault,
        translateY,
        translateYDefault,
        feedbackWindowSize,
        feedbackWindowSizeDefault,
        feedbackOpacity,
        feedbackOpacityDefault,
        feedbackInvert,
        feedbackRotation,
        feedbackRotationDefault,
    } from "../../sharedStore";
</script>

<div>
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

<style>
    .feedbackControls {
        display: flex;
        justify-content: center;
    }
</style>
