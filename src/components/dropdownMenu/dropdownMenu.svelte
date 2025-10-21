<script lang="ts">
    // let props = $props();
    import { getContext } from "svelte";
    const { p5Setup } = getContext("p5Setup");
    import { visualizerPage } from "../../sharedStore";
    // import { selectedVideoSource } from "../../sharedStore";

    let isMenuOn: boolean = $state(false);
    let { selectedItem = $bindable(), ...props } = $props();
    import { clickOutside } from "./clickOutside.js";
    function handleClickOutside(event) {
        isMenuOn = false;
    }
    function selectItem(item: string) {
        // This should set selectedVideoSource in store
        // but I can't figure out why it's not working
        // So this will do for now
        isMenuOn = false;
        p5Setup(item);
    }
</script>

<div
    class="mainContainer"
    use:clickOutside
    onclick_outside={handleClickOutside}
>
    {#if isMenuOn === false}
        <button class="burgerButton" onclick={() => (isMenuOn = true)}
            >{selectedItem}</button
        >
    {:else}
        <button class="burgerButton" onclick={() => (isMenuOn = false)}
            >Close Sources</button
        >
        {#each props.videos as item}
            {#if item === selectedItem}
                <button
                    class="selectionButtonSelected"
                    onclick={() => selectItem(item)}>{item}</button
                >
            {:else}
                <button
                    class="selectionButton"
                    onclick={() => {
                        selectItem(item);
                    }}>{item}</button
                >
            {/if}
        {/each}
    {/if}
</div>

<style>
    .mainContainer {
        width: 12em;
        padding-top: 0.5em;
    }
    .selectionButton,
    .selectionButtonSelected {
        width: 100%;
        opacity: 50%;
    }
    .selectionButton:hover,
    .selectionButtonSelected {
        opacity: 100%;
    }
</style>
