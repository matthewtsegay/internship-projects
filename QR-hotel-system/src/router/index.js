import { createRouter, createWebHistory }  from 'vue-router'
import adminRouter from './AdminRouter.js'
import authRouter from './authRouter.js'
//import customerRouter from './customerRouter'
//import staffRouter from './staffRouter.js'
//import superadminRouter from './superadminRouter.js'
import { useAuthStore } from '../views/auth/store/authStore.js';



export const routes = [
                       ...adminRouter,
                       ...authRouter,
                      // ...customerRouter,
                       //...staffRouter,
                       //...superadminRouter
                      ]

const router = createRouter({
    history :createWebHistory(),
    routes 
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.isAuthenticated;
  const userRole = authStore.userRole;

  // Check if route requires authentication
  if (to.meta.requireAuth && !isLoggedIn) {
    if (to.name !== 'login') {
      return next({ name: 'login' });
    } else {
      return next(); // already on login page
    }
  }

  // Check if user has correct role
  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    if (to.name !== 'notFound') {
      return next({ name: 'notFound' }); // adjust this route name to match yours
    } else {
      return next();
    }
  }

  return next(); // allow navigation
});

export default router;
