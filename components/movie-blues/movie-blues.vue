<template>
	<view style="display: flex;flex-direction: column;background-color: #F4F4FC;border-bottom: 2px solid #B2B1EA;">
		<view style="font-size: 14px;color: #2A2896;margin-left: 30rpx;margin-top: 10rpx;">电影列表</view>
		<swiper cancelable=true display-multiple-items="2" current="0"
		style="margin-top: 20rpx;margin-left: 30rpx;">
			<block v-for="(item, index) in movie" :key= "index">
				<swiper-item>
					<view style="display: flex;flex-direction: column;">
						<view style="width: 330rpx;height: 200rpx;position: relative;">
							<image :src="item.cover" style="width: 100%;height: 100%;"></image>
							<view style="display: flex;flex-direction: column;width: 330rpx;height: 200rpx;position:absolute;top: 0px;">
								<view style="width: 110rpx; position:absolute;top: 10rpx;right: 10rpx;font-size: 12px;color: #FFFFFF;background-color: #B2B1EA;text-align: center;border-radius: 10px;">{{item.version}}</view>
								<view style="position:absolute;bottom: 10rpx;right: 10rpx;font-size: 12px;color: #FFFFFF;">{{item.duration}}</view>
							</view>
						</view>
						<view style="font-size: 14px;color: #2A2896;">{{item.movie_name + "(" + item.version +")"}}</view>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			movie: Array
		}
	}
</script>

<style>
</style>
