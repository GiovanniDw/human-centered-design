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
  objectEntries,
useArrayFindIndex,
useArrayFind,
useArrayFilter
} from '@vueuse/core'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import ImgIcon from '@/components/icons/ImgIcon.vue';
import ChatMessage from '@/components/ChatMessage.vue'

defineProps({
  headerHeight: String
})

const messages = ref([])
const message = ref('')
const chatContainer = ref(null)
const chatEmote = ref('')
const chatImgEmote = ref()
const chatImgEmoteColor = ref('')
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

const emote = {
  happy: 'green',
  neutral: 'orange',
  mad: 'red'
}

const chatImgEmoteList = ref([
  { name: 'facepalm', src: facepalm, color: emote.mad },
  { name: 'group task', src: groupTask, color: emote.neutral },
  { name: 'ignore', src: ignore, color: emote.neutral },
  { name: 'learning', src: learning, color: emote.neutral },
  { name: 'mad', src: mad, color: emote.mad },
  { name: 'silence', src: silence, color: emote.mad },
  { name: 'strike', src: strike, color: emote.happy },
  { name: 'suppression', src: suppression, color: emote.mad },
  { name: 'tiedHands', src: tiedHands, color: emote.mad },
  { name: 'yesOrNo', src: yesOrNo, color: emote.neutral },
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

  let index = chatImgEmote.value
  const item = useArrayFind(chatImgEmoteList, val => val.src == index)
  // const result = useArrayFindIndex(chatImgEmoteList, i => i % index === i)
  
  const result = useArrayFilter(chatImgEmoteList, i => i.name == index)
  console.log(index) 
  console.log(result.value[0])
  console.log(chatImgEmote.value);
  const formatted = useDateFormat(date, 'YYYY-MM-DD HH:mm:ss')
  const newMessage = new Object({
    msg: message.value,
    icon:result.value[0].name,
    src: result.value[0].src,
    color: result.value[0].color,
    me: true,
    time: timeAgo
  })
  messages.value.push(newMessage)
  chatEmotesOpen.value = false;
  chatImgEmote.value = '';
  chatEmote.value = '';
  message.value = '';


  setTimeout(() => {
    sendBotMessage()  
  }, 500);
  
}

console.log(chatImgEmote)

// chatImgEmote


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
        <ChatMessage :msg="item.msg" :icon="item.icon" :src="item.src" :me="item.me" :color="item.color"
                     :time="item.time" />
      </template>
    </TransitionGroup>
  </div>
</main>

<footer ref="footerRef">
  <form class="chat-form" @submit.prevent.self="onSubmit" >
    <div class="icon-input-group">
      <button class="icon-btn icon-select-button" :class="{ open: chatEmotesOpen }" @click.capture="toggleChatEmotesOpen()">
        <BaseIcon v-if="chatEmotesOpen" name="remove" />
        <BaseIcon v-else name="add" />
      </button>
        <div class="icon-select-group" :class="{ open: chatEmotesOpen }">
          <TransitionGroup>
            <label class="icon-select" v-for="(item, index) in chatImgEmoteList" :key="item.name"
                   :for="item.name">
              <input type="radio" :id="item.name" :name="item.name" :value="item.name"
                     v-model="chatImgEmote" />
              <ImgIcon :name="item.name" :src="item.src" />
            </label> 
          </TransitionGroup>
        </div>
    </div>
    <input class="message-input" type="text" v-model="message" placeholder="your message"
           required />
    <button class="icon-btn send-button" type="submit" @click.capture="onSubmit" :disabled="!message">
      <BaseIcon :FILL="1" :wght="500" :GRAD="1" :opsz="25" name="send" />
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
  margin-inline-start: 0;
  margin-inline-end: 0;
  border: 0;
  align-self: flex-start;
}

//on fieldset
.icon-input-group {
  // font-size: var(--icon-size);
  // padding: .5em;
  // background: var(--color-error);
  // border: 1px solid gray;
  border-radius: 100%;
  display: flex;
  align-items: center;

  left: 0;
  justify-content: center;
  color: var(--color-alert);
  margin: 0;
}


button {
  cursor: pointer;

  &:disabled {
    opacity: .5;
  }
}

.icon-select-button {
  color: var(--color-background-theme);
  background-color: var(--color-background-soft);
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



// open/close btn
.icon-btn {
  border-radius: 100%;
  // padding: .1em;
  margin: 0;
  border: 0;

  padding: .8em;
  margin: 3px;
  // padding: .25em;
  // font-size: var(--icon-size);
  // font-size:var(--icon-size);
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  // position: absolute;
  z-index: 9999999;
  // height: 1.5em;
  // width: 1.5em;


  > span {

    position: absolute;
    // width: 1em;
    // height: 1em;
    text-align: center;

  }
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

  z-index: 0;
  // font-size:1.25em;

  .icon-select {
    transition: all 100ms ease-in-out;
    position: absolute;
    bottom: .2em;

    opacity: 0;
    z-index: 0;
    // font-size:1.25em;
  }

  &.open {
    flex-wrap: wrap;
    width: 50vw;
    flex-direction: row;
    justify-content: flex-start;
    // display: grid;
    // grid-template-columns: auto;
    // grid-template-rows: auto;

    bottom: v-bind(footerHeight);
    position: absolute;
    left: 0;
    gap: 1em;
    z-index: 2;

    .icon-select {
      position: relative;
      bottom: 0;
      opacity: 1;
      padding: .8em;
      z-index: 2;
    }
  }
}

.icon-select {
  // background: red;
  color: var(--color-divider-dark-1);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  // z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100%;
  width: 1.5em;
  height: 1.5em;

  &:has(:checked) {
    opacity: 1;
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
    padding: .8em;

    &:checked {
      border: 2px solid var(--color-background-theme);
      border-radius: 100%;
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
  overscroll-behavior-y: contain;
  width: 100%;
  gap: 1em;
}



footer {
  padding: 1em;
  // box-shadow: ;
  width: 100%;
  /* position: relative; */
  bottom: 0;
  // padding-bottom: var(save);
  bottom: env(safe-area-inset-bottom);
  // padding: .5em;
  // min-height: 0;
  position: sticky;
  left: 0;

  // border-top: 1px solid var(--color-background-mute);
  form.chat-form {
    display: flex;
    flex-direction: row;
    justify-items: center;
    justify-content: space-between;
    align-items: center;
    border-radius: 20em;
    padding: 0;
    margin-block-end: 0;
    margin-block-start: 0;
    border: 2px solid var(--color-background-mute);
    background-color: var(--color-background-soft);

  }


}

input[type='text'].message-input {
  // display: block;
  // border-radius: 3em;
  position: relative;
  // border: 2px solid var(--color-background-mute);
  // background-color: var(--color-background-soft);

  border: 0;
  background-color: var(--color-background-soft);
  // height: 100%;
  width: 100%;
  // font-size: 1em;
  // border: 0;
  color: var(--color-text);
  padding: 1em;
  min-height: 2em;

  // height: auto;


  &:focus-visible {
    border-color: 1px solid var(--color-background-theme);
  }
}



.send-button {
  // appearance: none;
  background-color: var(--color-blue);
  color: var(--color-text-invert);
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  // height: 1.5em;
  // width: 1.5em;
  // font-size: var(--icon-size);
}
</style>
