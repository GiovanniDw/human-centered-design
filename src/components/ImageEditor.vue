<script setup>
import { ref, shallowRef, reactive, watch } from "vue";
import VueCropper from "@ballcat/vue-cropper";
import BaseIcon from "@/components/icons/BaseIcon.vue";
// import { Cropper, Preview } from "vue-advanced-cropper";
import "cropperjs/dist/cropper.css";
import { useImage, useObjectUrl } from "@vueuse/core";
// import "vue-advanced-cropper/dist/style.css";
// import "vue-advanced-cropper/dist/theme.classic.css";

import { useEditorStore } from "@/stores/editor";
import CanvasModal from "@/components/CanvasModal.vue";
const vueCropperRef = ref();
const imageInput = ref(null);
const imageFile = ref(null);
const imagePreview = ref("");
const file = shallowRef();
const url = useObjectUrl(file);

const { isLoading } = useImage({ src: url });

const store = useEditorStore();
const { doRotate, doFlip, flip, rotate, cropper } = store;
const image = ref({
  src: null,
  type: null,
});

const convertNumber = (num) => (num != null ? Math.round(num) : undefined);

const onImgSubmit = () => {
  let img = imageInput.value;
};

console.log(imageInput.value);

const data = ref();

const onCrop = (e) => {
  data.value = e.detail;
};

const cropperOptions = reactive({
  aspectRatio: 0,
  viewMode: 0,
  responsive: true,
  restore: true,
  checkCrossOrigin: true,
  checkOrientation: true,
  modal: false,
  guides: true,
  center: true,
  highlight: true,
  background: true,
  autoCrop: true,
  movable: true,
  rotatable: true,
  scalable: true,
  zoomable: true,
  zoomOnTouch: true,
  zoomOnWheel: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: true,
});

const canvasModalRef = ref();

const openCanvasModal = (options) => {
  const croppedCanvas = vueCropperRef.value?.getCroppedCanvas(options);
  canvasModalRef.value?.open(croppedCanvas);
};

// const handleImageUpload = (event) => {
//   event.preventDefault();

//   const file = event.target.files[0];
//   imageFile.value = file;
//   URL;
//   // Generate a preview URL for the uploaded image
//   imagePreview.value = URL.createObjectURL(file);
// };

// const onFileChange = (event) => {
//   try {
//     file.value = event.target.files[0];
//     console.log(event.target);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const changeImg = ({ coordinates, canvas }) => {
//   console.log(coordinates, canvas);
// };

// const { coordinates, image, visibleArea, canvas } = this.$refs.cropper.getResult();

// const downloadImage = () => {
//   canvasDom.value.toBlob((blob) => {
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = "cropped";
//     // start download
//     a.click();
//   });
// };
</script>

<template>
  <div class="image-input">
    <div class="input-group">
      <label for="image">
        <BaseIcon name="image" />
      </label>
      <input type="file" id="image" accept="image/*" @change="store.onFileChange" />
    </div>
  </div>
  <VueCropper
    ref="vueCropperRef"
    class="img-container"
    :src="store.url"
    preview=".img-preview"
    v-bind="cropperOptions"
    @crop="onCrop"
  />
  <div>
    <div class="controlls">
      <button @click="store.crop">Crop</button>
      <button @click="store.doRotate('+', 90)" value="90">Rotate +</button>
      <button @click="store.doRotate('-', 90)" value="90">Rotate -</button>
      <button @click="store.doFlip(true, false)">Flip</button>
      <button @click="doFlip(false, true)">Flip Reverse</button>

      <div>
        <a-radio-group v-model:value="cropperOptions.aspectRatio" button-style="solid">
          <a-radio-button :value="0">Free</a-radio-button>
          <a-radio-button :value="16 / 9">16:9</a-radio-button>
          <a-radio-button :value="4 / 3">4:3</a-radio-button>
          <a-radio-button :value="1">1:1</a-radio-button>
          <a-radio-button :value="2 / 3">2:3</a-radio-button>
        </a-radio-group>

        <a-button
          type="primary"
          @click="openCanvasModal({ maxWidth: 4096, maxHeight: 4096 })"
        >
          Get Cropped Canvas
        </a-button>
      </div>
      <div>
        <div class="docs-buttons">
          <a-button-group>
            <a-button type="primary" @click="vueCropperRef?.setDragMode('move')">
              <template #icon><drag-outlined /></template>
            </a-button>
            <a-button type="primary" @click="vueCropperRef?.setDragMode('crop')">
              <template #icon><gateway-outlined /></template>
            </a-button>
          </a-button-group>
          <a-button-group>
            <a-button type="primary" @click="vueCropperRef?.zoom(0.1)">
              <template #icon><zoom-in-outlined /></template>
            </a-button>
            <a-button type="primary" @click="vueCropperRef?.zoom(-0.1)">
              <template #icon><zoom-out-outlined /></template>
            </a-button>
          </a-button-group>
          <a-button-group>
            <a-button type="primary" @click="vueCropperRef?.move(-10, 0)">
              <template #icon><arrow-left-outlined /></template>
            </a-button>
            <a-button type="primary" @click="vueCropperRef?.move(10, 0)">
              <template #icon><arrow-right-outlined /></template>
            </a-button>
            <a-button type="primary" @click="vueCropperRef?.move(0, -10)">
              <template #icon><arrow-up-outlined /></template>
            </a-button>
            <a-button type="primary" @click="vueCropperRef?.move(0, 10)">
              <template #icon><arrow-down-outlined /></template>
            </a-button>
          </a-button-group>
          <a-button-group>
            <a-button type="primary" @click="vueCropperRef?.rotate(-45)">
              <template #icon><rotate-left-outlined /></template>
            </a-button>
            <a-button type="primary" @click="vueCropperRef?.rotate(45)">
              <template #icon><rotate-right-outlined /></template>
            </a-button>
          </a-button-group>
          <a-button-group>
            <a-button type="primary" @click="vueCropperRef?.flipX()">
              <template #icon><swap-outlined /></template>
            </a-button>
            <a-button type="primary" @click="vueCropperRef?.flipY()">
              <template #icon><swap-outlined :rotate="90" /></template>
            </a-button>
          </a-button-group>
          <a-button-group>
            <a-button type="primary" @click="vueCropperRef?.crop()">
              <template #icon><check-outlined /></template>
            </a-button>
            <a-button type="primary" @click="vueCropperRef?.clear()">
              <template #icon><close-outlined /></template>
            </a-button>
          </a-button-group>
          <a-button-group>
            <a-button type="primary" @click="vueCropperRef?.disable()">
              <template #icon><lock-outlined /></template>
            </a-button>
            <a-button type="primary" @click="vueCropperRef?.enable()">
              <template #icon><unlock-outlined /></template>
            </a-button>
          </a-button-group>
          <a-button-group>
            <a-button type="primary" @click="vueCropperRef?.reset()">
              <template #icon><sync-outlined /></template>
            </a-button>
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              style="display: none"
              @change="onFileSelect"
            />
            <a-button type="primary" @click="fileInputRef.click()">
              <template #icon><upload-outlined /></template>
            </a-button>
            <a-button type="primary" @click="vueCropperRef?.destroy()">
              <template #icon><poweroff-outlined /></template>
            </a-button>
          </a-button-group>
        </div>
      </div>
    </div>
    <img :src="store.cropImage" alt="" />
  </div>
  <canvas-modal ref="canvasModalRef"></canvas-modal>
</template>

<style lang="scss" scoped>
@import url(@/assets/cropper.css);

.docs-preview {
  // display: flex;
  // flex-direction: row;
  // height: 10em;
}

.img-preview {
  width: 100%;
}

.preview {
  // width: 400px;
  // height: 400px;
}

.cropper-container {
  width: 100%;
  height: 100%;

  .controlls {
    width: 100%;
    position: relative;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.cropper {
  height: 600px;
  width: 600px;
  background: #ddd;
}

main {
  // overflow: scroll;
  padding: 1em;

  div {
    // display: flex;
  }
}

.img-download {
  display: flex;
  justify-content: center;
  align-items: center;
}

#image {
  // padding: 1em;
  // width: 100%;
}

input[type="image"] {
  border: 1px solid red;
}

.image-input {
  display: flex;
  flex-direction: row;
}

#image-form {
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-background-mute);
  // padding: 5em;

  label {
    // width: 100%;
    // height: 100%;
  }
}
</style>
