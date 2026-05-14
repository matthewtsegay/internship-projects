import menuPage from '../views/customer/pages/MenuView.vue'

export default [
    {
        path:'/menu/:tableid',
        name:'menuView',
        component:()=>import('../views/customer/pages/MenuView.vue'),
        meta:{
            requireAuth:true,
            roles:['admin']
        }
    },
    {
        path:'/Checkout',
        name:'Checkout',
        component:()=>import('../views/customer/pages/Payment.vue'),
        meta:{
            requireAuth:true,
            roles:['customer']
            }
    },
    {
        path:'/orderstatus',
        name:'orderstatus',
        component:()=>import('../views/customer/pages/OrderSummary.vue'),
        meta:{
            requireAuth:true,
            roles:['customer']
        }
    },
    {
        path:'/feedback',
        name:'feedback',
        component:()=>import('../views/customer/pages/feedback.vue'),
        meta:{
            requireAuth:true,
            roles:['customer']
        }
    },
    { 
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound 
    },
]