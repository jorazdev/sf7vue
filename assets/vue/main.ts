import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from './App.vue'
import router from "./router/index"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//import "material-icons/iconfont/material-icons.css"
import "material-symbols"; // https://www.npmjs.com/package/material-symbols
// https://symfony-vite.pentatrion.com/guide/getting-started.html
import "../styles/app.css"
import './permission'
const app = createApp(App);

app.use(router)
    .use(createPinia())
    .use(ElementPlus)
    .mount("#app");
