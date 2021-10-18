<template>
	<view class="cntent_dowload_zx">
		<view class="dowload_zx">
			<view v-for="(item, index) in video_card" :key="index" class="dowload_zx_card">
				<image :src="item.movieCover" style="width: 100%;height: 340rpx;"></image>
				<view style="font-size: 13px;margin-top: 5rpx;">{{item.movieName}}</view>
				<view style="font-size: 12px;color: #B2B1EA;margin-top: 5rpx;">{{item.movieIntro.substr(0,8)}}</view>
				<view class="dowload_zx_btn">下载</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			video_card: Array
		}
	}
</script>

<style>
	.cntent_dowload_zx {
		width: 100%;
		height: auto;
		background-color: #F4F4FC;
	}

	.dowload_zx {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		width: auto;
		height: auto;
		margin-top: 20rpx;
		margin-left: 24rpx;
	}

	.dowload_zx_card {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 220rpx;
		height: 470rpx;
		margin-left: 10rpx;
		margin-bottom: 10rpx;
	}

	.dowload_zx_btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 140rpx;
		height: 40rpx;
		background-color: #DAD9F5;
		border-radius: 10rpx;
		font-size: 13px;
		margin-top: 5rpx;
		color: #2A2896;
	}
</style>
