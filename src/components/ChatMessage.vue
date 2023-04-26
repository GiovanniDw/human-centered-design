
<script setup>
import { ref } from 'vue';
import BaseIcon from './icons/BaseIcon.vue';
const isMyMessage = ref(false); 
const props = defineProps({
  name: String,
  msg: String,
  icon: String,
  me: Boolean
})

// props.me ? isMyMessage.value = false : true

</script>

<template>
<div class='message' :class="{'my-message': props.me}">
  <p>{{ msg }}</p>
  <div class="icon" v-if="icon">
    <BaseIcon :name="icon" />
  </div>
</div>
</template>


<style scoped>
.message {
  align-self: flex-start;
}
.message.my-message {
  align-self: flex-end;
}


div {
  min-width: 3em;
}


</style>
