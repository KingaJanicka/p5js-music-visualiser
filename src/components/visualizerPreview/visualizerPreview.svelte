<script lang="ts">
    import P5, { type Sketch } from "p5-svelte";
    import type p5 from "p5";
    let props = $props();
    let canvas;
    let img;
    const preview_0: Sketch = (p5) => {
        p5.setup = () => {
            img = p5.createVideo(["/" + "cat_pupils.webm"]);
            canvas = p5.createCanvas(640 / 4, 480 / 4, "webgl");
            img.play();
        };

        p5.draw = () => {
            p5.image(
                img,
                -canvas.width / 2,
                -canvas.height / 2,
                canvas.width,
                canvas.height,
            );
        };
    };
</script>

<div class="sketch-container">
    <P5 sketch={preview_0} />
</div>
