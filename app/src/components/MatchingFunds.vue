<script lang="ts" setup>
import type { BodyRowClassNameFunction, Header, Item } from 'vue3-easy-data-table'
import { computed } from 'vue'
import { NStatistic } from 'naive-ui'

import data from '../../../vuedapp-gg20-results.json'

const rowsPerPage = data.length // to show all rows

const headers: Header[] = [
	{ text: '#', value: 'index', width: 20 },
	{ text: 'Project', value: 'project', width: 200 },
	{ text: 'Matching Funds', value: 'matching_funds', width: 140 },
	{ text: 'Crowdfunding', value: 'crowdfunding', width: 140 },
	{ text: 'Unique Voters', value: 'unique_voters', width: 140 },
	{ text: 'Matching Per Voter (Avg)', value: 'matching_per_voter', width: 200 },
	{ text: 'Project Page', value: 'project_page', width: 120 },
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
		}
	})
})

const totalMatchingFunds = computed(() => {
	return Number(data.reduce((acc, item) => acc + item.matching_funds, 0).toFixed(0)).toLocaleString()
})

const rankingOfMatchingFunds = computed(() => {
	const sortedData = data
		.map((item, index) => ({ ...item, index }))
		.sort((a, b) => b.matching_funds - a.matching_funds)

	const indexOf = sortedData.findIndex(item => item.project === 'Vue Dapp') + 1

	return indexOf
})

const uniqueVoter = computed(() => {
	return data.find(item => item.project === 'Vue Dapp')?.unique_voters
})

const rankingOfMatchingPerVoter = computed(() => {
	const sortedData = data
		.map((item, index) => ({ ...item, index }))
		.sort((a, b) => b.matching_per_voter - a.matching_per_voter)

	const indexOf = sortedData.findIndex(item => item.project === 'Vue Dapp') + 1

	return indexOf
})

const bodyRowClassNameFunction: BodyRowClassNameFunction = (item: Item, rowNumber: number): string => {
	if (item.project === 'Vue Dapp') {
		return 'highlight-row'
	}
	return ''
}
</script>

<template>
	<div class="mx-auto max-w-[1000px]">
		<!-- Statistic -->

		<div class="py-5 flex gap-5 flex-wrap">
			<div>
				<n-statistic label="Total Projects">
					<div>${{ items.length }}</div>
				</n-statistic>
			</div>

			<div>
				<n-statistic label="Total Matching Funds">
					<div>${{ totalMatchingFunds }}</div>
				</n-statistic>
			</div>

			<div>
				<n-statistic label="Ranking of Matching Funds">
					<div>{{ rankingOfMatchingFunds }}</div>
				</n-statistic>
			</div>

			<div>
				<n-statistic label="Ranking of Matching Per Voter">
					{{ rankingOfMatchingPerVoter }}
				</n-statistic>
			</div>
		</div>

		<EasyDataTable
			:headers="headers"
			:items="items"
			:rows-per-page="rowsPerPage"
			:body-row-class-name="bodyRowClassNameFunction"
			sort-by="matching_per_voter"
			sort-direction="asc"
			hide-rows-per-page
			hide-footer
			alternating
		>
			<template #item-matching_funds="{ matching_funds }">
				<div>${{ matching_funds }}</div>
			</template>

			<template #item-crowdfunding="{ crowdfunding }">
				<div>${{ crowdfunding }}</div>
			</template>

			<template #item-matching_per_voter="{ matching_per_voter }">
				<div>${{ matching_per_voter }}</div>
			</template>

			<template #item-project_page="{ project_page }">
				<a :href="project_page" target="_blank">Link</a>
			</template>
		</EasyDataTable>
	</div>
</template>

<style>
.highlight-row {
	--easy-table-body-row-background-color: #a6efef;
}
</style>
