<script lang="ts" setup>
import type { Header, Item } from 'vue3-easy-data-table'
import { computed } from 'vue'
import dayjs from 'dayjs'
import { NRow, NCol, NStatistic } from 'naive-ui'

import data from '../../../vuedapp-gg20-4.json'

const rowsPerPage = data.length // to show all rows

function shortenAddress(address: string): string {
	if (!address) return ''
	return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const headers: Header[] = [
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
			date: dayjs(item.timestamp).format('YYYY-MM-DD HH:mm'),
		}
	})
})
</script>

<template>
	<div>
		<div class="p-5">
			<div class="flex justify-center text-center">
				<n-statistic label="Total donations">
					{{ items.length }}
				</n-statistic>
			</div>
		</div>

		<EasyDataTable
			class="m-5 mt-0 flex flex-col h-full"
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
		</EasyDataTable>
	</div>
</template>
