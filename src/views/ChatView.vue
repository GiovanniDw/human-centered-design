
<script setup>
import {ref} from 'vue';
// import Chat from '../components/Chat.vue';

</script>

<template>
  <main>
    <form @submit.prevent="onSubmit">
      <input v-model="username" placeholder="Your username..." />
      <button :disabled="!isValid">Send</button>
    </form>
  </main>
</template>
