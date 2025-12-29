<script lang="ts">
    // let props = $props();
    let { valueToBind = $bindable(0), ...props } = $props();
</script>

<div>
    <p>{@render props.children()}</p>
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
        writing-mode: horizontal-tb;
        direction: ltr;
        width: 100%;
        height: 80px;
    }
</style>
