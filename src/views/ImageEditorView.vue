<script setup>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import { Cropper, Preview } from 'vue-advanced-cropper'
import { ref, shallowRef } from 'vue'
import { useImage, useObjectUrl } from '@vueuse/core'
import 'vue-advanced-cropper/dist/style.css'
import 'vue-advanced-cropper/dist/theme.classic.css'

import { useEditorStore } from '@/stores/editor'
const imageInput = ref(null)
const imageFile = ref(null)
const imagePreview = ref('')
const file = shallowRef()
const url = useObjectUrl(file)

const { isLoading } = useImage({ src: url })

const store = useEditorStore()
const { doRotate, doFlip, flip, rotate, cropper } = store
const image = ref({
  src: null,
  type: null
})

const onImgSubmit = () => {
  let img = imageInput.value
}

console.log(imageInput.value)

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
</script>

<template>
  <div>
    <div class="image-input">
      <div class="input-group">
        <label for="image">
          <BaseIcon name="image" />
        </label>
        <input type="file" id="image" accept="image/*" @change="store.onFileChange" />
      </div>
      <div class="img-download">
        <a target="_top" :href="store.cropImage">Open file</a>
      </div>
    </div>
    <div class="cropper-container">
      <Cropper
        ref="cropper"
        class="cropper"
        :src="store.url"
        @change="store.onChange"
        :canvas="{
          minHeight: 0,
          minWidth: 0,
          maxHeight: 800,
          maxWidth: 800
        }"
        :stencil-props="{
          handlers: {
            eastNorth: true,
            north: true,
            westNorth: true,
            west: true,
            westSouth: true,
            south: true,
            eastSouth: true,
            east: true
          }
        }"
      />
      <Preview
        :style="{ rotate: `rotate(${rotate + 'deg'})`, fontSize: fontSize + 'px' }"
        class="preview"
        :src="store.cropImage"
        @change="store.onChange"
        :coordinates="store.cropperCoords"
        :defaultTransforms="store.defaultTransforms"
      />
    </div>
    <div>
      <div class="controlls">
        <button @click="store.crop">Crop</button>
        <button @click="store.doRotate('+', 90)" value="90">Rotate +</button>
        <button @click="store.doRotate('-', 90)" value="90">Rotate -</button>
        <button @click="store.doFlip(true, false)">Flip</button>
        <button @click="doFlip(false, true)">Flip Reverse</button>
      </div>
      <img :src="store.cropImage" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

input[type='image'] {
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
