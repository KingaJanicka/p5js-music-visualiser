<script>
    import { visualizerPage } from "../../sharedStore";
</script>

<div>
    <ul id="menu">
        <button
            onclick={() => ($visualizerPage = 0)}
            class={$visualizerPage === 0 ? "selected" : ""}>Visualizer 1</button
        >
        <button
            onclick={() => ($visualizerPage = 1)}
            class={$visualizerPage === 1 ? "selected" : ""}>Video Mixer</button
        >
        <button
            onclick={() => ($visualizerPage = 2)}
            class={$visualizerPage === 2 ? "selected" : ""}>Visualizer 2</button
        >
    </ul>
</div>

<style>
    button {
        width: 10em;
        height: 4em;
    }

    .selected {
        background-color: white;
        color: black;
        width: 12em;
        height: 5em;
    }
</style>
