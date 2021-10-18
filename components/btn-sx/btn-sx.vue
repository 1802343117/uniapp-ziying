<template>
	<!-- <view v-if="btn_show" class="content_sx" style="width: 100%;height: 50rpx;" @click="btn()">
		<image src="../../static/icon/shuaxin_1.png" style="width: 30rpx;height: 30rpx;"></image>
		<text style="font-size: 15pxcolor: #2A2896;margin-left: 10rpx;">换一批</text>
	</view>
	<view v-else class="content_sx" style="width: 100%;height: 50rpx;background-color: #007AFF;" @click="btn()">
		<image src="../../static/icon/shuaxin_1.png" style="width: 30rpx;height: 30rpx;"></image>
		<text style="font-size: 15pxcolor: #2A2896;margin-left: 10rpx;">换一批</text>
	</view> -->
	<button type="default" class="content_sx" hover-class="content_sx_press">
		<image src="../../static/icon/shuaxin_1.png" style="width: 30rpx;height: 30rpx;"></image>
		<text style="font-size: 15pxcolor: #2A2896;margin-left: 10rpx;">换一批</text>
	</button>
</template>

<script>
	export default {
		data() {
			return {
				btn_show: true
			}
		},
		methods: {
			btn() {
				this.btn_show = !this.btn_show
				console.log(this.btn_show)
			}
		}
	}
</script>

<style>
	button::after {
		border: none;
	}
	.content_sx {
		display: flex;
		flex-direction: row;
		align-items: center;			/*以侧轴居中对齐*/
		justify-content: center;		/*以中轴居中对齐*/
		width: 100%;height: 50rpx;
		background-color: #F4F4FC;
	}
	.content_sx_press {
		background-color: #d8d8d8;
	}
</style>
