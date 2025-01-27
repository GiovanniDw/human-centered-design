import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '@/views/ChatView.vue';
// import {socket, state} from '@/socket.js';

import HomeView from '@/views/HomeView.vue';
import ImageEditorView from '@/views/ImageEditorView.vue';
import ChatViewFirst from '@/views/ChatViewFirst.vue';
import HomeViewFinal from '@/views/HomeViewFinal.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: ChatView,
      props: true
    },
    {
      path: '/image-editor',
      name: 'Image Editor',
      component: HomeView,
      props: true
    },
    {
      path: '/final-image-editor',
      name: 'Image Editor Final',
      component: HomeViewFinal,
      props: true
    },
    {
      path: '/second-chat',
      name: 'chat',
      component: ChatView,
      props: true
    },
    {
      path: '/first-chat',
      name: 'v1',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ChatViewFirst
    }
  ]
})

export default router
