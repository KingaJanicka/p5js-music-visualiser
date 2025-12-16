<script lang="ts">
    import { selectedControl } from "../../sharedStore";
    let props = $props();
</script>

<main>
    {@render props?.children()}
    <button
        onclick={() => ($selectedControl = parseInt(props.idx))}
        class={$selectedControl === props.idx ? "selected" : "not"}
        >{props.label}</button
    >
</main>

<style>
    .selected {
        color: blue;
    }
</style>
