<script setup>
import {onMounted, onUnmounted, ref ,computed} from 'vue';

import ChatView from '@/components/ChatView.vue';
import BaseIcon from './components/icons/BaseIcon.vue';


</script>

<template>
  <header>
  <div class="profile">
    <BaseIcon name="person" /> <span>Barry</span>
  </div>
  <div>
  </div>
</header>
  <ChatView/>
</template>

<style lang="scss" scoped>

header {
  // min-height: 1em;
  font-size: 1em;
  padding: .7em;
  // position: sticky;
  top: 0;

  .profile {
    display: flex;
    gap: .5em;
  }

}
</style>
