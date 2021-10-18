<template>
	<swiper indicator-dots="true" indicator-color="#bdbdbd" indicator-active-color="#ffffff" autoplay="true"
			current="0" interval="5000" duration="1000" circular="true" previous-margin="10px" next-margin="10px"
			style="width: 100%;height: 400rpx;border-bottom: 2px solid #2A2896;">
		<block v-for="(item, index) in figure_lb" :key="index">
			<swiper-item>
				<image :src="item.cover" class="figure_lb"></image>
			</swiper-item>
		</block>
	</swiper>
</template>

<script>
	export default {
		props:['figure_lb'],
		methods: {
		}
	}
</script>

<style>
	.figure_lb {
		width: 100%;
		height: 100%;
	}
</style>
