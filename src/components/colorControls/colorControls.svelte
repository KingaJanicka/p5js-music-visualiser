<script lang="ts">
    // let props = $props();
    let { valueToBind = $bindable(0), ...props } = $props();
    import VerticalSlider from "../verticalSlider/verticalSlider.svelte";
    import DropdownMenu from "../dropdownMenu/dropdownMenu.svelte";
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
        videos,
        selectedVideoSource,
        visualizerPage,
    } from "../../sharedStore";
</script>

<div>
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
</div>

<style>
    .colorControls {
        display: flex;
        justify-content: center;
    }
</style>
