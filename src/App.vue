<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'

// import ChatView from '@/components/ChatView.vue'
import BaseIcon from './components/icons/BaseIcon.vue'
import { RouterLink, RouterView } from 'vue-router'
import { useElementBounding } from '@vueuse/core'

const headerRef = ref(null)

const { height } = useElementBounding(headerRef)

const headerHeight = computed(() => {
  const { height } = useElementBounding(headerRef)
  return height.value + 'px'
})
</script>

<template>
  <header ref="headerRef">
    <div class="profile">
      <RouterLink to="/">
        <BaseIcon class="avatar" name="person" /> <span>Jhon Doe</span>
      </RouterLink>
    </div>
    <nav>
      <RouterLink to="/first-chat">First Chat</RouterLink>
      <RouterLink to="/second-chat">Second Chat</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style>
main {
  margin-top: v-bind(headerHeight);
}
</style>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 3;
  width: 100%;
  background: var(--color-background-theme);
  align-items: center;
  align-content: center;
  // min-height: 1em;
  font-size: 1em;
  padding: 0.7em;
  // position: sticky;
  top: 0;
  border-bottom: 1px solid var(--color-background-mute);

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
      padding: 0.5em;
    }
  }
}

nav {
  display: flex;
  gap: 1em;
}
</style>
