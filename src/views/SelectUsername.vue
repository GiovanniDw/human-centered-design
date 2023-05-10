<script setup>
import { computed, ref, toRef } from 'vue'
import { socket, state } from '@/socket.js'

const { currentUser, usernameAlreadySelected } = state
const username = ref('')

const isValid = computed(() => {
  return username.value.length > 2
})

const getInput = computed(() => {
  return username.value
})

const onSubmit = () => {
  socket.connect()
  socket.emit('set username', username.value)
  console.log(username.value)

  state.usernameAlreadySelected = true
  // onUsernameSelection(username.value)
}

const onUsernameSelection = (username) => {
  socket.connect()
  console.log(username)
  console.log(usernameAlreadySelected)
  socket.auth = { username }
}

// const onUsernameSelection = (username) => {
// console.log(username.value);
// console.log(usernameAlreadySelected)

// };
</script>

<template>
  <div class="select-username">
    <form @submit.prevent="onSubmit">
      <input v-model="username" placeholder="Your username..." />
      <button :disabled="!isValid">Send</button>
    </form>
    {{ state.usernameAleadySelected }}
  </div>
</template>

<style scoped>
.select-username {
  width: 300px;
  margin: 200px auto 0;
}
</style>
