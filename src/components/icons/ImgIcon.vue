<script setup>
  // defineProps = ({
  //   name: String,
  //   fill: Number,
  //   weight: Number,
  //   opsz: Number
  // });

defineProps({
  name: String,
  src: String,
  color: String
});

// import facepalm from '@/assets/icons/facepalm.png';
// import groupTask from '@/assets/icons/group-task.png';
// import ignore from '@/assets/icons/ignore.png';
// import learning from '@/assets/icons/learning.png';
// import mad from '@/assets/icons/mad.png';
// import silence from '@/assets/icons/silence.png';
// import strike from '@/assets/icons/strike.png';
// import suppression from '@/assets/icons/suppression.png';
// import tiedHands from '@/assets/icons/tied-hands.png';
// import yesOrNo from '@/assets/icons/yes-or-no.png';


</script>

<template>
<span class="emote-img">
  <img :src="src" alt="icon"/>
</span>
</template>

<style lang="scss" scoped>
span {
  // font-size: 2em;
  display: flex;
  align-items: center;
  align-content: center;
  background-color: v-bind(color);
  border-radius: 100%;
}

img {
  max-width: 2em;
  max-height: 2em;
  height: 1.5em;
  width: 1.5em;
}
.icon {
  // font-size: inherit;
}
span.icon:hover {
  // transform: scale(2);
}
// .material-symbols-rounded {
//   font-variation-settings:
//   'FILL' 1,
//   'wght' 500,
//   'GRAD' 0,
//   'opsz' 24
// }


</style>