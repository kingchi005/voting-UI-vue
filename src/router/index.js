import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import User from './User.js'

const userAuthorised = () => (sessionStorage.getItem('_x__r_a_y__m_u_m_m_y_'))

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL)
  , routes: [{
      // path: '/'
      // , name: 'home'
      // , component: HomeView
    }
    , {
      path: '/'
      , name: 'Login'
      , component: () => import('../views/Login.vue')
    }
    , {
      path: '/operation'
      , name: 'Admin Operation'
      , component: () => import('../views/AdminOperation.vue')
      , meta: { needsAuth: true }
    }
    , {
      path: '/election-stat'
      , name: 'Election Statistics'
      , component: () => import('../views/ElectionStats.vue')
      , meta: { needsAuth: true }
    }
    /*, {
      path: '/login'
      , name: 'Admin Login'
      , component: () => import('../views/Login.vue')
    }*/
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth && !userAuthorised()) next({name:'Login'})
  else next()
})

export default router