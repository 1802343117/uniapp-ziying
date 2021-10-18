<template>
	<view class="content">
		<!-- <view style="width: 100%;height: 30rpx;background-color: #F4F4FC;"></view> -->
		
		<view class="remen_title dinbuguding">
			<view class="font_bt" style="margin-top: 30rpx;">紫影·热点咨讯</view>
			<image src="../../static/icon/sousuo_1.png" style="width: 46rpx;height: 46rpx;margin-top: 30rpx;" @click="soshuo()"></image>
		</view>
		
		<swiper-lb :figure_lb= "figure_lb" style="height: 340rpx;margin-top: 130rpx;"></swiper-lb>
		
		<remen-card style="padding-bottom: 120rpx;"></remen-card>
		
		<diy-tabBar :text="'热点'"></diy-tabBar>
		
		<view v-show="this.gongneng_show" style="width: 20rpx;height: 100rpx;position: fixed;bottom: 200rpx;right: 0;background-color: #2A2896;border-radius: 50rpx;" @click="qiehuan()"></view>
		<view v-show="!this.gongneng_show" style="width: 18%;height: 100%;position: fixed;top: 0;right: 0;background-color: rgba(38, 43, 54, 0.8);;margin: 130rpx 0 100rpx 0;">
			<view style="display: flex;flex-direction: column;align-items: center;">
				<image src="../../static/icon/geren.png" style="width: 80rpx;height: 80rpx;margin-top: 80rpx;" @click="jump_personal('1')"></image>
				<image src="../../static/icon/bianji.png" style="width: 80rpx;height: 80rpx;margin-top: 80rpx;" @click="jump_personal('2')"></image>
				<image src="../../static/icon/fanhui.png" style="width: 80rpx;height: 80rpx;margin-top: 80rpx;" @click="qiehuan()"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import swiperLb from '../../components/swiper-lb/swiper-lb.vue'
	import remenCard from '../../components/remen-card/remen-card.vue'
	import diyTabBar from '../../components/diy-tabBar/diy-tabBar.vue'
	export default {
		data() {
			return {
				figure_lb: [
					{
						cover: "../../static/img/1.jpg"
					},
					{
						cover: "../../static/img/2.jpg"
					},
					{
						cover: "../../static/img/3.jpg"
					},
				],
				remen_list: [],
				gongneng_show: true
			}
		},
		onLoad() {
			this.$H.get('/article/articleList').then(res => {
				this.$store.state.remen_list = res.data.remen_list
			})
		},
		components: {
			"swiper-lb": swiperLb,
			"remen-card": remenCard,
			"diy-tabBar": diyTabBar
		},
		methods: {
			soshuo() {
				uni.navigateTo({
					url: '../../pages/sosuo/sosuo',
				})
			},
			qiehuan() {
				this.gongneng_show = !this.gongneng_show
			},
			jump_personal(item) {
				if (this.$store.state.user != null) {
					uni.navigateTo({
						url: '../../pages/personal/personal?item=' + item,
					})
				} else {
					uni.navigateTo({
						url: '../../pages/login/login',
					})
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
		width: 100%;height: auto;
		background-color: #F4F4FC;
	}
	.remen_title {
		display: flex;
		align-items: center;
		width: 100%;
		height: 130rpx;
		border-bottom: 2px solid #2A2896;
		background-color: #F4F4FC;
	}
	
	.font_bt {
		font-size: 18px;
		font-weight: 600;
		color: #2A2896;
		margin-left: 36rpx;
		width: 84%;
		font-style: italic;
	}
	.dinbuguding {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 999;
	}
</style>
