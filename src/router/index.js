import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Monte from '../views/Monte.vue'
import Personaliza from '../views/Personaliza.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',    
    component: About
  },
  {
    path: '/monte',
    name: 'Monte',    
    component: Monte
  },
  {
    path: '/personaliza',
    name: 'Personaliza',    
    component: Personaliza
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
