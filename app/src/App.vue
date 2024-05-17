<script setup lang="ts">
import { NButton, NButtonGroup } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
</script>

<template>
	<div>
		<div class="p-5 text-center">
			<h1 class="text-center text-3xl">Vue Dapp GG20 Results</h1>
		</div>

		<div class="flex justify-center">
			<n-button-group>
				<n-button
					class="sm:w-40"
					round
					@click="router.push('/')"
					:type="route.path === '/' ? 'primary' : undefined"
				>
					Donors
				</n-button>

				<n-button
					class="sm:w-40"
					round
					@click="router.push('/donations')"
					:type="route.path === '/donations' ? 'primary' : undefined"
				>
					Donations
				</n-button>

				<n-button
					class="sm:w-40"
					round
					@click="router.push('/matching-funds')"
					:type="route.path === '/matching-funds' ? 'primary' : undefined"
				>
					Matching Funds
				</n-button>
			</n-button-group>
		</div>

		<div class="p-5">
			<RouterView />
		</div>
	</div>
</template>

<style lang="scss"></style>
