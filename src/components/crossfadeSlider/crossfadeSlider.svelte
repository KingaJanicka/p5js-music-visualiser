<script lang="ts">
    let props = $props();
    import {
        visualizerCrossfade,
        visualizerCrossfadeDefault,
    } from "../../sharedStore";

    let input_value = $state(visualizerCrossfadeDefault);
</script>

<!-- TODO: this will not reset to default value visually, but does reset the actual val -->
<div>
    <p>{$visualizerCrossfade}</p>
    <input
        type="range"
        step="0.01"
        bind:value={input_value}
        min={props.min}
        max={props.max}
        oninput={() => ($visualizerCrossfade = input_value)}
        ondblclick={() => ($visualizerCrossfade = visualizerCrossfadeDefault)}
    />
</div>

<style>
    input {
        writing-mode: vertical-lr;
        direction: rtl;
        height: 50vh;
        /* padding: 6em 5em; */
    }
</style>
