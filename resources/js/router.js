import Vue from 'vue';
import VueRouter from "vue-router";

import LoginComponent from "./components/LoginComponent";
import AdminComponent from "./components/AdminComponent";
import RoleComponent from "./components/RoleComponent";
import UserComponent from "./components/UserComponent";
import PostComponent from "./components/PostComponent"
import PageComponent from "./components/PageComponent";
import CategoryComponent from "./components/CategoryComponent";

Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: LoginComponent,
        name: 'Login'
    },
    {
        path : '/admin',
        component: AdminComponent,
        name: 'Admin',
        children: [
            {
                path: 'roles',
                component: RoleComponent,
                name: 'Roles'
            },
            {
                path: 'users',
                component: UserComponent,
                name: 'Users'
            },
            {
                path: 'posts',
                component: PostComponent,
                name: 'Posts'
            },
            {
                path: 'pages',
                component: PageComponent,
                name: 'Pages'
            },
            {
                path: 'categories',
                component: CategoryComponent,
                name: 'Categories'
            }
        ],
        beforeEnter: (to, from, next) => { //Use For Authentication
            if(localStorage.getItem('token')){
                next();
            }else{
                next('/login');
            }
        }
    }
]

export default new VueRouter({routes})
