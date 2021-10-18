<template>
	<view class="content_watch">
		<view class="content_watch_title">
			<view class="font_bt">电视频道</view>
		</view>
		<view class="content_TV">
			<view style="color: #2A2896;">中央频道</view>
			<view style="display: flex;flex-wrap: wrap;justify-content: space-between; width: 90%;height: auto;">
				<view v-for="(item, index) in CCTV" :key="index" 
				style="border: 1px solid #2A2896;border-radius: 10px;margin-top: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;"
				@click="jump(item.televisionMobileUrl)" >{{item.televisionName}}</view>
			</view>
		</view>
		<view class="content_TV">
			<view style="color: #2A2896;">地方卫视</view>
			<view style="display: flex;flex-wrap: wrap;justify-content: space-between; width: 90%;height: auto;">
				<view v-for="(item, index) in channel_TV" :key="index" 
				style="border: 1px solid #2A2896;border-radius: 10px; padding: 5rpx 10rpx 5rpx 10rpx;margin-top: 30rpx;"
				@click="jump(item.televisionMobileUrl)" >{{item.televisionName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			CCTV: Array,
			channel_TV: Array
		},
		methods: {
			jump(item) {
				uni.navigateTo({
					url: '../../pages/zhibo/zhibo?item=' + item
				})
			}
		}
	}
</script>

<style>

	.content_watch {
		display: flex;
		flex-direction: column;
		align-items: center;
		/*以侧轴居中对齐*/
		width: 100%;
		height: auto;
		background-color: #F4F4FC;
		border-bottom: 2px solid #A4A3E5;
	}

	.content_watch_title {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100rpx;
	}

	.font_bt {
		font-size: 18px;
		font-weight: 600;
		color: #2A2896;
		margin-left: 36rpx;
		width: 620rpx;
	}

	.content_TV {
		display: flex;
		flex-direction: column;
		align-items: center;/*以侧轴居中对齐*/
		width: 100%;
		height: auto;
		margin-bottom: 40rpx;
	}
</style>
