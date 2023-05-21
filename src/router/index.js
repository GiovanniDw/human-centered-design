import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '../views/ChatView.vue'
// import {socket, state} from '@/socket.js';

import HomeView from '../views/HomeView.vue'
import ImageEditorView from '@/views/ImageEditorView.vue'
// import ChatViewFirst from '../views/ChatViewFirst.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
      component: () => import('../views/ChatViewFirst.vue')
    }
  ]
})

export default router
