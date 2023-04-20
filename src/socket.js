import { reactive } from "vue";
import { io } from "socket.io-client";
import VueSocketIO from "vue-socket.io";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
console.log(URL)
export const socket = io(URL, {
  // withCredentials: false,
  autoConnect: true,
  cors: "*"
});

console.log(state.connected)

socket.on("connect", () => {
  state.connected = true;
  console.log(state)
});

socket.on("disconnect", () => {
  state.connected = false;
});

// socket.on("foo", (...args) => {
//   state.fooEvents.push(args);
// });

// socket.on("bar", (...args) => {
//   state.barEvents.push(args);
// });