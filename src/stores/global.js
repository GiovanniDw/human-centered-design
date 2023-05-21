import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useToggle } from '@vueuse/core'

export const useGlobalStore = defineStore('global', () => {
  const avatar = ref()
  const open = ref(false)

  function setAvatar(baseURL) {
return avatar.value = baseURL    
  }

  function openCloseModal() {
    console.log(open.value)
    if (open.value == false) {
      open.value = true
    } else {
      open.value = true
    }
  }
  return { open, openCloseModal, avatar, setAvatar }
})
