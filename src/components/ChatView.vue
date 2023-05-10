
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
  <div>
    <button class="icon icon-select-button">
      <BaseIcon name="add_reaction" @click="toggleChatEmotesOpen()" />
    </button>
    <div class="icon-select-group" :class="{ open: chatEmotesOpen }">
          <label class="icon-select"   v-for="(item, index) in chatEmoteList" :key="index" :for="index">
            <input type="radio" :id="index" :value="item.name" v-model="chatEmote" />
            <BaseIcon :name="item.name" />
          </label>
      </div>
  </div>
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


button.icon-select-button {
  padding: .25em;
  & > span {
    z-index: 3;
    background: #000;
  }
}

.icon-select-group {
  display: flex;
  flex-direction: column;
  gap: 0em;
  font-size: 1.4em;
  position: absolute;
  bottom: 0em;
  transition: all 300ms;
  opacity: 0;

  .icon-select {
    position: absolute;
    bottom: 0;
  }

  &.open {
    opacity: 1;
    bottom: 2em;
    position: absolute;
    gap: 1em;
    z-index: 100;

    .icon-select{
      position: relative;
      bottom: 0;
      // margin-bottom: 1em;
    }
    
  }
}




.icon-select {
  // background: red;
  color: var(--color-divider-dark-1);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  
  border-radius: 100%;
  width: 1.5em;
  height: 1.5em;
  

  label {
    // padding: .25em;
    // // display: flex;
    // display: inline-block;
    // position: absolute;
    // width: 1.5em;
    // height: 1.5em;
    // margin: auto;
  }
  &:has(:checked) {

    color: var(--color-divider-dark-2);
}

  input[type=radio] {
    width: 1.5em;
    height: 1.5em;
    display: inline-block;
    position: absolute;
    z-index: 3;
    appearance: none;
  }
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