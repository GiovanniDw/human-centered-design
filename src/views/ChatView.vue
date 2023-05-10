<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import {
  useNow,
  useDateFormat,
  useTimeAgo,
  useScroll,
  useToggle,
  useElementSize,
  useElementBounding,
  objectEntries
} from '@vueuse/core'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import ImgIcon from '@/components/icons/ImgIcon.vue';
import ChatMessage from '@/components/ChatMessage.vue'

const messages = ref([])
const message = ref('')
const chatContainer = ref(null)
const chatEmote = ref('')
const chatImgEmote = ref('')
const footerRef = ref(null);
// const footerHeight = ref(0)
const chatEmoteList = ref([
  { name: 'sentiment_satisfied', color: 'var(--color-succes)' },
  { name: 'mood_bad', color: 'var(--color-error)' }
])

import facepalm from '@/assets/icons/facepalm.png';
import groupTask from '@/assets/icons/group-task.png';
import ignore from '@/assets/icons/ignore.png';
import learning from '@/assets/icons/learning.png';
import mad from '@/assets/icons/mad.png';
import silence from '@/assets/icons/silence.png';
import strike from '@/assets/icons/strike.png';
import suppression from '@/assets/icons/suppression.png';
import tiedHands from '@/assets/icons/tied-hands.png';
import yesOrNo from '@/assets/icons/yes-or-no.png';


const chatImgEmoteList = ref([
  { name: 'facepalm', src: facepalm },
  { name: 'group task', src: groupTask },
  { name: 'ignore', src: ignore },
  { name: 'learning', src: learning },
  { name: 'mad', src: mad },
  { name: 'silence', src: silence },
  { name: 'strike', src: strike },
  { name: 'suppression', src: suppression },
  { name: 'tiedHands', src: tiedHands },
  { name: 'yesOrNo', src: yesOrNo },
])



const chatEmotesOpen = ref(false)
const toggleChatEmotesOpen = useToggle(chatEmotesOpen)

chatEmote.value ? (chatEmotesOpen.value = false) : ''

const date = new Date()
const timeAgo = useTimeAgo(date)

const sendBotMessage = () => {
  const botMessage = {
    msg: 'hi how are you?',
    icon: '',
    me: false,
    time: timeAgo
  }

  messages.value.push(botMessage)
}

sendBotMessage()

const getFooterHeight = useElementSize(footerRef).height

const setFooterHeight = reactive({
  height: getFooterHeight.value
})

// console.log(getFooterHeight.height)

const onSubmit = () => {
  const { x, y } = useScroll(chatContainer)

  const formatted = useDateFormat(date, 'YYYY-MM-DD HH:mm:ss')
  const newMessage = new Object({
    msg: message.value,
    icon: chatImgEmote.value,
    src: chatImgEmote.value,
    me: true,
    time: timeAgo
  })
  messages.value.push(newMessage)
  chatEmotesOpen.value = false
  chatImgEmote.value = ''
  chatEmote.value = ''
  message.value = '';
  
}

const onMessage = (el, done) => {
  chatContainer.value.scrollTop = chatContainer.value.scrollHeight
}

// onMounted(() => {
//   footerHeight.value = footerRef.value.offsetHeight + 'px'
// })

const footerHeight = computed(() => {
  const { height } = useElementBounding(footerRef);
  return height.value + 'px'
})



</script>

<template>
<main>
  <div id="chat-messages" ref="chatContainer">
    <TransitionGroup name="list" @enter="onMessage">
      <template v-for="(item, index) in messages" :key="index">
        <ChatMessage :msg="item.msg" :icon="item.icon" :src="item.src" :me="item.me"
                     :time="item.time" />
      </template>
    </TransitionGroup>
  </div>
</main>

<footer ref="footerRef" class="chat-input">
  <form class="chat-form" @submit.prevent="">
    <fieldset class="icon-input-group">
        <button class="icon-btn icon-select-button" @click="toggleChatEmotesOpen()">
          <ImgIcon v-if="chatImgEmote" :src="chatImgEmote" />
          <BaseIcon v-else name="add_reaction" />
        </button>
        <div class="icon-select-group" :class="{ open: chatEmotesOpen }">
          <label class="icon-select" v-for="(item, index) in chatImgEmoteList" :key="index"
                 :for="index">
            <input type="radio" :id="index" :value="item.src" v-model="chatImgEmote" />
            <ImgIcon :name="item.name" :src="item.src" />
          </label>
        </div>
      </fieldset>
    <input class="message-input" type="textarea" v-model="message" required
           placeholder="your message" />
      
    <button class="icon-btn send-button" type="submit" @keyup.enter.left="onSubmit" @submit="onSubmit" @click="onSubmit">
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

fieldset {
  padding: 0;
  margin: 0;
}
button {
  cursor: pointer;
}
.icon-input-group {
  // font-size: var(--icon-size);
  // padding: .5em;
  // background: var(--color-error);
  // border: 1px solid gray;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-alert);
}

// button.icon-select-button {
//   // padding: .25em;
//   font-size: var(--icon-size);
//   color: var(--color-black-mute);
//   border-radius: 100%;
//   background: var(--color-white);
//   & > span {
//     z-index: 3;

//     // font-size: var(--icon-size);

//   }
// }

.icon-btn {
  border-radius: 100%;

  margin: 0;
  border: 0;

  padding: 1em;
  // padding: .25em;
  // font-size: var(--icon-size);
  // font-size:var(--icon-size);
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 4;
  // height: 1.5em;
  // width: 1.5em;


  > span {

    position: absolute;
    // width: 1em;
    // height: 1em;
    text-align: center;

  }
}

.send-button {
  appearance: none;

  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  // height: 1.5em;
  // width: 1.5em;
  // font-size: var(--icon-size);
}

.icon-select-group {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  // gap: 1em;
  font-size: 1.5em;
  position: absolute;
  bottom: 0;
  transition: all 300ms;
  opacity: 0;
  z-index: 1;
  // font-size:1.25em;

  .icon-select {
    position: absolute;
    bottom: 0;
    // font-size:1.25em;
  }

  &.open {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    opacity: 1;
    bottom: v-bind(footerHeight);
    position: absolute;
    left: 0;
    gap: 1em;
    z-index: 100;

    .icon-select {
      position: relative;
      bottom: 0;
      padding: 1em;
      z-index: 2;
    }
  }
}

.icon-select {
  // background: red;
  color: var(--color-divider-dark-1);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  z-index: 0;
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
    z-index: 9999999;
  }

  input[type='radio'] {
    width: 1.5em;
    height: 1.5em;
    display: inline-block;
    position: absolute;
    z-index: 3;
    appearance: none;
    font-size: inherit;

    &:checked {
      opacity: 0;
    }
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
  align-items: center;
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
    // background: #000;
    // padding: 1em;
    gap: 1em;
    margin: 1em;
    // border: 1px solid red;
  }

  .message-input {
    width: 100%;
    border: 0;
    padding-left: 1em;
    // padding: 1em;
    min-height: 2em;
    // height: auto;
  }
}
</style>
