import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from './App.vue'
import router from "./router/index"
//import "material-icons/iconfont/material-icons.css"
import "material-symbols"; // https://www.npmjs.com/package/material-symbols


const app = createApp(App);

app.use(router)
    .use(createPinia())
    .mount("#app");
