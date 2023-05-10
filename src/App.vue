<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'

// import ChatView from '@/components/ChatView.vue'
import BaseIcon from './components/icons/BaseIcon.vue'
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
<header>
  <div class="profile">
    <RouterLink to="/">
      <BaseIcon class='avatar' name="person" /> <span>Barry</span>
    </RouterLink>
  </div>
  <div>
    <RouterLink to="/v1">v1</RouterLink>
  </div>
</header>
<RouterView />
<!-- <ChatView /> -->
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  // min-height: 1em;
  font-size: 1em;
  padding: 0.7em;
  // position: sticky;
  top: 0;
  border-bottom: 1px solid var(--color-background-soft);

  .profile {
    display: flex;
    align-items: center;
    align-content: center;
    gap: 0.5em;
    font-size: var(--icon-size);
    // padding: .5em;

    a {
      display: flex;
      align-items: center;
      align-content: center;
    }

    .avatar {
      padding: .5em;
    }
  }
}
</style>
