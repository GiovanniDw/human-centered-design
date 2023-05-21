<script setup>
// import Chat from '../components/Chat.vue';

import ImageEditor from '@/components/ImageEditor.vue'
</script>

<template>
  <main>
    <ImageEditor />
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-content: center;
  // background: gray;
  // border: 1px solid red;
  flex-grow: 1;
  align-self: stretch;
  /* flex: 1 1 auto; */
  /* min-height: 10em; */
  height: 100cqh;
  max-height: 100cqh;
  overflow-y: scroll;
  padding: 1em;
  /* flex-grow: 1; */
}
</style>
