import login from "../views/auth/pages/login.vue";

export default [
  //  {
  //      path:'/',
   //     name:'login',
  //      component:login,
   // },
    {
        path:'/MenuManager',
        name:'MenuManager',
        component:()=>import('../views/admin/pages/menu/MenuManager.vue'),
        //meta:{
           // requireAuth:true,
           // roles:['admin']}
    },
    {
        path:'/AddMenu',
        name:'AddMenu',
        component:()=>import('../views/admin/pages/menu/AddMenu.vue'),
       // meta:{
         //   requireAuth:true,
        //    //roles:['admin']}
    },
    {
        path:'/Addstaff',
        name:'Addstaff',
        component:()=>import('../views/admin/pages/staff/Addstaff.vue'),
       // meta:{
         //   requireAuth:true,
        //    //roles:['admin']}
    },
    {
        path:'/staffManager',
        name:'staffManager',
        component:()=>import('../views/admin/pages/staff/StaffManager.vue'),
       // meta:{
          //  requireAuth:true,
          //  roles:['admin']}
    },
    {
        path:'/Admindashboard',
        name:'Admindashboard',
        component:()=>import('../views/admin/pages/AdminDashboard.vue'),
        meta:{ requireAuth:true,roles:['admin']},
        children:[
          
            {
                path:'/EditMenu',
                name:'EditMenu',
                component:()=>import('../views/admin/pages/menu/EditMenu.vue'),
                meta:{
                    requireAuth:true,
                    roles:['admin']}
            },
           // {
           //     path:'/Admindashboard',
             //   name:'Admindashboard',
            //    component:()=>import('../views/admin/pages/AdminDashboard.vue'),
             //   meta:{
                 //   requireAuth:true,
                  //  roles:['admin']}
           // },

          
            {
                path:'/feedbackViewer',
                name:'feedbackViewer',
                component:()=>import('../views/admin/pages/FeedbackViewer.vue'),
                meta:{
                    requireAuth:true,
                    roles:['admin']}
            }
        ]
    }

]