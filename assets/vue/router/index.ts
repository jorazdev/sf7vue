import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Authentication',
        component: () => import('@app/views/authentication/AuthenticationView.vue')
    },
    {
        path: '/mail',
        name: 'Mail',
        component: () => import('@app/views/mail/MailView.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@app/layouts/LayoutDashboard.vue'),
        redirect: '/dashboard/home',
        children: [
            {
                path: '/dashboard/home',
                name: 'home',
                component: () => import('@app/views/dashboard/home/HomeView.vue')
            },
            {
                path: '/dashboard/overview',
                name: 'overview',
                component: () => import('@app/views/dashboard/overview/OverviewView.vue')
            },
            {
                path: '/dashboard/customers',
                name: 'customers',
                component: () => import('@app/views/dashboard/customers/CustomersView.vue')
            },
            {
                path: '/dashboard/products',
                name: 'Products',
                component: () => import('@app/views/dashboard/products/ProductsView.vue')
            },
            {
                path: '/dashboard/settings',
                name: 'Settings',
                component: () => import('@app/views/dashboard/settings/SettingsView.vue')
            },
        ]
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
