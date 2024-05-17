<script lang="ts" setup>
import type { Header, Item } from 'vue3-easy-data-table'
import { computed } from 'vue'
import dayjs from 'dayjs'
import { NRow, NCol, NStatistic } from 'naive-ui'

import data from '../../../vuedapp-gg20-4.json'

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
	<div class="flex flex-col items-center">
		<div class="max-w-[1200px]">
			<div class="p-5">
				<n-row>
					<n-col :span="5">
						<n-statistic label="Total donations">
							{{ items.length }}
						</n-statistic>
					</n-col>
				</n-row>
			</div>

			<EasyDataTable
				class="m-5 mt-0 flex flex-col h-full"
				:headers="headers"
				:items="items"
				:rows-per-page="items.length"
				sort-by="usd_value_at_time"
				sort-type="desc"
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
	</div>
</template>
