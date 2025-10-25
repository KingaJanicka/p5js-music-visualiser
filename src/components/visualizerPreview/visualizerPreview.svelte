<script lang="ts">
    import P5, { type Sketch } from "p5-svelte";
    import type p5 from "p5";
    let props = $props();
    let img;
    const preview_0: Sketch = (p5) => {
        let canvas;
        let frame = props.frame_0;
        p5.setup = () => {
            // img = p5.createVideo(["/" + "cat_pupils.webm"]);
            canvas = p5.createCanvas(640 / 4, 480 / 4, "webgl");
            // img.play();
        };

        p5.draw = () => {
            if (frame != null) {
                p5.image(frame, 0, 0);
            }
        };
    };
</script>

<div class="sketch-container">
    <P5 sketch={preview_0} />
</div>
