import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useToggle } from '@vueuse/core';

export const useGlobalStore = defineStore('global', () => {
  
  const open = ref(false);
  function openCloseModal() {
    console.log(open.value)
    if (open.value == false) {
      open.value = true
    } else {
      open.value = true
    }
  }
  return { open, openCloseModal }
})
