<script setup>
import {onMounted, onUnmounted, computed} from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import SelectUsername from '@/components/SelectUsername.vue';
import {socket, state} from "@/socket.js";
import ConnectionState from '@/components/ConnectionState.vue';


let usernameAlreadySelected = false;

const onUsernameSelection = (username) => {
    usernameAlreadySelected = true;
    socket.auth = { username };
    socket.connect();
  };
  onMounted(() => {
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        usernameAlreadySelected = false;
      }
    });
  });

  onUnmounted(() => {
    socket.off("connect_error");
  });

</script>

<template>
  <header v-if="usernameAlreadySelected">
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
  </header>
  <SelectUsername v-if="!usernameAlreadySelected" @input="onUsernameSelection" />
  <RouterView v-else/>

  <ConnectionState/>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
