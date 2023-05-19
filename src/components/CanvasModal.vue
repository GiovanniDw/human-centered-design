<script setup>
import { ref, nextTick } from "vue";

const visible = ref(false);

const canvasDom = ref();

const containerRef = ref();

const downloadImage = () => {
  canvasDom.value.toBlob((blob) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "cropped";
    // start download
    a.click();
  });
};

defineExpose({
  open(canvas) {
    visible.value = true;
    // 删除子元素
    const container = containerRef.value;
    while (container?.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }
    canvasDom.value = canvas;
    nextTick(() => {
      console.log(canvas);
      containerRef.value?.appendChild(canvas);
    });
  },
});
</script>

<template>
  <a-modal
    v-model:visible="visible"
    title="Cropped"
    cancel-text="Cancel"
    okText="Download"
    :width="500"
    @ok="downloadImage"
  >
    <div class="canvas-container" ref="containerRef" style="text-align: center"></div>
  </a-modal>
</template>

<style>
.canvas-container > canvas {
  max-width: 100%;
}
</style>
