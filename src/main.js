import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router.js'
import { createPinia } from 'pinia'
import { useTaskStore } from './stores/TaskStore'

const pinia = createPinia()
const app = createApp(App)

// Регистрация хранилища
const taskStore = useTaskStore(pinia)

// Загрузка сохраненных задач
taskStore.loadTasks()

app.use(pinia).use(router).mount('#app')
