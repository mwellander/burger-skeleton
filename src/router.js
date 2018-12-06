import Vue from 'vue'
import Router from 'vue-router'
import Ordering from './views/Ordering.vue'
import Home from './views/Home.vue'
import Ordering2 from './views/Ordering2.vue'
<<<<<<< HEAD
import Start from './views/Start.vue'
=======
>>>>>>> 8cf20f850f54af43b841256f3e732dd2eaf75386

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: 'NoKetchup',
      },
      name: 'ordering',
      component: Ordering
    },
    {
      path: '/favouriteburger',
      meta: {
        title: 'NoKetchup',
      },
      name: 'ordering2',
      component: Ordering2
    },
    {
      path: '/kitchen',
      meta: {
        title: 'Kitchen',
      },
      name: 'kitchen',
      // route level code-splitting
      // this generates a separate chunk (read.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "read" */ './views/Kitchen.vue')
    },
    {
      path: '/home',
      meta: {
        title: 'Home',
      },
      name: 'home',
      component: Home
    },
    {
    path:'/start',
    meta: {
      title:'Start',
    },
    name: 'start',
    component: Start
  }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router;
