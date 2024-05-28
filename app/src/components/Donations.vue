<script lang="ts" setup>
import type { Header, Item } from 'vue3-easy-data-table'
import { computed } from 'vue'
import dayjs from 'dayjs'
import { NStatistic } from 'naive-ui'
import { shortenAddress } from '@/utils'

import data from '../../../vuedapp-gg20-4.json'

const rowsPerPage = data.length // to show all rows

const headers: Header[] = [
	{ text: '#', value: 'index', width: 20 },
	{ text: 'Date', value: 'date', width: 150 },
	{ text: 'Transaction', value: 'hash', width: 120 },
	{ text: 'Donor', value: 'donor', width: 120 },
	{ text: 'ENS Name', value: 'donor_ens', width: 200 },
	{ text: 'Score', value: 'score', width: 70 },
	{ text: 'USD Value at Time', value: 'usd_value_at_time', width: 150 },
	{ text: 'Token', value: 'token', width: 70 },
	{ text: 'Value', value: 'value' },
].map(header => {
	return {
		...header,
		sortable: true,
	}
})

const items = computed<Item[]>(() => {
	return data.map((item: any) => {
		return {
			...item,
			index: data.indexOf(item) + 1,
			date: dayjs(item.timestamp).format('YYYY-MM-DD HH:mm'),
		}
	})
})
</script>

<template>
	<div class="mx-auto max-w-[1100px]">
		<!-- Statistic -->
		<div class="p-2">
			<div class="flex justify-center text-center">
				<n-statistic label="Total donations">
					{{ items.length }}
				</n-statistic>
			</div>
		</div>

		<div class="pb-5">
			<a href="/scatter.png" target="_blank">
				<img src="/scatter.png" alt="scatter" />
			</a>
		</div>

		<EasyDataTable
			:headers="headers"
			:items="items"
			:rows-per-page="rowsPerPage"
			hide-rows-per-page
			hide-footer
			alternating
		>
			<template #item-date="{ date }">
				<p>{{ date }}</p>
			</template>

			<template #item-hash="{ hash }">
				<a :href="`https://arbiscan.io/tx/${hash}`" target="_blank">{{ shortenAddress(hash) }}</a>
			</template>

			<template #item-donor="{ donor }">
				<a :href="`https://ggwrapped.gitcoin.co/?address=${donor}`" target="_blank">{{
					shortenAddress(donor)
				}}</a>
			</template>

			<template #item-donor_ens="{ donor_ens }">
				<a :href="`https://${donor_ens}.xyz/`" target="_blank">{{ donor_ens }}</a>
			</template>

			<template #item-usd_value_at_time="{ usd_value_at_time }">
				<div>${{ usd_value_at_time }}</div>
			</template>
		</EasyDataTable>
	</div>
</template>
