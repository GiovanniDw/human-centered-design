// // import { reactive } from "vue";
// // import { io } from "socket.io-client";
// // import VueSocketIO from "vue-socket.io";

// export const state = reactive({
//   connected: false,
//   users: [],
//   usernameAlreadySelected:false,
//   currentUser: ''
// });

// // "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
// console.log(URL)
// export const socket = io(URL, {
//   // withCredentials: false,
//   autoConnect: true,
//   cors: "*"
// });

// console.log(state.connected)

// socket.on("connect", (socket) => {
//   console.log(socket)
//   state.connected = true;
//   console.log(state)
// });

// socket.on("disconnect", () => {
//   state.connected = false;
// });

// socket.on('username', (username) => {
//   state.currentUser = username

//   console.log(username)
//   if (username) {
//     state.usernameAlreadySelected = true
//     state.currentUser = username
//   } else {
//     state.usernameAlreadySelected = false
//   }
// })

// socket.on("users", (...args) => {
//   state.users.push(args);
//   console.log(state.value)
// });