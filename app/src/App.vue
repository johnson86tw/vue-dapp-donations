<script setup lang="ts">
import { NButton, NButtonGroup } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
	<div class="flex flex-col items-center">
		<div class="w-full">
			<div class="p-5 text-center">
				<h1 class="text-center text-3xl">Vue Dapp GG20 Donations</h1>
			</div>

			<div class="px-5 flex justify-center">
				<n-button-group>
					<n-button round @click="router.push('/')">Donors</n-button>
					<n-button round @click="router.push('/donations')">Donations </n-button>

					<!-- <n-button round>
					<RouterLink to="/matching-funds">Matching Funds</RouterLink>
				</n-button> -->
				</n-button-group>
			</div>

			<RouterView />
		</div>
	</div>
</template>

<style lang="scss"></style>
