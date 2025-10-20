<script lang="ts">
    // let props = $props();
    let { valueToBind = $bindable(0), ...props } = $props();
    import VerticalSlider from "../verticalSlider/verticalSlider.svelte";
    import ToggleButton from "../toggleButton/toggleButton.svelte";
    import {
        translateX_0,
        translateX_1,
        translateXDefault,
        translateY_0,
        translateY_1,
        translateYDefault,
        feedbackWindowSize_0,
        feedbackWindowSize_1,
        feedbackWindowSizeDefault,
        feedbackOpacity_0,
        feedbackOpacity_1,
        feedbackOpacityDefault,
        feedbackInvert_0,
        feedbackInvert_1,
        feedbackRotation_0,
        feedbackRotation_1,
        feedbackRotationDefault,
        visualizerPage,
    } from "../../sharedStore";
</script>

<div>
    {#if $visualizerPage === 0}
        <div class="feedbackControls">
            <VerticalSlider
                bind:valueToBind={$translateX_0}
                default={translateXDefault}
                min="-100"
                max="100">Translate X</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$translateY_0}
                default={translateYDefault}
                min="-100"
                max="100">Translate Y</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$feedbackWindowSize_0}
                default={feedbackWindowSizeDefault}
                min="0"
                max="2">Feedback Size</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$feedbackOpacity_0}
                default={feedbackOpacityDefault}
                min="0"
                max="255">Feedback Opacity</VerticalSlider
            >
            <ToggleButton bind:valueToBind={$feedbackInvert_0}
                >Invert Feedback</ToggleButton
            >
            <VerticalSlider
                bind:valueToBind={$feedbackRotation_0}
                default={feedbackRotationDefault}
                min="-3.14"
                max="3.14">Feedback Skew</VerticalSlider
            >
        </div>
    {:else}
        <div class="feedbackControls">
            <VerticalSlider
                bind:valueToBind={$translateX_1}
                default={translateXDefault}
                min="-100"
                max="100">Translate X</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$translateY_1}
                default={translateYDefault}
                min="-100"
                max="100">Translate Y</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$feedbackWindowSize_1}
                default={feedbackWindowSizeDefault}
                min="0"
                max="2">Feedback Size</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$feedbackOpacity_1}
                default={feedbackOpacityDefault}
                min="0"
                max="255">Feedback Opacity</VerticalSlider
            >
            <ToggleButton bind:valueToBind={$feedbackInvert_1}
                >Invert Feedback</ToggleButton
            >
            <VerticalSlider
                bind:valueToBind={$feedbackRotation_1}
                default={feedbackRotationDefault}
                min="-3.14"
                max="3.14">Feedback Skew</VerticalSlider
            >
        </div>{/if}
</div>

<style>
    .feedbackControls {
        display: flex;
        justify-content: center;
    }
</style>
