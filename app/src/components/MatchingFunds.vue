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
	{ text: 'Matching Per Voter (Avg)', value: 'avg_matching_per_voter', width: 200 },
	{ text: 'Passing Voters', value: 'passing_voters', width: 130 },
	{ text: 'Percent Passing', value: 'percent_passing', width: 140 },
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

const rankingOfCrowdfunding = computed(() => {
	const sortedData = data.map((item, index) => ({ ...item, index })).sort((a, b) => b.crowdfunding - a.crowdfunding)

	const indexOf = sortedData.findIndex(item => item.project === 'Vue Dapp') + 1

	return indexOf
})

const rankingOfMatchingFunds = computed(() => {
	const sortedData = data
		.map((item, index) => ({ ...item, index }))
		.sort((a, b) => b.matching_funds - a.matching_funds)

	const indexOf = sortedData.findIndex(item => item.project === 'Vue Dapp') + 1

	return indexOf
})

const rankingOfUniqueVoters = computed(() => {
	const sortedData = data.map((item, index) => ({ ...item, index })).sort((a, b) => b.unique_voters - a.unique_voters)

	const indexOf = sortedData.findIndex(item => item.project === 'Vue Dapp') + 1

	return indexOf
})

const rankingOfMatchingPerVoter = computed(() => {
	const sortedData = data
		.map((item, index) => ({ ...item, index }))
		.sort((a, b) => b.avg_matching_per_voter - a.avg_matching_per_voter)

	const indexOf = sortedData.findIndex(item => item.project === 'Vue Dapp') + 1

	return indexOf
})

const bodyRowClassNameFunction: BodyRowClassNameFunction = (item: Item, _rowNumber: number): string => {
	if (item.project === 'Vue Dapp') {
		return 'highlight-row'
	}
	return ''
}
</script>

<template>
	<div class="mx-auto">
		<!-- Statistic -->
		<div class="flex flex-col items-center">
			<div class="py-5 flex gap-5">
				<div class="flex justify-center text-center">
					<n-statistic label="Total Projects">
						<div>{{ items.length }}</div>
					</n-statistic>
				</div>

				<div class="flex justify-center text-center">
					<n-statistic label="Total Matching Funds">
						<div>${{ totalMatchingFunds }}</div>
					</n-statistic>
				</div>
			</div>

			<div class="py-5 flex justify-center gap-5 flex-wrap">
				<div class="flex justify-center text-center">
					<n-statistic label="Ranking of Matching Funds">
						<div>{{ rankingOfMatchingFunds }}</div>
					</n-statistic>
				</div>

				<div class="flex justify-center text-center">
					<n-statistic label="Ranking of Crowdfunding">
						<div>{{ rankingOfCrowdfunding }}</div>
					</n-statistic>
				</div>

				<div class="flex justify-center text-center">
					<n-statistic label="Ranking of Unique Voters">
						{{ rankingOfUniqueVoters }}
					</n-statistic>
				</div>

				<div class="flex justify-center text-center">
					<n-statistic label="Ranking of Matching Per Voter">
						{{ rankingOfMatchingPerVoter }}
					</n-statistic>
				</div>
			</div>
		</div>

		<EasyDataTable
			:headers="headers"
			:items="items"
			:rows-per-page="rowsPerPage"
			:body-row-class-name="bodyRowClassNameFunction"
			sort-by="avg_matching_per_voter"
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

			<template #item-avg_matching_per_voter="{ avg_matching_per_voter }">
				<div>${{ avg_matching_per_voter }}</div>
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
