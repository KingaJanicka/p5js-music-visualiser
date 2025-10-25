<script>
    import { visualizerPage } from "../../sharedStore";
    import VisualizerPreview from "../visualizerPreview/visualizerPreview.svelte";
    let props = $props();
</script>

<div>
    <div class="menu">
        <div class="buttonContainer">
            <button
                onclick={() => ($visualizerPage = 0)}
                class={$visualizerPage === 0 ? "selected" : ""}
                >Visualizer 1</button
            >
            <!-- <VisualizerPreview frame_0={props.frame_0} /> -->
        </div>
        <div class="buttonContainer">
            <button
                onclick={() => ($visualizerPage = 1)}
                class={$visualizerPage === 1 ? "selected" : ""}
                >Video Mixer</button
            >
        </div>
        <div class="buttonContainer">
            <button
                onclick={() => ($visualizerPage = 2)}
                class={$visualizerPage === 2 ? "selected" : ""}
                >Visualizer 2</button
            >
            <!-- <VisualizerPreview frame_0={props.frame_0} /> -->
        </div>
    </div>
</div>

<style>
    button {
        width: 10em;
        height: 4em;
        margin: 1em 3em 2em 3em;
    }

    .selected {
        background-color: white;
        color: black;
        width: 12em;
        height: 5em;
        margin: 1em 2em;
    }
    .menu {
        display: flex;
        justify-content: center;
    }
    .buttonContainer {
        height: 18em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }
</style>
