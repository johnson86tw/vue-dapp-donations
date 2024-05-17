<script lang="ts" setup>
import type { Header, Item } from 'vue3-easy-data-table'
import { computed, ref } from 'vue'
import { shortenAddress } from '@/utils'
import { NStatistic, NSwitch, NInputNumber } from 'naive-ui'

import data from '../../../vuedapp-gg20-5.json'

const rowsPerPage = data.length // to show all rows

const valueLargerEqualThan = ref<number>(1)
const hasValueFilter = ref<boolean>(true)

const scoreLargerEqualThan = ref<number>(1)
const hasScoreFilter = ref<boolean>(true)

const headers: Header[] = [
	{ text: '#', value: 'index', width: 20 },
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
	let res = data.map((item: any) => {
		return {
			...item,
			index: data.indexOf(item) + 1,
			score: Number(item.score),
		}
	})

	if (hasValueFilter.value) {
		res = res.filter(item => item.total_usd_value_at_time >= valueLargerEqualThan.value)
	}

	if (hasScoreFilter.value) {
		res = res.filter(item => item.score >= scoreLargerEqualThan.value)
	}

	return res
})

const totalCrowdfunding = computed(() => {
	return data.reduce((acc, item) => acc + item.total_usd_value_at_time, 0).toFixed(0)
})

const totalDonors = computed(() => data.length)

const crowdfunding = computed(() => {
	return items.value.reduce((acc, item) => acc + item.total_usd_value_at_time, 0).toFixed(0)
})
</script>

<template>
	<div class="mx-auto max-w-[800px]">
		<!-- Statistic & Filter -->
		<div class="py-5 flex flex-row justify-between gap-5 flex-wrap">
			<!-- Statistic -->
			<div class="flex gap-5 flex-wrap">
				<div>
					<n-statistic label="Total Donors">
						{{ totalDonors }}
					</n-statistic>
				</div>

				<div>
					<n-statistic label="Total Crowdfunding">
						<div>${{ totalCrowdfunding }}</div>
					</n-statistic>
				</div>

				<div>
					<n-statistic label="Filtered Donors">
						{{ items.length }}
					</n-statistic>
				</div>

				<div>
					<n-statistic label="Filtered Crowdfunding">
						<div>${{ crowdfunding }}</div>
					</n-statistic>
				</div>
			</div>

			<!-- Filters -->
			<div class="flex flex-col gap-2">
				<!-- Value Filter -->
				<div class="flex gap-2">
					<n-switch v-model:value="hasValueFilter" />
					<div>Value >=</div>
					<n-input-number
						:disabled="!hasValueFilter"
						class="w-[80px] text-center"
						v-model:value="valueLargerEqualThan"
						size="tiny"
						button-placement="both"
						:min="0"
					/>
				</div>

				<!-- Score Filter -->
				<div class="flex gap-2">
					<n-switch v-model:value="hasScoreFilter" />
					<div>Score >=</div>
					<n-input-number
						:disabled="!hasScoreFilter"
						class="w-[80px] text-center"
						v-model:value="scoreLargerEqualThan"
						size="tiny"
						button-placement="both"
						:min="0"
					/>
				</div>
			</div>
		</div>

		<EasyDataTable
			:headers="headers"
			:items="items"
			:rows-per-page="rowsPerPage"
			hide-rows-per-page
			hide-footer
			alternating
		>
			<template #item-donor="{ donor }">
				<a :href="`https://ggwrapped.gitcoin.co/?address=${donor}`" target="_blank">
					{{ shortenAddress(donor) }}
				</a>
			</template>

			<template #item-donor_ens="{ donor_ens }">
				<a :href="`https://${donor_ens}.xyz/`" target="_blank">{{ donor_ens }}</a>
			</template>

			<template #item-total_usd_value_at_time="{ total_usd_value_at_time }">
				<div>${{ total_usd_value_at_time }}</div>
			</template>
		</EasyDataTable>
	</div>
</template>
