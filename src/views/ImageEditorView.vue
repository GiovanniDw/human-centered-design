<script setup>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import { Cropper } from 'vue-advanced-cropper'
import { ref } from 'vue'
import 'vue-advanced-cropper/dist/style.css'
const imageInput = ref(null)

const image = ref({
  src: null,
  type: null
})

const onImgSubmit = () => {
  let img = imageInput.value
}

console.log(imageInput.value)

function getMimeType(file, fallback = null) {
  const byteArray = new Uint8Array(file).subarray(0, 4)
  let header = ''
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i].toString(16)
  }
  switch (header) {
    case '89504e47':
      return 'image/png'
    case '47494638':
      return 'image/gif'
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      return 'image/jpeg'
    default:
      return fallback
  }
}

const imageFile = ref(null)
const imagePreview = ref('')

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  imageFile.value = file

  // Generate a preview URL for the uploaded image
  imagePreview.value = URL.createObjectURL(file)
}
</script>

<template>
  <main>
    <div class="image-input">
      <div class="input-group">
        <label for="image"><BaseIcon name="image" /></label>
        <input type="file" accept="image/*" @change="handleImageUpload" />
      </div>
      <Cropper class="cropper" :src="imagePreview" @change="handleImageUpload" />
    </div>
    <!-- <div>
      <img :src="imagePreview" alt="Uploaded Image" v-if="imagePreview" />
    </div> -->
  </main>
</template>

<style lang="scss" scoped>
main {
  overflow: scroll;
  padding: 1em;

  div {
    display: flex;
  }
}

#image {
  padding: 1em;
  width: 100%;
}

input[type='image'] {
  border: 1px solid red;
}

.image-input {
  display: flex;
  flex-direction: column;
}

#image-form {
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
