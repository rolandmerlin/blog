import { createRouter, createWebHashHistory } from 'vue-router'

import Page_Index       from '../pages/index.vue'
import Page_Blog        from '../pages/blog.vue'
import Page_About       from '../pages/about.vue'
import Page_Login       from '../pages/login.vue'
import Page_Register    from '../pages/register.vue'

/// ADMIN
import Page_Categorie   from '../pages/categorie.vue'
import Page_Article     from '../pages/article.vue'
import Page_User        from '../pages/users.vue'

const routes = [
    {
        path:'/',
        component:Page_Index
    },{
        path:'/blog/:id',
        component:Page_Blog
    },{
        path:'/a-propos',
        component:Page_About
    },{
        path:'/login',
        component:Page_Login
    },{
        path:'/register',
        component:Page_Register
    },{
        path:'/categorie',
        component:Page_Categorie
    },{
        path:'/article',
        component:Page_Article
    },{
        path:'/user',
        component:Page_User
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router