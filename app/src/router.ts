import { createWebHistory, createRouter } from 'vue-router'

const routes = [
	{ path: '/', component: () => import('./pages/Home.vue') },
	{ path: '/donations', component: () => import('./pages/Donations.vue') },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
