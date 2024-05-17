<script lang="ts" setup>
import type { Header, Item } from 'vue3-easy-data-table'
import { computed } from 'vue'
import { shortenAddress } from '@/utils'
import { NRow, NCol, NStatistic } from 'naive-ui'

import data from '../../../vuedapp-gg20-5.json'

const headers: Header[] = [
	{ text: 'Donor', value: 'donor', width: 120 },
	{ text: 'ENS Name', value: 'donor_ens', width: 200 },
	{ text: 'Score', value: 'score', width: 70 },
	{ text: 'Value', value: 'total_usd_value_at_time', width: 70 },
	{ text: 'Donation Count', value: 'donation_count', width: 150 },
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
			score: Number(item.score),
		}
	})
})

const crowdfunding = computed(() => {
	return items.value.reduce((acc, item) => acc + item.total_usd_value_at_time, 0).toFixed(0)
})
</script>

<template>
	<div class="flex flex-col items-center">
		<div class="max-w-[1200px]">
			<div class="p-5">
				<n-row>
					<n-col :span="5">
						<n-statistic label="Crowdfunding">
							<div>${{ crowdfunding }}</div>
						</n-statistic>
					</n-col>
					<n-col :span="5">
						<n-statistic label="Donors">
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
				show-index
				hide-rows-per-page
				hide-footer
				alternating
			>
				<template #item-donor="{ donor }">
					<a :href="`https://ggwrapped.gitcoin.co/?address=${donor}`" target="_blank">{{
						shortenAddress(donor)
					}}</a>
				</template>

				<template #item-donor_ens="{ donor_ens }">
					<a :href="`https://${donor_ens}.xyz/`" target="_blank">{{ donor_ens }}</a>
				</template>

				<template #item-total_usd_value_at_time="{ total_usd_value_at_time }">
					<div>${{ total_usd_value_at_time }}</div>
				</template>
			</EasyDataTable>
		</div>
	</div>
</template>
