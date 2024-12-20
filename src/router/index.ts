import { createRouter, createWebHashHistory } from 'vue-router'
import DoctorsView from '@/views/DoctorsView.vue'
import NursesView from '@/views/NursesView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/doctors',
    },
    { path: '/doctors', name: 'Doctors', component: DoctorsView },
    { path: '/nurses', name: 'Nurses', component: NursesView },
  ],
})

export default router
