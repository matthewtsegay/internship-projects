import { createRouter, createWebHistory }  from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../store/auth.js';

const router=createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            name:'HomeView',
            component:HomeView
        },
        {
            path:'/loginView',
            name:'loginView',
            component:()=>import('../views/auth/loginView.vue'),
        },
        {
            path:'/signupView',
            name:'signupView',
            component:()=>import('../views/auth/signupView.vue'),
        },
        {
            path:'/ProfileView',
            name:'ProfileView',
            component:()=>import('../views/auth/ProfileView.vue'),
            //meta:{requireAuth:true}
        },
        {
          path:'/createPost',
          name:'createPost',
          component:()=>import('../views/Blogpost/createPost.vue'),
          //meta:{requireAuth:true}
        },
        {
          path:'/EditPost/:id',
          name:'EditPost',
          component:() => import('../views/Blogpost/EditPost.vue'),
          //meta:{requireAuth:true}
        },
        {
          path:'/MyPosts',
          name:'MyPosts',
          component:() => import('../views/Blogpost/MyPosts.vue'),
          //meta:{requireAuth:true}
        },
        {
          path:'/PostDashBoard',
          name:'PostDashBoard',
          component:()=>import('../views/Blogpost/PostDashBoard.vue'),
          //meta:{requireAuth:true}
        },
        { path:'/ForgetPassword', 
          name:'ForgetPassword',
          component:()=>import('../views/auth/ForgetPassword.vue'),
          //meta:{requireAuth:true}
        },
        {
          path:'/EnterCode',
          name:'EnterCode',
          component:()=>import('../views/auth/EnterCode.vue'),
          
        },
        {
          path:'/ResetPassword',
          name:'ResetPassword',
          component:()=>import('../views/auth/ResetPassword.vue'),
        },
        {
          path:'/bloglist',
          name:'bloglist',
          component:()=>import('../views/Blogpost/bloglist.vue')
        }
    ]
})

router.beforeEach((to) => {
    const authStore = useAuthStore()
    if (to.meta.requireAuth && !authStore.isAuthenticated) {
      if (to.name !== 'loginView') {
        return { name: 'loginView' }
      }
    }
  
    if ((to.name === 'loginView' || to.name === 'signupView') 
        && authStore.isAuthenticated) {
      return { name: 'PostDashBoard' }
    }
  
    return true
  })

  export default router;