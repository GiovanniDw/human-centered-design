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
const { doRotate, doFlip, flip, rotate, cropper, onFileCancel, onFileChange } = store;
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

const rotateValue = ref(0);

const cropperOptions = reactive({
  aspectRatio: 0,
  viewMode: 0,
  responsive: true,
  restore: true,
  checkCrossOrigin: true,
  checkOrientation: true,
  modal: true,
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
  <div v-show="!store.url" class="image-input-container img-container">
    <div class="input-group">
      <label class="image-input-label" for="image">
        <BaseIcon class="icon" name="move_to_inbox" />
        <span>Click or Drag an Image to Start Editing</span>
      </label>
      <input
        class="image-input"
        type="file"
        id="image"
        name="image"
        accept="image/*"
        @change="store.onFileChange"
      />
    </div>
  </div>
  <VueCropper
    v-show="store.url"
    ref="vueCropperRef"
    class="img-container"
    :src="store.url"
    preview=".img-preview"
    v-bind="cropperOptions"
    @crop="onCrop"
    :imageStyle="{
      borderRadius: '100%',
    }"
  />
  <div>
    <div class="controlls" v-show="store.url">
      <!-- <button @click="store.crop">Crop</button>
      <button @click="store.doRotate('+', 90)" value="90">Rotate +</button>
      <button @click="store.doRotate('-', 90)" value="90">Rotate -</button>
      <button @click="store.doFlip(true, false)">Flip</button>
      <button @click="doFlip(false, true)">Flip Reverse</button> -->

      <div class="docs-buttons">
        <a-radio-group v-model:value="cropperOptions.aspectRatio" button-style="solid">
          <a-radio-button :value="0">
            <BaseIcon class="icon" name="crop_free" />
          </a-radio-button>
          <a-radio-button :value="16 / 9">
            <BaseIcon name="crop_16_9" />
          </a-radio-button>
          <a-radio-button :value="4 / 3">
            <BaseIcon name="crop_landscape" />
          </a-radio-button>
          <a-radio-button :value="1">
            <BaseIcon name="crop_square" />
          </a-radio-button>
          <a-radio-button :value="2 / 3">
            <BaseIcon name="crop_portrait" />
          </a-radio-button>
        </a-radio-group>
      </div>

      <div class="docs-buttons">
        <a-button-group>
          <a-button type="default" @click="vueCropperRef?.setDragMode('move')">
            <template #icon>
              <BaseIcon name="drag_pan" />
            </template>
          </a-button>
          <a-button type="default" @click="vueCropperRef?.setDragMode('crop')">
            <template #icon>
              <BaseIcon name="resize" />
            </template>
          </a-button>
        </a-button-group>
        <a-button-group>
          <a-button type="default" @click="vueCropperRef?.zoom(0.1)">
            <template #icon>
              <BaseIcon name="zoom_in" />
            </template>
          </a-button>
          <a-button type="default" @click="vueCropperRef?.zoom(-0.1)">
            <template #icon>
              <BaseIcon name="zoom_out" />
            </template>
          </a-button>
        </a-button-group>
        <a-button-group>
          <a-button type="default" @click="vueCropperRef?.move(-10, 0)">
            <template #icon>
              <BaseIcon name="arrow_back" />
            </template>
          </a-button>
          <a-button type="default" @click="vueCropperRef?.move(10, 0)">
            <template #icon>
              <BaseIcon name="arrow_forward" />
            </template>
          </a-button>
          <a-button type="default" @click="vueCropperRef?.move(0, -10)">
            <template #icon>
              <BaseIcon name="arrow_upward" />
            </template>
          </a-button>
          <a-button type="default" @click="vueCropperRef?.move(0, 10)">
            <template #icon>
              <BaseIcon name="arrow_downward" />
            </template>
          </a-button>
        </a-button-group>
        <a-button-group>
          <a-button type="default" @click="vueCropperRef?.rotate(-45)">
            <template #icon>
              <BaseIcon name="rotate_left" />
            </template>
          </a-button>

          <a-button type="default" @click="vueCropperRef?.rotate(45)">
            <template #icon>
              <BaseIcon name="rotate_right" />
            </template>
          </a-button>
        </a-button-group>

        <a-button-group>
          <a-button type="default" @click="vueCropperRef?.flipX()">
            <template #icon> <BaseIcon name="swap_horiz" /> </template>
          </a-button>
          <a-button type="default" @click="vueCropperRef?.flipY()">
            <template #icon> <BaseIcon name="swap_vert" /> </template>
          </a-button>
        </a-button-group>
        <a-button-group>
          <!-- <a-button type="default" @click="vueCropperRef?.crop()">
            <template #icon>
              <check-outlined />
            </template>
          </a-button> -->
          <a-button type="default" @click="vueCropperRef?.clear()">
            <template #icon>
              <BaseIcon name="restart_alt" />
            </template>
          </a-button>
        </a-button-group>
        <!-- <a-button-group>
          <a-button type="primary" @click="vueCropperRef?.reset()">
            <template #icon>
              <BaseIcon name="restart_alt" />
            </template>
          </a-button>
          <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            style="display: none"
            @change="store.onFileChange"
          />
          <a-button type="default" @click="fileInputRef.click()">
            <template #icon>
              <BaseIcon name="upload" />
            </template>
          </a-button>
        </a-button-group> -->
      </div>
      <div class="docs-buttons last">
        <a-button type="secondary" @click="onFileCancel"> Cancel </a-button>
        <a-button
          type="primary"
          @click="openCanvasModal({ maxWidth: 1000, maxHeight: 1000 })"
        >
          Review Edit
        </a-button>
      </div>
    </div>
  </div>
  <canvas-modal ref="canvasModalRef"></canvas-modal>
</template>

<style scoped lang="scss">
@import url(@/assets/cropper.css);

.icon .docs-buttons:deep(.material-symbols-rounded) {
  font-size: 1.25em;
}

.docs-buttons.last {
  padding-bottom: 0;
  margin-bottom: 0;
}
.image-input-group {
  display: flex;
  width: 100%;
  height: 100%;
  // justify-content: stretch;
  // align-items: stretch;
  // flex-direction: row;
  // display: flex;
  align-items: center;
  justify-content: center;
}
.image-input {
  display: block;
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
}
.image-input-label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
  // position: absolute;
  top: 0;
  left: 0;
  // position: absolute;
  height: 100%;
  width: 100%;

  .icon {
    font-size: 3em;
  }
}

.image-input {
  width: 100%;
  // display: none;
}

.img-container {
  display: grid;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  align-self: center;
  overflow: hidden;
  // height: 100%;
  max-width: 500px;
  max-height: 500px;
}

input[type="image"] {
  border: 1px solid red;
}

// .image-input {
//   display: flex;
//   flex-direction: row;
// }

#image-form {
}

.input-group {
  justify-self: stretch;
  align-self: stretch;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-background-mute);
  // padding: 5em;

  label {
    // width: 100%;
    // height: 100%;
  }
}

.ant-radio-button-wrapper {
  padding: 0.5em;
  // line-height: 1;
  // font-size: 13px;
  width: auto;
  height: auto;

  :deep(span:nth-child(2)) {
    display: flex;
    padding: 0.1em;
    font-size: 1.5em;
  }
}

.ant-radio-button {
  font-size: 1.5em;
}

.docs-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  flex-wrap: wrap;
  margin-top: 1em;
  margin-bottom: 1em;
}
.cropper-crop {
  opacity: 0.3;
}
.ant-btn-group {
  border-radius: 25em;
  overflow: hidden;
  border: 1px solid transparent;
  border-color: var(--color-border);

  > .ant-btn:first-child {
    border-radius: 25em 0 0 25em !important;
  }
  > .ant-btn:last-child {
    border-radius: 0 25em 25em 0 !important;
  }
}
.ant-btn {
  border-color: var(--color-border);
}

.ant-btn-group .ant-btn-icon-only {
  font-size: 1.1em;
}

.ant-btn-icon-only {
  // padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
}
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
</style>
