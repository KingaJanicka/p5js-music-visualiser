<script lang="ts">
    // let props = $props();
    let { valueToBind = $bindable(0), ...props } = $props();
    import VerticalSlider from "../verticalSlider/verticalSlider.svelte";
    import DropdownMenu from "../dropdownMenu/dropdownMenu.svelte";
    import ToggleButton from "../toggleButton/toggleButton.svelte";
    import ButtonState from "../buttonState/buttonState.svelte";
    import {
        colorShiftR_0,
        colorShiftR_1,
        colorShiftRDefault,
        colorShiftG_0,
        colorShiftG_1,
        colorShiftGDefault,
        colorShiftB_0,
        colorShiftB_1,
        colorShiftBDefault,
        colorShiftBrightness_0,
        colorShiftBrightness_1,
        colorShiftBrightnessDefault,
        colorShiftContrast_0,
        colorShiftContrast_1,
        colorShiftContrastDefault,
        videos,
        selectedVideoSource_0,
        selectedVideoSource_1,
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
        selectedControl,
    } from "../../sharedStore";
</script>

<div>
    {#if $visualizerPage === 0}
        <div class="visualizerControls">
            <div class="controlSelection">
                <ButtonState idx="0" label="Src" />
                <ButtonState idx="1" label="Br." />
                <ButtonState idx="2" label="Cnt." />
                <ButtonState idx="3" label="R" />
                <ButtonState idx="4" label="G" />
                <ButtonState idx="5" label="B" />
                <ButtonState idx="6" label="Fdbk X" />
                <ButtonState idx="7" label="Fdbk Y" />
                <ButtonState idx="8" label="Fdbk. Size" />
                <ButtonState idx="9" label="Fcbk Op." />
                <ButtonState idx="10" label="Fdbk Inv" />
                <ButtonState idx="11" label="Fdbk Skew" />
            </div>
            <div class="controlContainer">
                {#if $selectedControl === 0}
                    <DropdownMenu
                        {videos}
                        bind:selectedItem={$selectedVideoSource_0}
                    />
                {/if}
                {#if $selectedControl === 1}
                    <VerticalSlider
                        bind:valueToBind={$colorShiftBrightness_0}
                        default={colorShiftBrightnessDefault}
                        min="-2.5"
                        max="2.5">Brightness</VerticalSlider
                    >
                {/if}
                {#if $selectedControl === 2}
                    <VerticalSlider
                        bind:valueToBind={$colorShiftContrast_0}
                        default={colorShiftContrastDefault}
                        min="-2.5"
                        max="2.5">Contrast</VerticalSlider
                    >
                {/if}
                {#if $selectedControl === 3}
                    <VerticalSlider
                        bind:valueToBind={$colorShiftR_0}
                        default={colorShiftRDefault}
                        min="0"
                        max="1">Red</VerticalSlider
                    >
                {/if}
                {#if $selectedControl === 4}
                    <VerticalSlider
                        bind:valueToBind={$colorShiftG_0}
                        default={colorShiftGDefault}
                        min="0"
                        max="1">Green</VerticalSlider
                    >
                {/if}
                {#if $selectedControl === 5}
                    <VerticalSlider
                        bind:valueToBind={$colorShiftB_0}
                        default={colorShiftBDefault}
                        min="0"
                        max="1">Blue</VerticalSlider
                    >{/if}

                {#if $selectedControl === 6}
                    <VerticalSlider
                        bind:valueToBind={$translateX_0}
                        default={translateXDefault}
                        min="-100"
                        max="100">Translate X</VerticalSlider
                    >{/if}
                {#if $selectedControl === 7}
                    <VerticalSlider
                        bind:valueToBind={$translateY_0}
                        default={translateYDefault}
                        min="-100"
                        max="100">Translate Y</VerticalSlider
                    >
                {/if}
                {#if $selectedControl === 8}
                    <VerticalSlider
                        bind:valueToBind={$feedbackWindowSize_0}
                        default={feedbackWindowSizeDefault}
                        min="0.5"
                        max="1.5">Feedback Size</VerticalSlider
                    >{/if}
                {#if $selectedControl === 9}
                    <VerticalSlider
                        bind:valueToBind={$feedbackOpacity_0}
                        default={feedbackOpacityDefault}
                        min="0"
                        max="255">Feedback Opacity</VerticalSlider
                    >{/if}

                {#if $selectedControl === 10}
                    <ToggleButton bind:valueToBind={$feedbackInvert_0}
                        >Invert Feedback</ToggleButton
                    >
                {/if}
                {#if $selectedControl === 11}
                    <VerticalSlider
                        bind:valueToBind={$feedbackRotation_0}
                        default={feedbackRotationDefault}
                        min="-3.14"
                        max="3.14">Feedback Skew</VerticalSlider
                    >
                {/if}
            </div>
        </div>
    {:else}
        <div class="visualizerControls">
            <DropdownMenu {videos} bind:selectedItem={$selectedVideoSource_1} />
            <VerticalSlider
                bind:valueToBind={$colorShiftBrightness_1}
                default={colorShiftBrightnessDefault}
                min="-2.5"
                max="2.5">Brightness</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$colorShiftContrast_1}
                default={colorShiftContrastDefault}
                min="-2.5"
                max="2.5">Contrast</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$colorShiftR_1}
                default={colorShiftRDefault}
                min="0"
                max="1">Red</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$colorShiftG_1}
                default={colorShiftGDefault}
                min="0"
                max="1">Green</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$colorShiftB_1}
                default={colorShiftBDefault}
                min="0"
                max="1">Blue</VerticalSlider
            ><VerticalSlider
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
                min="0.5"
                max="1.5">Feedback Size</VerticalSlider
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
        </div>
    {/if}
</div>

<style>
    .visualizerControls {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .controlSelection {
        display: flex;
        flex-direction: row;
    }
</style>
