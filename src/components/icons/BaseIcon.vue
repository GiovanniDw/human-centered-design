<script setup>
import {defineProps} from 'vue';
  // defineProps = ({
  //   name: String,
  //   fill: Number,
  //   weight: Number,
  //   opsz: Number
  // });

defineProps({
  name: String,
})
</script>

<template>
  <span class="icon material-symbols-rounded">
    {{ name }}
  </span>
</template>



<style lang="scss" scoped>
span.icon:hover {
  // transform: scale(2);
}
.material-symbols-rounded {
  font-variation-settings:
  'FILL' 1,
  'wght' 500,
  'GRAD' 0,
  'opsz' 24
}


</style>