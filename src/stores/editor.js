import { ref, computed, shallowRef, reactive } from 'vue'
import { defineStore } from 'pinia'
import { set, useObjectUrl } from '@vueuse/core'
import avatar from '@/assets/avatar.png'

export const useEditorStore = defineStore('editor', () => {
  // const url = ref(new URL('@/assets/avatar.png', import.meta.url).href)
  const url = ref()
  const newUrl = ref()
  const newfile = shallowRef()
  const file = shallowRef()
  const cropper = ref({
    rotate: 0,
    flip: {
      horizontal: false,
      vertical: false
    }
  })
  // const url = useObjectUrl(file);
  const cropImage = ref(null)
  const cropperCoords = ref({
    width: 0,
    height: 0,
    left: 0,
    top: 0
  })
  const rotate = ref(0)
  const flip = ref({
    horizontal: 0,
    vertical: 0
  })

  const avatar = ref()

  // const doubleCount = computed(() => count.value * 2);
  // const onFileChange = (event) => {
  //   try {
  //     file.value = event.target.files[0];
  //     console.log(event.target);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const saveAvatar = (img) => {
    // console.log(img)
    // newUrl.value = URL.createObjectURL(newfile)
    // newfile.value = null

    // const url = useObjectUrl(img);
    // set(avatar, url)

    set(avatar, img.toDataURL())

    console.log(avatar.value)
  }

  const onFileCancel = (e) => {
    url.value = false
    file.value = null
  }

  const onFileChange = (event) => {
    const files = event.target.files
    if (files && files.length) {
      const file = files[0]
      if (/^image\/\w+/.test(file.type)) {
        url.value = URL.createObjectURL(file)
        file.value = null
      } else {
        window.alert('Please choose an image file.')
      }
    }
  }

  function crop() {
    const { coordinates, canvas, image } = cropper.value.getResult()
    // You able to do different manipulations at a canvas
    // but there we just get a cropped image, that can be used
    // as src for <img/> to preview result
    console.log(coordinates)
    set(cropperCoords, coordinates)
    console.log(cropperCoords.value)
    set(image, canvas.toDataURL())
    set(cropImage, image)
  }
  function onChange({ coordinates, canvas }) {
    console.log(coordinates)
    set(cropperCoords, coordinates)
    console.log(cropperCoords.value)
    set(cropImage, canvas.toDataURL())
    // this.coordinates = coordinates;
    // // You able to do different manipulations at a canvas
    // // but there we just get a cropped image, that can be used
    // // as src for <img/> to preview result
    // this.image = canvas.toDataURL();
  }
  function defaultTransforms() {
    return {
      rotate: rotate.value,
      flip: {
        horizontal: flip.value.x,
        vertical: flip.value.y
      }
    }
  }

  function doFlip(x, y) {
    // cropper.value.flip(x, y);

    flip.value.x = x
    flip.value.y = y

    console.log(flip.value)

    cropper.value = {
      flip: {
        horizontal: x,
        vertical: y
      }
    }
  }
  function doRotate(to, angle) {
    if (to == '+') {
      rotate.value += angle
    }
    if (to == '-') {
      rotate.value -= angle
    }

    cropper.value = {
      rotate: rotate.value
    }

    // console.log(angle)
    // set(rotate, angle);

    // set(cropper, {rotate: angle})
  }

  return {
    cropImage,
    url,
    file,
    onChange,
    onFileChange,
    crop,
    cropperCoords,
    cropper,
    rotate,
    flip,
    doRotate,
    doFlip,
    defaultTransforms,
    saveAvatar,
    onFileCancel
  }
})
