<script lang="ts">
    // let props = $props();
    let { valueToBind = $bindable(0), ...props } = $props();
</script>

<div>
    <p>{@render props.children()}, {valueToBind}</p>
    <input
        type={props.type}
        step="0.01"
        bind:value={valueToBind}
        min={props.min}
        max={props.max}
    />
</div>
