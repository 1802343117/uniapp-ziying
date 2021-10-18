<template>
	<view class="content">
		<view v-if="videoSrc != null" style="width: 100%;height: auto;">
			<view style="width: 100%;background-color: #F4F4FC;height: 50rpx;"></view>
			<view style="display: flex;align-items: center;justify-content: space-around; width: 100%;height: auto;background-color: #F4F4FC;">
				<image src="../../static/icon/fanhui2.png" style="width: 55rpx;height: 55rpx;margin: 10rpx 0 20rpx 0rpx;" @click="jump"></image>
				<view style="width: 500rpx;font-size: 40rpx;font-weight: 600;color: #2A2896;text-align: center;">{{movieInfor.movieName}}</view>
				<image src="../../static/icon/shuoming.png" style="width: 55rpx;height: 55rpx;"></image>
			</view>
			<video :src="videoSrc" objectFit=" fill" style="width: 100%;height: 400rpx;">
			</video>

			<view style="display: flex;flex-direction: column;background-color: #F4F4FC;">
				<view style="width: 100%;height: auto;margin-top: 20rpx;">
					<p style="font-size: 16px;color: #2A2896;margin-left: 20rpx;">{{movieInfor.movieName+'·'+videoSign}}</p>
				</view>
				<view style="width: 100%;height: auto;">
					<p style="font-size: 14px;color: #A4A3E5;margin-left: 20rpx;">{{movieInfor.movieScore}}分·全集43集·简介</p>
				</view>
				<view style="display: flex;justify-content: space-between;margin-left: 30rpx;margin-top: 10rpx;">
					<image v-if="dianzan" src="../../static/icon/dianzan.png" style="width: 56rpx;height: 56rpx;" 
						@click="dianzan = !dianzan"></image>
					<image v-else src="../../static/icon/dianzan1.png" style="width: 56rpx;height: 56rpx;" 
						@click="dianzan = !dianzan"></image>
					<view>
						<image v-if="xihuan" src="../../static/icon/xihuan.png" style="width: 56rpx;height: 56rpx;margin-right: 30rpx;" 
							@click="addXihuan(movieInfor)">
						</image>
						<image v-else src="../../static/icon/xihuan_1.png" style="width: 56rpx;height: 56rpx;margin-right: 30rpx;"
							@click="deleteXihuan(movieInfor)">
						</image>
						<image src="../../static/icon/xiazai.png" style="width: 56rpx;height: 56rpx;margin-right: 30rpx;"
							@click="xiaZai()">
						</image>
						<image src="../../static/icon/fenxiang.png" style="width: 56rpx;height: 56rpx;margin-right: 30rpx;"
							@click="fenXiang()">
						</image>
					</view>
				</view>
			</view>

			<view style="display: flex;flex-direction: column;background-color: #F4F4FC;border-bottom: 2px solid #B2B1EA;">
				<view style="font-size: 14px;color: #2A2896;margin-left: 30rpx;margin-top: 20rpx;">剧情与更新</view>
				<view style="display: flex;flex-wrap: wrap;align-content: flex-start;margin-left: 10rpx;margin-top: 20rpx;">
					<view v-for="(item, index) in series_details" :key= "index" @click="huanVideoSrc(item)"
					style="display: flex;flex-direction: column;align-items: center;justify-content: center;
					width: 100rpx;height: 100rpx;border-radius: 10rpx;background-color: #FFFFFF;
					margin-left: 20rpx;margin-bottom: 20rpx;">{{item.addressSign}}</view>
				</view>
				<view style="display: flex;justify-content: center;margin-bottom: 20rpx;font-size: 16px;color: #2A2896;">全部</view>
			</view>
			
			<!-- <movie-blues :movie= "movie"></movie-blues> -->

		</view>
		<view v-else style="width: 100%;height: auto;">
			<view style="width: 100%;height: 40rpx;background-color: #F4F4FC;"></view>
			<view style="display: flex;align-items: center;justify-content: space-between; width: 100%;height: auto;background-color: #F4F4FC;">
				<image src="../../static/icon/fanhui2.png" style="width: 55rpx;height: 55rpx;margin-left: 20rpx;" @click="jump"></image>
				<!-- <image src="../../static/icon/shuoming.png" style="width: 55rpx;height: 55rpx;margin-right: 20rpx;" @click="jump"></image> -->
			</view>
			<view class="content" style="width: 100%;height: 700rpx;background-color: #F4F4FC;">
				<image src="../../static/icon/zanmeishuju.png" style="width: 240rpx;height: 240rpx;"></image>
				<view style="font-size: 16px;color: #B2B1EA;font-weight: 600;margin-top: 40rpx;">暂无视频资源</view>
			</view>
		</view>
		
		<video-list v-show="this.$store.state.videoList" :video_list="video_list"></video-list>
	</view>
</template>

<script>
	import seriesDetails from '../../components/series-details/series-details.vue'
	import seriesBlues from '../../components/series-blues/series-blues.vue'
	import movieBlues from '../../components/movie-blues/movie-blues.vue'
	export default {
		data() {
			return {
				series_details: [],
				movieInfor: {},
				videoSrc: null,
				videoSign: null,
				video_list: [],
				bool: null,
				utilShu: 0,
				movieBiaoshi: null,
				dianzan: true,
				xihuan: true
			}
		},
		onLoad(option) {
			// 上个页面传递来的参数
			// console.log(option.id);
			let movieId = option.id
			this.$H.post('/movieInfor/selectByMovieId?movieId=' + movieId).then(res => {
				// console.log(res.data)
				this.movieInfor = res.data
				this.movieBiaoshi = this.movieInfor.movieBiaoshi
				this.utilShu = 8
				this.fenye()
			});
			this.$H.post('/movieAddress/selectByMovieId?movieId=' + movieId).then(res => {
				// console.log(res.data)
				this.series_details = res.data
				if ( res.data.length > 0 ) {
					this.videoSrc = res.data[0].address
					this.videoSign = res.data[0].addressSign
				}
			});
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
		comments: {
			"series-details": seriesDetails,
			"series-blues": seriesBlues,
			"movie-blues": movieBlues
		},
		methods: {
			jump() {
				uni.navigateBack({
				    delta: 1
				});
			},
			huanVideoSrc(item) {
				this.videoSrc = item.address
				this.videoSign = item.addressSign
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
			},
			addXihuan(movieInfor) {
				if (this.$store.state.user == null) {
					uni.navigateTo({
						url: '../../pages/login/login'
					});
				} else {
					this.xihuan = !this.xihuan
					this.$store.state.xiHuanList.push(movieInfor)
					let fenYeDao = {
						'userId': this.$store.state.user.userId,
						'movieId': movieInfor.movieId
					}
				}
				
			},
			deleteXihuan(movieInfor) {
				if (this.$store.state.user == null) {
					uni.navigateTo({
						url: '../../pages/login/login'
					});
				} else {
					this.xihuan = !this.xihuan
					for (let i = 0; i < this.$store.state.xiHuanList.length; i++) {
						if (movieInfor == this.$store.state.xiHuanList[i]) {
							this.$store.state.xiHuanList.splice(i,1)
						}
					}
				}
			},
			xiaZai() {
				if (this.$store.state.user == null) {
					uni.navigateTo({
						url: '../../pages/login/login'
					});
				} else {
					let bol = true
					let arr = this.$store.state.xiaZaiList
					if ( arr.length != 0 ) {
						for (let i = 0; i < arr.length; i++) {
							if ( arr[i].movieInfor.movieId == this.movieInfor.movieId ) {
								bol = false
								break;
							}
						}
					}
					if (bol) {
						let movieXz = {
							"videoSrc": this.videoSrc,
							"videoSign": this.videoSign,
							"movieInfor": this.movieInfor,
							"xZprogress": 0,
							"deletexZ": true
						}
						this.$store.state.xiaZaiList.push(movieXz)
						uni.navigateTo({
						    url: '../geren-download/geren-download'
						});
					} else {
						uni.showModal({
						    title: '提示',
						    content: '该资源已在下载列表中，是否进入查看',
						    success: function (res) {
						        if (res.confirm) {
									uni.navigateTo({
									    url: '../geren-download/geren-download'
									});
						        }
						    }
						});
					}
				}
			},
			fenXiang() {
				if (this.$store.state.user == null) {
					uni.navigateTo({
						url: '../../pages/login/login'
					});
				} else {
					uni.share({
					    provider: "weixin",
					    scene: "WXSceneSession",
					    type: 0,
					    href: this.$store.state.userHref,
					    title: "紫影分享",
					    summary: "我正在使用紫影免费观看影视，赶紧跟我一起来体验！",
					    imageUrl: "https://tunlmusic.oss-cn-shenzhen.aliyuncs.com/77c3c25b-12c3-44b0-85cf-bbf8a64d82e7.png",
					    success: function (res) {
					        uni.showToast({
					        	title: '分享成功',
					        	icon: 'none'
					        });
					    },
					    fail: function (err) {
					       uni.showToast({
					       	title: '分享失败',
					       	icon: 'none'
					       });
					    }
					});
				}
			}
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
</style>
