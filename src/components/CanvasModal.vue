<script setup>
import { ref, nextTick } from 'vue'
import { useGlobalStore } from '@/stores/global.js'
import { set } from '@vueuse/core'
const store = useGlobalStore()

const { setAvatar } = store

const visible = ref(false)

const canvasDom = ref()

const containerRef = ref()

const downloadImage = () => {
  console.log(canvasDom.value.toDataURL())
  const img = canvasDom.value.toDataURL()
  const { canvas } = canvasDom.value

  setAvatar(img)

  // store.ava = { avatar: canvasDom.value.toDataURL() };

  canvasDom.value.toBlob((blob) => {
    const a = document.createElement('a')

    a.href = URL.createObjectURL(blob)

    a.download = 'cropped'
    // start download

    a.click()
  })
}

defineExpose({
  open(canvas) {
    visible.value = true
    // 删除子元素
    const container = containerRef.value
    while (container?.hasChildNodes()) {
      container.removeChild(container.firstChild)
    }
    canvasDom.value = canvas
    nextTick(() => {
      console.log(canvas)
      containerRef.value?.appendChild(canvas)
    })
  }
})
</script>

<template>
  <a-modal
    class="modal-container"
    v-model:visible="visible"
    title="Your Cropped Image"
    cancel-text="Cancel"
    okText="Save & Download"
    :width="500"
    @ok="downloadImage"
  >
    <div class="canvas-container" ref="containerRef" style="text-align: center"></div>
  </a-modal>
</template>

<style lang="scss">
.ant-modal-content {
  overflow: hidden;
}

.ant-modal {
  .ant-modal-content,
  .modal-container,
  .ant-modal-content {
    border-radius: 1em;
    overflow: hidden;
  }
}
// .modal-container {
//   border-radius: 1em;
// }
.canvas-container > canvas {
  max-width: 100%;
}
</style>
