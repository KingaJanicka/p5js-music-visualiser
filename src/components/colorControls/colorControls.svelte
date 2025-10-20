<script lang="ts">
    // let props = $props();
    let { valueToBind = $bindable(0), ...props } = $props();
    import VerticalSlider from "../verticalSlider/verticalSlider.svelte";
    import DropdownMenu from "../dropdownMenu/dropdownMenu.svelte";
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
        visualizerPage,
    } from "../../sharedStore";
</script>

<div>
    {#if $visualizerPage === 0}
        <div class="colorControls">
            <DropdownMenu {videos} bind:selectedItem={$selectedVideoSource_0} />
            <VerticalSlider
                bind:valueToBind={$colorShiftBrightness_0}
                default={colorShiftBrightnessDefault}
                min="-2.5"
                max="2.5">Brightness</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$colorShiftContrast_0}
                default={colorShiftContrastDefault}
                min="-2.5"
                max="2.5">Contrast</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$colorShiftR_0}
                default={colorShiftRDefault}
                min="0"
                max="1">Red</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$colorShiftG_0}
                default={colorShiftGDefault}
                min="0"
                max="1">Green</VerticalSlider
            >
            <VerticalSlider
                bind:valueToBind={$colorShiftB_0}
                default={colorShiftBDefault}
                min="0"
                max="1">Blue</VerticalSlider
            >
        </div>
    {:else}
        <div class="colorControls">
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
            >
        </div>{/if}
</div>

<style>
    .colorControls {
        display: flex;
        justify-content: center;
    }
</style>
