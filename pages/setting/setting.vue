<template>
	<view class="content" style="width: 100%;height: 100vh;background-color: #F4F4FC;">
		<view style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 120rpx;background-color: #F4F4FC;">
			<image src="../../static/icon/fanhui1_1.png" style="width: 40rpx;height: 40rpx;margin-top: 50rpx;margin-left: 30rpx;" @click="jump()"></image>
		</view>
		
		<view style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 80rpx;background-color: #FFFFFF;border-top: 1px solid #bfbeee;">
			<text style="font-size: 30rpx;color: #2A2896;margin-left: 60rpx;">缓存视频时禁止自动锁屏</text>
		</view>
		<view style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 80rpx;background-color: #FFFFFF;border-top: 1px solid #bfbeee;">
			<text style="font-size: 30rpx;color: #2A2896;margin-left: 60rpx;">缓存清晰度</text>
		</view>
		<view style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 80rpx;background-color: #FFFFFF;border-top: 1px solid #bfbeee;">
			<text style="font-size: 30rpx;color: #2A2896;margin-left: 60rpx;">同时缓存个数</text>
		</view>
		<view style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 80rpx;background-color: #FFFFFF;border-top: 1px solid #bfbeee;">
			<text style="font-size: 30rpx;color: #2A2896;margin-left: 60rpx;">下载网络设计</text>
		</view>
		<view style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 80rpx;background-color: #FFFFFF;margin: 80rpx 0rpx 80rpx 0rpx;">
			<text style="font-size: 30rpx;color: #2A2896;margin-left: 60rpx;">清除系统缓存</text>
		</view>
		<view style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 80rpx;background-color: #FFFFFF;border-top: 1px solid #bfbeee;">
			<text style="font-size: 30rpx;color: #2A2896;margin-left: 60rpx;">关于紫影视频</text>
		</view>
		<view style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 80rpx;background-color: #FFFFFF;border-top: 1px solid #bfbeee;">
			<text style="font-size: 30rpx;color: #2A2896;margin-left: 60rpx;">软件许可及服务协议</text>
		</view>
		<view style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 80rpx;background-color: #FFFFFF;border-top: 1px solid #bfbeee;">
			<text style="font-size: 30rpx;color: #2A2896;margin-left: 60rpx;">紫影视频隐私保护指引</text>
		</view>
		<view style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 80rpx;background-color: #FFFFFF;border-top: 1px solid #bfbeee;">
			<text style="font-size: 30rpx;color: #2A2896;margin-left: 60rpx;">紫影视频侵权投诉引导</text>
		</view>
		<view style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 80rpx;background-color: #FFFFFF;border-top: 1px solid #bfbeee;">
			<text style="font-size: 30rpx;color: #2A2896;margin-left: 60rpx;">隐私设置</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			jump() {
				console.log("页面跳转")
				uni.switchTab({
					url: '../geren/geren'
				})
			}
		}
	}
</script>

<style>
</style>
