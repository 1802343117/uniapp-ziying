<template>
	<view style="display: flex;align-items: center;justify-content: center;width: 100%;height: auto;padding: 10rpx;border-bottom: 1px solid #2A2896;">
		<image style="width: 240rpx;height: 320rpx;background-color: #55aaff;"></image>
		<view class="content" style="width: 55%;height: 320rpx;background-color: #55ff7f;margin-left: 20rpx;">
			<view style="font-size: 40rpx;color: #2A2896;">item.movieName</view>
			<view style="display: flex;width: 80%;font-size: 30rpx;color: #2A2896;">item.movieName</view>
			<view style="width: 80%;height: 20rpx;background-color: #B2B1EA;border-radius: 50rpx;margin-top: 20rpx;">
				<view :style="{width: xiaZaiProgress + '%'}" style="height: 20rpx;background-color: #aa00ff;border-radius: 50rpx;"></view>
			</view>
			<view style="width: 80%;display: flex;justify-content: space-between;margin-top: 20rpx;">
				<view>{{xiaZaiProgress + '%'}}</view>
				<view style="display: flex;flex-direction: column;align-items: center;width: 140rpx;height: 40rpx;background-color: #DAD9F5;border-radius: 10rpx;font-size: 13px;margin-top: 5rpx;color: #2A2896;">下载</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			xiaZai: Object
		},
		data() {
			return {
				progress: 10
			}
		},
		methods: {},
		computed: {
			xiaZaiProgress: {
				get() {
					return this.progress
				},
				set(progress) {
					this.progress = progress
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;			/*以侧轴居中对齐*/
		justify-content: center;		/*以中轴居中对齐*/
	}
</style>
