
<script setup>
import { ref } from 'vue';
import BaseIcon from '@/components/icons/BaseIcon.vue';
import ChatMessage from '@/components/ChatMessage.vue';
const messages = ref([]);
const message = ref('');

// import Chat from '../components/Chat.vue';
const sendBotMessage = () => {
  const botMessage = {
    msg: 'hi how are you?',
    icon: '',
    me: false
}
messages.value.push(botMessage);
}

sendBotMessage();
const onSubmit = () => {
  console.log(message)
  const newMessage = new Object({
    msg: message.value,
    icon: 'send',
    me: true
  })

  messages.value.push(newMessage);
  message.value = ''

  // onUsernameSelection(username.value)
  
};

</script>

<template>
<main>
  <div id="chat-messages">
    <template v-for="(item, index) in messages" :key="index">
      <ChatMessage :msg="item.msg" :icon="item.icon" :me="item.me"/>
    </template>
  </div>
</main>


<footer class="chat-input">
  <form class="chat-form" @submit.prevent="onSubmit">
    <button class="icon">
      <BaseIcon name="add_reaction" />
    </button>
    <input class="message-input" type="text" v-model="message" placeholder="your message" />
    <button class="icon">
      <BaseIcon name="send" />
    </button>
  </form>
</footer>
</template>

<style scoped lang="scss">
main {
  display: flex;
  align-content: stretch;
  background: gray;
  border: 1px solid red;
  flex-grow: 1;
  align-self: stretch;
  /* flex: 1 1 auto; */
  /* min-height: 10em; */
  height: 100cqh;
  max-height: 100cqh;
  overflow-y: scroll;
  /* flex-grow: 1; */

}

/* #app {
  display: grid;
  align-content: stretch;
  flex-direction: column;
} */

#chat-messages {

  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  width: auto;
  overflow: scroll;
  width: 100%;

}

.chat-form {
  display: flex;
  flex-direction: row;
  justify-items: stretch;
  justify-content: space-between;
}

footer {
  width: 100%;
  width: 100%;
  /* position: relative; */
  bottom: 0;
  // padding: .5em;
  min-height: 0;
  left: 0;


  form {
    gap: 1em;
    border: 1px solid red;
    padding: .7em;
  }

  .message-input {
    width: 100%;
    border: 0;
    padding-left: 1em;
  }

}
</style>