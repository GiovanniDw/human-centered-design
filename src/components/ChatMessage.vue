
<script setup>
import { ref } from 'vue';
import BaseIcon from './icons/BaseIcon.vue';
const isMyMessage = ref(false); 
const props = defineProps({
  name: String,
  msg: String,
  icon: String,
  me: Boolean,
  time: String
})

// props.me ? isMyMessage.value = false : true

</script>

<template>
<div class='message' :class="{'my-message': props.me}">
  <p>{{ msg }}</p><span class="time">{{time}}</span>
  <div class="icon-wrapper" v-if="icon">
    <BaseIcon :name="icon" />
  </div>
</div>
</template>


<style scoped lang="scss">
.message {
  align-self: flex-start;
  /* border: 1px solid red; */
  border-radius: 1em 1em 1em 0;
  padding: .7em;
  min-width: 3em;
  border: 1px solid gray;
background: var(--color-background-soft);


  &:after{
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
  font-size: .7em;
}


.icon-wrapper {
  color: var(--color-text-invert);
  display: flex;
  align-items: center;
  align-content: center;
  position: absolute;
  top: -1em;
  left: -1em;
  background: #000;
  border-radius: 100%;
  padding: .3em;
}

</style>
