import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: ()=>import('./components/Home.vue')
  },
  {
    name:'task-list',
    path:'/tasks',
    component:()=>import('./components/TaskList.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router