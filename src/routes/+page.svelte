<script lang="ts">
  import { onMount } from "svelte";
  import Experience from "../lib/experience/experience";

  let canvas: HTMLCanvasElement;
  onMount(() => {
    new Experience(canvas);
  });
</script>

<div>
  <canvas bind:this={canvas} id="three-canvas" />
  <p>My Text</p>
</div>

<style>
  div {
    position: fixed;
    height: 100vh;
    width: 100vw;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
