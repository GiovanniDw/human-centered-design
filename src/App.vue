<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";

// import ChatView from '@/components/ChatView.vue'
import ModalBase from "@/components/ModalBase.vue";
import BaseIcon from "./components/icons/BaseIcon.vue";
import { RouterLink, RouterView } from "vue-router";
import { set, useElementBounding } from "@vueuse/core";
import ImageEditor from "@/components/ImageEditor.vue";
import ImgIcon from "./components/icons/ImgIcon.vue";
import avatar from "@/assets/avatar.png";
const headerRef = ref(null);

const { height } = useElementBounding(headerRef);

const headerHeight = computed(() => {
  const { height } = useElementBounding(headerRef);
  return height.value + "px";
});

import { useGlobalStore } from "@/stores/global.js";
const store = useGlobalStore();
</script>

<template>
  <header ref="headerRef">
    <div class="profile">
      <button class="profile" @click="store.open = true">
        <ImgIcon :src="avatar" class="avatar" name="person" />
      </button>
      <RouterLink to="/">
        <span>Jhon Doe</span>
      </RouterLink>
    </div>
    <Teleport to="body">
      <ModalBase title="Edit Avatar">
        <ImageEditor />
      </ModalBase>
    </Teleport>
    <nav>
      <RouterLink to="/second-chat">Final Chat</RouterLink>
      <RouterLink to="/first-chat">First Chat</RouterLink>
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
  button.profile {
    appearance: none;
    border: 0;
    background-color: transparent;
  }
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
