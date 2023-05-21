<script setup>
import { ref, useAttrs, onMounted, watchEffect } from 'vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
const props = defineProps({
  inline: Boolean,
  title: String
})
// defineEmits(["close"]);

import { useGlobalStore } from '@/stores/global.js'
const store = useGlobalStore()

const { openCloseModal, open } = store

// const attrs = useAttrs();
const dialog = ref(null)
const internalOpen = ref(false)
// function openCloseDialog() {
//   if (!dialog?.value) return;
//   if (open.value) dialog.value.showModal();
//   else dialog.value.close();
// }
// function openCloseDialog() {
//   if (!dialog?.value) return;
//   if (props.open) dialog.value.show();
//   else dialog.value.close();
// }

// function showHideDialog() {
//   if (!dialog?.value) return;
//   if (props.open) dialog.value.showModal();
//   else dialog.value.close();
// }
</script>

<template>
  <Transition name="modal">
    <div v-if="store.open" class="modal-mask">
      <div ref="dialog" class="modal-container container">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="icon" @click="store.open = false">
            <BaseIcon :name="'close'" />
          </button>
        </div>
        <div class="modal-body">
          <slot>default body</slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 500px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

.icon {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 1em;
}

.modal-mask {
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  overflow-x: scroll;
  max-width: 545px;
  margin: auto;
  padding: 1.5em;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}
</style>
