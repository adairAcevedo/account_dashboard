import {createRouter, createWebHistory} from 'vue-router'

import { authStore } from '../stores/authStore';

const routes = [
    {
        path: '/loginAdmin',
        name: 'LoginAdmin',
        component: () => import('../views/AdminLogin.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../Login.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/movements',
        name: 'Movements',
        component: () => import('../views/Dashboard.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/admin/users',
        name: 'Users',
        component: () => import('../views/Users.vue'),
        meta: {requiresAuth: true, role: 'admin'},

    },
    {
        path: '/admin/users/:id/movements',
        name: 'UserMovements',
        component: () => import('../views/UserMovements.vue'),
        meta: {requiresAuth: true, role: 'admin'}
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) =>{
    const isProtected = to.matched.some(record => record.meta.requiresAuth);
    const requiredRole = to.meta.role;
    if(isProtected && !authStore.token){
        next({name: 'Login'})
    }
    if(requiredRole && authStore.user?.role !== requiredRole){
        return next({name: 'Dashboard'})
    }
    next();
})

export default router