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

		<div class="px-5 flex justify-center">
			<n-button-group>
				<n-button round @click="router.push('/')" :type="route.path === '/' ? 'primary' : undefined">
					Donors
				</n-button>

				<n-button
					round
					@click="router.push('/donations')"
					:type="route.path === '/donations' ? 'primary' : undefined"
				>
					Donations
				</n-button>

				<!-- <n-button round>
					<RouterLink to="/matching-funds">Matching Funds</RouterLink>
				</n-button> -->
			</n-button-group>
		</div>

		<div class="p-5">
			<RouterView />
		</div>
	</div>
</template>

<style lang="scss"></style>
