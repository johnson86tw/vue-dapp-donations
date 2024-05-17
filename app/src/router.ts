import { createWebHistory, createRouter } from 'vue-router'

const routes = [
	{ path: '/', component: () => import('./pages/home.vue') },
	{ path: '/donations', component: () => import('./pages/donations.vue') },
	{
		path: '/matching-funds',
		component: () => import('./pages/matching-funds.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
