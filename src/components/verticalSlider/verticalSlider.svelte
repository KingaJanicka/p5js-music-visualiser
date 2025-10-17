<script lang="ts">
    // let props = $props();
    let { valueToBind = $bindable(0), ...props } = $props();
</script>

<div>
    <p>{@render props.children()}, {valueToBind}</p>
    <input
        type="range"
        step="0.01"
        bind:value={valueToBind}
        min={props.min}
        max={props.max}
    />
</div>

<style>
    input {
        writing-mode: vertical-lr;
        direction: rtl;
        padding: 0em 5em;
    }
</style>
