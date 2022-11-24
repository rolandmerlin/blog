import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

declare global {
    interface Window {
        router:{
            push:(e:string)=>{}
        }
    }
}

import router from './router/index'
window.router = router

import {store} from './store/index'

import markdown from './components/markdown.vue'
import catname from './components/catname.vue'
import auteur from './components/auteur.vue'

import "./style.css"

const AppVue = createApp(App)
    .use(router)
    .component('markdown',markdown)
    .component('catname',catname)
    .component('auteur',auteur)
    .use(store)
    .mount('#app')
