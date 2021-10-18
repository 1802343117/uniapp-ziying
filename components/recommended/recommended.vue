<template>
	<view
		style="display: flex;flex-direction: column;width: 100%;height: auto;background-color: #F4F4FC;border-bottom: 2px solid #B2B1EA;">
		<view style="font-size: 14px;color: #2A2896;margin-top: 20rpx;margin-left: 30rpx;">为您推荐</view>
		<view v-for="(item, index) in recommended" :key="index"
			style="display: flex;align-items: center;margin-top: 20rpx;margin-left: 30rpx;">
			<view style="position: relative;">
				<image :src="item.cover" style="width: 260rpx;height: 160rpx;background-color: #007AFF;"></image>
				<text
					style="font-size: 12px;color: #ffffff;position:absolute;bottom: 10rpx;right: 10rpx">{{item.blues_number}}</text>
			</view>
	
			<view style="display: flex;flex-direction: column;margin-left: 30rpx;">
				<view style="font-size: 16px;color: #2A2896;">{{item.series_name}}</view>
				<view style="font-size: 14px;color: #B2B1EA;">{{item.introduce}}</view>
			</view>
		</view>
		<view style="display: flex;justify-content: center;margin-bottom: 20rpx;font-size: 16px;color: #2A2896;">全部
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			recommended: Array
		}
	}
</script>

<style>
</style>
