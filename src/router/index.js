import Vue from 'vue';
import axios from 'axios';
import Router from 'vue-router';
import NProgress from 'nprogress';
import auth from '@/components/auth/main';
import main from '@/components/main/main';
import place from '@/components/places/place';
import places from '@/components/places/places';
import profile from '@/components/artist/profile';
import users from '@/components/artist/artists';
import types from '@/components/types/type';
import tipes from '@/components/types/types';
import store from './../store';

Vue.use(Router);


const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: auth,
    },
    {
      path: '/main',
      name: 'Main',
      component: main,
      meta: { requiresAuth: true },
    },
    {
      path: '/place',
      name: 'place',
      component: place,
      meta: { requiresAuth: true },
    },
    {
      path: '/places',
      name: 'places',
      component: places,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      meta: { requiresAuth: true },
    },
    {
      path: '/users',
      name: 'users',
      component: users,
      meta: { requiresAuth: true },
    },
    {
      path: '/type',
      name: 'type',
      component: types,
      meta: { requiresAuth: true },
    },
    {
      path: '/type/:id',
      name: 'update type',
      component: types,
      meta: { requiresAuth: true },
    },
    {
      path: '/types',
      name: 'types',
      component: tipes,
      meta: { requiresAuth: true },
    },
  { path: '*', redirect: '/main' },
  ],

});
/* Vue.http.interceptors.push((request, next) => {


})*/
axios.interceptors.request.use((config) => {
  NProgress.inc(0.2);
  NProgress.done();
  return config;
});
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  NProgress.start();
  next();
});
router.beforeEach((to, from, next) => {
  // console.log('routing: ' + to + ' -> ' + from)
  const authenticated = store.getters['auth/isAuthenticated'];

  if (to.name === 'Auth') {
    if (authenticated) {
      next({ name: 'Main' });
    }
  } else if (to.meta.requiresAuth && !authenticated) {
    next({ name: 'Auth' });
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
