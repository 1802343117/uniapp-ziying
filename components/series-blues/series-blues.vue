<template>
	<view style="display: flex;flex-direction: column;background-color: #F4F4FC;border-bottom: 2px solid #B2B1EA;">
		<view style="font-size: 14px;color: #2A2896;margin-left: 30rpx;margin-top: 20rpx;">剧情与更新</view>
		<view style="display: flex;flex-wrap: wrap;align-content: flex-start;margin-left: 10rpx;margin-top: 20rpx;">
			<view v-for="(item, index) in series_details" :key= "index" style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100rpx;height: 100rpx;border-radius: 10rpx;background-color: #FFFFFF;margin-left: 20rpx;margin-bottom: 20rpx;">{{item.addressSign}}</view>
		</view>
		<view style="display: flex;justify-content: center;margin-bottom: 20rpx;font-size: 16px;color: #2A2896;">全部</view>
	</view>
</template>

<script>
	export default {
		props: {
			series_details: Array
		}
	}
</script>

<style>
</style>
