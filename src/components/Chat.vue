<script setup>
import { ref, computed } from 'vue';
// import { socket } from '../socket.js';
const message = ref('');


// socket.on("users", (users) => {
//   users.forEach((user) => {
//     user.self = user.userID === socket.id;
//     initReactiveProperties(user);
//   });
//   // put the current user first, and then sort by username
//   this.users = users.sort((a, b) => {
//     if (a.self) return -1;
//     if (b.self) return 1;
//     if (a.username < b.username) return -1;
//     return a.username > b.username ? 1 : 0;
//   });
// });

socket.on('message', message.value)


const isValid = computed(() => {
    return message.value.length > 2;
  });

const onSubmit = () => {
  socket.emit("message", message.value);
  socket.connect();
  
  
};


</script>

<template>
<div>
  <form @submit.prevent="onSubmit">
    <input v-model="username" placeholder="Message" />
    <button>Send</button>
  </form>
</div>
</template>



<style lang="scss" scoped>
form {
  position: fixed;
  bottom: 0;
}
</style>