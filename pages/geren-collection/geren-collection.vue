<template>
	<view class="content">
		<view style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 120rpx;background-color: #F4F4FC;border-bottom: 2px solid #2A2896;">
			<image src="../../static/icon/fanhui1_1.png" style="width: 40rpx;height: 40rpx;margin-top: 50rpx;margin-left: 30rpx;" 
				@click="jumps()">
			</image>
		</view>
		<view v-if="(this.$store.state.xiHuanList.length == 0)" class="content" style="width: 100%;height: 700rpx;background-color: #F4F4FC;">
			<image src="../../static/icon/guanzhu.png" style="width: 240rpx;height: 240rpx;"></image>
			<view style="font-size: 16px;color: #B2B1EA;font-weight: 600;margin-top: 40rpx;">暂无收藏视频</view>
		</view>
		<view v-else class="content" style="width: 100%;height: auto;background-color: #F4F4FC;">
			<view v-for="(item, index) in this.$store.state.xiHuanList" :key="index" class="shoshuo-con" 
			style="display: flex;width: 100%;height: auto;padding: 10rpx;border-bottom: 1px solid #2A2896;">
				<image :src="item.movieCover" @click="jump(item.movieId)"
				style="width: 300rpx;height: 400rpx;background-color: #55aaff;"></image>
				<view v-show="movieIntro_show" class="content" style="justify-content: space-around;width: 58%;height: 400rpx;">
					<view class="shoshuo-con" style="width: 100%;height: auto;margin-left: 40rpx;">
						<p style="font-size: 38rpx;color: #2A2896;">{{item.movieName}}</p>
					</view>
					<view class="shoshuo-con" style="width: 100%;height: auto;margin-left: 40rpx;">
						<p style="font-size: 26rpx;color: #2A2896;">类型：{{item.movieCategory}}</p>
					</view>
					<view style="display: flex;width: 100%;height: auto;margin-left: 40rpx;">
						<p style="font-size: 26rpx;color: #2A2896;">地区：{{item.moviePlace}}</p>
						<p style="font-size: 26rpx;color: #2A2896;margin-left: 20rpx;">年份：{{item.movieRelease}}</p>
						<p style="font-size: 26rpx;color: #2A2896;margin-left: 20rpx;">评分：{{item.movieScore}}</p>
					</view>
					<view style="display: flex;flex-wrap: wrap;width: auto;height: auto;margin-left: 18rpx;">
						<p style="font-size: 26rpx;color: #2A2896;">主演：{{item.movieLeading}}</p>
					</view>
					<view style="display: flex;flex-wrap: wrap;width: 100%;height: auto;margin-left: 40rpx;">
						<p style="font-size: 26rpx;color: #2A2896;">导演：{{item.movieDirector}}</p>
					</view>
					<view style="display: flex;flex-wrap: wrap;width: auto;height: auto;margin-left: 18rpx;" @click="qiehuan()">
						<p style="font-size: 26rpx;color: #2A2896;">简介：{{item.movieIntro.substr(0,29)}}</p>
					</view>
				</view>
				<view v-show="!movieIntro_show" class="content" style="justify-content: space-around;width: 58%;height: 400rpx;">
					<view style="display: flex;flex-wrap: wrap;width: auto;height: auto;margin-left: 18rpx;" @click="qiehuan()">
						<p style="font-size: 26rpx;color: #2A2896;">简介：{{item.movieIntro}}</p>
					</view>
				</view>
			</view>
		</view>
		
		<view style="display: flex;align-items: center;width: 100%;height: 40rpx;background-color: #F4F4FC;">
			<view style="width: 260rpx;height: 1rpx;background-color: #B2B1EA;"></view>
			<view style="font-size: 12px;color: #B2B1EA;margin-left: 18rpx;margin-right: 18rpx;">下载更多精彩内容</view>
			<view style="width: 260rpx;height: 1rpx;background-color: #B2B1EA;"></view>
		</view>
		
		<download-xz :video_card= "video_card"></download-xz>
	</view>
</template>

<script>
	import downloadXz from "../../components/download-xz/download-xz.vue"
	export default {
		data() {
			return {
				video_card: [],
				movieIntro_show: true,
				utilShu: 0,
				bool: true,
				movieBiaoshi: null
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
			"download-xz": downloadXz
		},
		methods: {
			jumps() {
				uni.navigateBack({
				    delta: 1
				});
			},
			fenye() {
				let fenYeDao = {
					'movieBiaoshi': this.movieBiaoshi,
					'utilShu': this.utilShu
				}
				this.$H.post('/movieInfor/selectByFenYe', fenYeDao).then(res => {
					this.bool = res.data.bool
					this.video_card = res.data.movieList
				})
			},
			jump(movieId) {
				console.log("页面跳转")
				for (let i = 0; i < this.$store.state.userWatch.length; i++) {
					if (this.$store.state.userWatch[i].movieId != movieId) {
						let userWatch = {
							"userId": this.$store.state.user.userId,
							"movieId": movieId
						}
						this.$H.post('/userWatch/addUserWatch', userWatch);
					}
				}
				uni.redirectTo({
				    url: "../../pages/series-play/series-play?id=" + movieId
				});
			},
			qiehuan() {
				this.movieIntro_show = !this.movieIntro_show
			},
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
