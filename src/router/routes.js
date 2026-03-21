import {createRouter, createWebHistory} from 'vue-router'

import { authStore } from '../stores/authStore';
import { useAdminStore } from '@/stores/adminStore';

const routes = [
    {
        path: '/login-admin',
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
        component: () => import('../views/UserMovements.vue'),
        meta: {requiresAuth: true, role: 'client'}
    },
    {
        path: '/admin/users',
        name: 'Users',
        component: () => import('../views/Users.vue'),
        meta: {requiresAuth: true, role: 'admin'},

    },
    {
        path: '/admin/users/:id/movements',
        name: 'MovementsByUser',
        component: () => import('../views/MovementsByUser.vue'),
        meta: {requiresAuth: true, role: 'admin'}
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) =>{
    const isProtected = to.matched.some(record => record.meta.requiresAuth);
    const requiredRole = to.meta.role;
    const adminStore = useAdminStore()
    if(isProtected && !authStore.token){
        return {name: 'Login'}
    }
    if(requiredRole && authStore.user?.role !== requiredRole){
        return {name: 'Dashboard'}
    }
    if(to.name == 'MovementsByUser' && !adminStore.selectedUser){
        return {name: 'Dashboard'}
    }
    
    return true
})

export default router