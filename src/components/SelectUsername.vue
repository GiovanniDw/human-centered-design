<script setup>
import {computed} from 'vue';
  let username = "";
  
  const isValid = computed(() => {
    return username.length > 2;
  });

  const onSubmit = () => {
    emit("input", username);
  };
</script>

<template>
  <div class="select-username">
    <form @submit="onSubmit">
      <input v-model="username" placeholder="Your username..." />
      <button>Send</button>
    </form>
  </div>
</template>


<style scoped>
.select-username {
  width: 300px;
  margin: 200px auto 0;
}
</style>