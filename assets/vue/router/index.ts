import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'signin',
        component: () => import('@app/views/authentication/AuthenticationView.vue')
    },
    {
        path: '/mail',
        name: 'Mail',
        component: () => import('@app/views/mail/MailView.vue')
    },
    {
        path: '/apps',
        name: 'Apps',
        component: () => import('@app/views/apps/AppsView.vue')
    },
    {
        path: '/course',
        name: 'course',
        component: () => import('@app/layouts/LayoutCourse.vue'),
        redirect: '/course/home',
        children: [
            {
                path: '/course/home',
                name: 'course-home',
                meta: {
                    requiresAuth: true
                },
                component: () => import('@app/views/course/home/HomeView.vue')
            },
        ]
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
                meta: {
                    requiresAuth: true
                },
                component: () => import('@app/views/dashboard/home/HomeView.vue')
            },
            {
                path: '/dashboard/overview',
                name: 'overview',
                meta: {
                    requiresAuth: true
                },
                component: () => import('@app/views/dashboard/overview/OverviewView.vue')
            },
            {
                path: '/dashboard/customers',
                name: 'customers',
                meta: {
                    requiresAuth: true
                },
                component: () => import('@app/views/dashboard/customers/CustomersView.vue')
            },
            {
                path: '/dashboard/products',
                name: 'products',
                meta: {
                    requiresAuth: true
                },
                component: () => import('@app/views/dashboard/products/ProductsView.vue')
            },
            {
                path: '/dashboard/settings',
                name: 'settings',
                meta: {
                    requiresAuth: true
                },
                component: () => import('@app/views/dashboard/settings/SettingsView.vue')
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@app/views/PageNotFound.vue')
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
