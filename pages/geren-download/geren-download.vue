<template>
	<view class="content">
		<view style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 120rpx;background-color: #F4F4FC;border-bottom: 2px solid #2A2896;">
			<image src="../../static/icon/fanhui1_1.png" style="width: 40rpx;height: 40rpx;margin-top: 50rpx;margin-left: 30rpx;" 
				@click="jumps()">
			</image>
		</view>
		<view v-if="this.$store.state.xiaZaiList.length == 0" class="content" style="width: 100%;height: 700rpx;background-color: #F4F4FC;">
			<image src="../../static/icon/xiazai.png" style="width: 240rpx;height: 240rpx;"></image>
			<view style="font-size: 16px;color: #B2B1EA;font-weight: 600;margin-top: 40rpx;">暂无缓存视频</view>
		</view>
		
		<view v-else class="content" style="width: 100%;height: auto;background-color: #F4F4FC;">
			<view v-for="(item, index) in this.$store.state.xiaZaiList" :key="index" style="display: flex;align-items: center;justify-content: center;width: 100%;height: auto;padding: 10rpx;border-bottom: 1px solid #2A2896;">
				<image :src="item.movieInfor.movieCover" style="width: 240rpx;height: 320rpx;"></image>
				<view class="content" style="width: 55%;height: 320rpx;margin-left: 20rpx;">
					<view style="display: flex;width: 80%;font-size: 40rpx;color: #2A2896;">{{item.movieInfor.movieName}}</view>
					<view style="display: flex;width: 80%;font-size: 30rpx;color: #2A2896;">{{item.videoSign}}</view>
					<view style="width: 80%;height: 20rpx;background-color: #B2B1EA;border-radius: 50rpx;margin-top: 20rpx;">
						<view :style="{width: item.xZprogress+'%'}" style="height: 20rpx;background-color: #aa00ff;border-radius: 50rpx;"></view>
					</view>
					<view style="width: 80%;display: flex;justify-content: space-between;margin-top: 20rpx;">
						<view>{{item.xZprogress+'%'}}</view>
						<view v-if="item.deletexZ" @click="videoXz(item, index)" style="display: flex;flex-direction: column;align-items: center;width: 140rpx;height: 40rpx;background-color: #DAD9F5;border-radius: 10rpx;font-size: 13px;margin-top: 5rpx;color: #2A2896;">下载</view>
						<view v-else @click="deleteXiaZai(item, index)" style="display: flex;flex-direction: column;align-items: center;width: 140rpx;height: 40rpx;background-color: #DAD9F5;border-radius: 10rpx;font-size: 13px;margin-top: 5rpx;color: #2A2896;">删除下载</view>
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
				movieBiaoshi: null,
				progress: 0,
				xz_btn: true
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
			videoXz(item, index) {
				if ( item.xZprogress == 0 ) {
					this.xz_btn = !this.xz_btn
					var downloadTask = uni.downloadFile({
					    url: item.videoSrc, //仅为示例，并非真实的资源
					    success: res => {
					        if (res.statusCode === 200) {
					            console.log('下载成功');
					        }
					    }
					});
					downloadTask.onProgressUpdate( res => {
						this.$store.state.xiaZaiList[index].xZprogress = res.progress
						if (res.progress == 100) {
							this.$store.state.xiaZaiList[index].deletexZ = false
							downloadTask.abort()
						}
					});
				} else {
					uni.showToast({
						title: '资源正在下载，请稍后....',
						icon: 'none'
					});
				}
			},
			deleteXiaZai(index) {
				this.$store.state.xiaZaiList.splice(index,1)
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
		align-items: center;			/*以侧轴居中对齐*/
		justify-content: center;		/*以中轴居中对齐*/
	}
	
</style>
