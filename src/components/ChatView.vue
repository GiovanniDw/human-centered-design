
<script setup>
import { ref } from 'vue';
import { useNow, useDateFormat, useTimeAgo, useScroll, useToggle } from '@vueuse/core';
import BaseIcon from '@/components/icons/BaseIcon.vue';
import ChatMessage from '@/components/ChatMessage.vue';

const messages = ref([]);
const message = ref('');
const chatContainer = ref(null);
const chatEmote = ref('');

const chatEmoteList = ref([{ name: 'sentiment_satisfied', color: '' }, { name: 'mood_bad', color: '' }])

const chatEmotesOpen = ref(false);
const toggleChatEmotesOpen = useToggle(chatEmotesOpen)

const date = new Date();
const timeAgo = useTimeAgo(date);


const sendBotMessage = () => {
  const botMessage = {
    msg: 'hi how are you?',
    icon: '',
    me: false,
    time: timeAgo
  }
  messages.value.push(botMessage);
}

sendBotMessage();



const onSubmit = () => {
  const { x, y } = useScroll(chatContainer);

  const formatted = useDateFormat(date, 'YYYY-MM-DD HH:mm:ss')
  const newMessage = new Object({
    msg: message.value,
    icon: chatEmote.value,
    me: true,
    time: timeAgo
  });
  messages.value.push(newMessage);
  chatEmote.value = '';
  message.value = '';
};

const onMessage = (el, done) => {
  chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
}



</script>

<template>
<main>
  <div id='chat-messages' ref="chatContainer">
    <TransitionGroup name="list" @enter="onMessage">
      <template v-for="(item, index) in messages" :key="index">
        <ChatMessage :msg="item.msg" :icon="item.icon" :me="item.me" :time="item.time" />
      </template>
    </TransitionGroup>
  </div>
</main>


<footer class="chat-input">
  <form class="chat-form" @submit.prevent="onSubmit">
    <button class="icon" @click="toggleChatEmotesOpen">
      <BaseIcon name="add_reaction" />
      <div>
        <template v-for="(item, index) in chatEmoteList" :key="index">
          <input type="radio" :id="item.name" :value="item.name" v-model="chatEmote" />
          <label :for="item.name">
            <BaseIcon :name="item.name" />
          </label>




        </template>
      </div>
      <input type="radio" id="sentiment_satisfied" value="sentiment_satisfied" v-model="chatEmote" />
      <label for="sentiment_satisfied">
        <BaseIcon name="sentiment_satisfied" />
      </label>
      <input type="radio" id="mood_bad" value="mood_bad" v-model="chatEmote" />
      <label for="mood_bad">
        <BaseIcon name="mood_bad" />
      </label>
    </button>
    <input class="message-input" type="textarea" v-model="message" required placeholder="your message" />
    <button class="icon">
      <BaseIcon name="send" />
    </button>
  </form>
</footer>
</template>

<style scoped lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}


main {
  display: flex;
  align-content: stretch;
  // background: gray;
  // border: 1px solid red;
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
  padding: 1em;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  width: auto;
  overflow-y: scroll;
  width: 100%;
  gap: 1em;

}

.chat-form {
  display: flex;
  flex-direction: row;
  justify-items: stretch;
  justify-content: space-between;
}

footer {
  // box-shadow: ;
  width: 100%;
  width: 100%;
  /* position: relative; */
  bottom: 0;
  // padding: .5em;
  // min-height: 0;
  left: 0;


  form {
    gap: 1em;
    // border: 1px solid red;
    padding: .7em;
  }

  .message-input {
    width: 100%;
    border: 0;
    padding-left: 1em;
    min-height: 2em;
  }

}
</style>