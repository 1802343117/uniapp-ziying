<template>
	<view class="content">

		<view class="content_dh dinbuguding">
			<swiper cancelable=true display-multiple-items="5"
				:current="swCurrent" circular="true" style="width: 88%;height: 54rpx;margin-top: 30rpx;margin-left: 10rpx;">
				<block v-for="(item, index) in this.$store.state.titles" :key="index">
					<swiper-item>
						<view v-if="swCurrent == index" class="content_bt font_dbt">{{item}}</view>
						<view class="content_bt font_xbt" @click="qiehuan(index, item)">{{item}}</view>
					</swiper-item>
				</block>
			</swiper>
			<image src="../../static/icon/sousuo_1.png" style="width: 45rpx;height: 45rpx;margin-top: 30rpx;" @click="soshuo()"></image>
		</view>
		
		<!--"v-model"传递变量-->
		<swiper-lb style="margin-top: 130rpx;" v-show="this.$store.state.swiperLb" :figure_lb="figure_lb"></swiper-lb>
		
		<view v-if="this.$store.state.titles[swCurrent] == '电影'" style="display: flex;align-items: center;justify-content: space-around;width: 100%;height: 260rpx;background-color: #f4f4fc;">
			<view v-for="(item, index) in yanyuan" :key="index" style="display: flex;flex-direction: column;justify-content: center;align-items: center;width: 180rpx;height: 200rpx;">
				<image :src="item.img" style="width: 150rpx;height: 150rpx;border-radius: 100px;border: 2px solid #2A2896;"></image>
				<text style="font-weight: 600;font-size: 28rpx;margin-top: 10rpx;color: #2A2896;">{{item.name}}</text>
			</view>
		</view>

		<view v-if="this.$store.state.titles[swCurrent] == '综艺'" style="display: flex;align-items: center;justify-content: space-around;width: 100%;height: 260rpx;background-color: #f4f4fc;">
			<view v-for="(item, index) in zoyi" :key="index" style="display: flex;flex-direction: column;justify-content: center;align-items: center;width: 180rpx;height: 200rpx;">
				<image :src="item.img" style="width: 150rpx;height: 150rpx;border-radius: 100px;border: 2px solid #2A2896;"></image>
				<text style="font-weight: 600;font-size: 28rpx;margin-top: 10rpx;color: #2A2896;">{{item.name}}</text>
			</view>
		</view>

		<watch-list v-if="this.$store.state.userWatch.length != 0" :watch_list="this.$store.state.userWatch"></watch-list>

		<video-list v-show="this.$store.state.videoList" :video_list="video_list" style="padding-bottom: 120rpx;"></video-list>

		<diy-tabBar :text="'首页'"></diy-tabBar>
	</view>
</template>

<script>
	import swiperLb from '../../components/swiper-lb/swiper-lb.vue'
	import actorList from '../../components/actor-list/actor-list.vue'
	import watchList from '../../components/watch-list/watch-list.vue'
	import videoList from '../../components/video-list/video-list.vue'
	import btnSx from '../../components/btn-sx/btn-sx.vue'
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
				btn_sx: "#ffffff",
				video_list: [],
				utilShu: 0,
				bool: true,
				swCurrent: 0,
				movieBiaoshi: null,
				yanyuan: [
					{
						img: "../../static/img/4.jpeg",
						name: "成龙"
					},
					{
						img: "../../static/img/5.jpeg",
						name: "甄子丹"
					},
					{
						img: "../../static/img/6.jpg",
						name: "刘德华"
					},
					{
						img: "../../static/img/8.jpg",
						name: "周润发"
					}
				],
				zoyi: [
					{
						img: "../../static/img/10.jpeg",
						name: "奔跑吧"
					},
					{
						img: "../../static/img/11.jpeg",
						name: "向往的生活"
					},
					{
						img: "../../static/img/12.jpeg",
						name: "密室大逃脱"
					},
					{
						img: "../../static/img/13.jpeg",
						name: "快乐大本营"
					}
				]
			}
		},
		onLoad() {
			// 默认推荐动漫
			this.movieBiaoshi = "动漫";
			this.utilShu = 8
			this.fenye()
		},
		onReachBottom() {
			console.log(this.bool)
			if ( this.bool ) {
				this.utilShu += 8
				this.fenye()
			} else {
				this.utilShu = 0
				uni.showToast({
					title: '没有更多内容了',
					icon: 'none'
				});
			}
		},
		components: {
			"swiper-lb": swiperLb,
			"video-list": videoList,
			"actor-list": actorList,
			"watch-list": watchList,
			"diy-tabBar": diyTabBar
		},
		methods: {
			qiehuan(index, item) {
				this.swCurrent = index
				switch (item) {
					case '推荐':
						this.$store.state.swiperLb = true
						this.$store.state.videoList = true
						this.$store.state.actorList = true
						this.$store.state.watchList = true
						this.movieBiaoshi = "动漫";
						this.utilShu = 8
						this.fenye()
						break;
					case '电视剧':
						this.$store.state.swiperLb = true
						this.$store.state.videoList = true
						this.$store.state.actorList = true
						this.$store.state.watchList = true
						this.movieBiaoshi = "电视剧";
						this.utilShu = 8
						this.fenye()
						break;
					case '电影':
						this.$store.state.swiperLb = true
						this.$store.state.videoList = true
						this.$store.state.actorList = true
						this.$store.state.watchList = true
						this.movieBiaoshi = "电影";
						this.utilShu = 8
						this.fenye()
						break;
					case '动漫':
						this.$store.state.swiperLb = true
						this.$store.state.videoList = true
						this.$store.state.actorList = true
						this.$store.state.watchList = true
						this.movieBiaoshi = "动漫";
						this.utilShu = 8
						this.fenye()
						break;
				}
			},
			soshuo() {
				uni.navigateTo({
					url: '../../pages/sosuo/sosuo',
				})
			},
			fenye() {
				let fenYeDao = {
					'movieBiaoshi': this.movieBiaoshi,
					'utilShu': this.utilShu
				}
				this.$H.post('/movieInfor/selectByFenYe', fenYeDao).then(res => {
					console.log(res.data)
					this.bool = res.data.bool
					this.video_list = res.data.movieList
					console.log(this.video_list)
				})
			}
		},
		computed: {
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		/*以侧轴居中对齐*/
		justify-content: center;
		/*以中轴居中对齐*/
	}

	.dinbuguding {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 999;
	}
	
	.content_dh {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 130rpx;
		background-color: #f4f4fc;
		border-bottom: 2px solid #2A2896;
	}
	
	.content_bt {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: auto;
		height: 54rpx;
	}
	
	.font_dbt {
		font-size: 20px;
		font-weight: 600;
		color: #2A2896;
	}
	
	.font_xbt {
		font-size: 16px;
		font-weight: 600;
		color: #7D7BDC;
	}
</style>
