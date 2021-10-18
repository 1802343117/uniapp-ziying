<template>
	<view class="tabBar_skewing" style="display: flex;align-items: center;justify-content: center;justify-content: space-around;width: 100%;height: 120rpx;background-color: #FFFFFF;border-top: 1px solid #2A2896;">
		<view v-for="(item, index) in list" :key="index" style="display: flex;flex-direction: column;align-items: center;justify-content: center;margin-top: 10rpx;">
			<image v-if="text == item.text" :src="item.selectedIconPath" style="width: 50rpx;height: 50rpx;"></image>
			<image v-else :src="item.iconPath" @click="skip(item)" style="width: 50rpx;height: 50rpx;"></image>
			
			<view v-if="text == item.text" style="font-size: 26rpx;color: #2A2896;">{{item.text}}</view>
			<view v-else style="font-size: 26rpx;color: #7D7BDC;">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: String
		},
		data() {
			return {
				list: [{
						text: "首页",
						pagePath: "../../pages/index/index",
						iconPath: "../../static/icon/zhuye.png",
						selectedIconPath: "../../static/icon/zhuye_1.png"
					},
					{
						text: "分类",
						pagePath: "../../pages/fenlei/fenlei",
						iconPath: "../../static/icon/fenlei.png",
						selectedIconPath: "../../static/icon/fenlei1.png"
					},
					{
						text: "热点",
						pagePath: "../../pages/remen/remen",
						iconPath: "../../static/icon/remen.png",
						selectedIconPath: "../../static/icon/remen_1.png"
					},
					{
						text: "我的",
						pagePath: "../../pages/geren/geren",
						iconPath: "../../static/icon/geren.png",
						selectedIconPath: "../../static/icon/geren1.png"
					}
				]
			}
		},
		methods: {
			skip(item) {
				uni.navigateTo({
					url: item.pagePath,
				})
			}
		}
	}
</script>

<style>
	.tabBar_skewing {
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 999;
	}
</style>
