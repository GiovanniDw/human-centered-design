<script setup>
import { state, socket } from "@/socket.js";
import {computed} from 'vue';

const connected = computed(() => state.connected)

const connect = () => {
console.log("connecting")  

  socket.connect();

  console.log(connected.value)

}
const disconnect = () => socket.disconnect()

</script>


<template>
  <div>
    <p>State: {{ connected }}</p>
    <button @click="connect()">Connect</button>
    <button @click="disconnect()">Disconnect</button>
  </div>
</template>

<style lang="scss" scoped>

</style>