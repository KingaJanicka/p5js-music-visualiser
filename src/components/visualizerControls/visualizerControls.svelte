<script lang="ts">
    import ColorControls from "../colorControls/colorControls.svelte";
    import FeedbackControls from "../feedbackControls/feedbackControls.svelte";
    import { visualizerPage } from "../../sharedStore";
</script>

<div>
    <div class="pageContainer">
        <ColorControls />
        <FeedbackControls />
    </div>
</div>

<style>
</style>
