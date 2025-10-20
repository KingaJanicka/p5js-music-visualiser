<script lang="ts">
    let props = $props();
    import {
        visualizerCrossfade,
        visualizerCrossfadeDefault,
    } from "../../sharedStore";

    let input_value = $state(visualizerCrossfadeDefault);
</script>

<div>
    <p>{$visualizerCrossfade}</p>
    <input
        type="range"
        step="0.01"
        bind:value={input_value}
        min={props.min}
        max={props.max}
        onclick={() => ($visualizerCrossfade = input_value)}
        ondblclick={() => ($visualizerCrossfade = props.default)}
    />
</div>

<style>
    input {
        writing-mode: horizontal-tb;
        direction: rtl;
        padding: 0em 5em;
    }
</style>
