<script setup>
import { ref } from 'vue'
import ImgIcon from '@/components/icons/ImgIcon.vue'
const isMyMessage = ref(false)
const props = defineProps({
  name: String,
  msg: String,
  icon: String,
  me: Boolean,
  time: String,
  src: String,
  color: String
})

// props.me ? isMyMessage.value = false : true
</script>

<template>
  <div class="message" :class="{ 'my-message': props.me }">
    <p>{{ msg }}</p>
    <span class="time">{{ time }}</span>
    <div class="icon-wrapper" v-if="src">
      <ImgIcon :src="src" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.message {
  align-self: flex-start;
  /* border: 1px solid red; */
  border-radius: 1em 1em 1em 0;
  padding: 0.7em;
  min-width: 3em;
  border: 1px solid var(--color-background-mute);
  background: var(--color-background-soft);

  &:after {
    content: '';
    background: var(--color-background-soft);
    // border: .1em solid red ;
    height: 1em;
    width: 1em;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
.message:is(.my-message) {
  border-radius: 1em 1em 0;
  align-self: flex-end;
  &::after {
    right: 0;
    left: auto;
  }
}
.time {
  font-size: 0.7em;
}

.icon-wrapper {
  font-size: 1.2em;
  color: var(--color-text-invert);
  display: flex;
  align-items: center;
  align-content: center;
  position: absolute;
  top: -1.5em;
  left: -1.5em;
  background: inherit;
  border-radius: 100%;
  padding: 0.5em;
  border: 1px solid var(--color-background-mute);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.1);
  background-color: v-bind(color);
}
</style>
