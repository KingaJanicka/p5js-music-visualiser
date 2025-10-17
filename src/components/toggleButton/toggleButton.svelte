<script lang="ts">
    // let props = $props();
    let { valueToBind = $bindable(false), ...props } = $props();
</script>

<div>
    <p>{@render props.children()}, {valueToBind}</p>
    <input type="checkbox" bind:checked={valueToBind} />
</div>
