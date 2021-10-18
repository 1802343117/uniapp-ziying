<template>
	<view style="display: flex;flex-direction: column;background-color: #F4F4FC;">
		<view style="width: 100%;height: auto;margin-top: 20rpx;">
			<p style="font-size: 16px;color: #2A2896;margin-left: 20rpx;">{{movieInfor.movieName}}</p>
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
				<!-- <image v-if="xihuan" src="../../static/icon/xihuan.png" style="width: 56rpx;height: 56rpx;margin-right: 30rpx;" 
					@click="addXihuan(movieInfor)">
				</image>
				<image v-else="xihuan" src="../../static/icon/xihuan_1.png" style="width: 56rpx;height: 56rpx;margin-right: 30rpx;"
					@click="deleteXihuan(movieInfor)">
				</image> -->
				<image src="../../static/icon/xiazai.png" style="width: 56rpx;height: 56rpx;margin-right: 30rpx;"
					@click="xiaZai()">
				</image>
				<!-- <image src="../../static/icon/fenxiang.png" style="width: 56rpx;height: 56rpx;margin-right: 30rpx;"
					@click="fenXiang()">
				</image> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			movieInfor: Object
		},
		data() {
			return {
				dianzan: true,
				xihuan: true
			}
		},
		methods: {
			addXihuan(movieInfor) {
				if (this.$store.state.user == null) {
					uni.navigateTo({
						url: '../../pages/login/login'
					});
				} else {
					this.xihuan = !this.xihuan
					this.$store.state.xiHuanList.push(movieInfor)
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
			xiaZai(url) {
				uni.navigateTo({
				    url: '../../pages/geren-download/geren-download?url=' + url
				});
			},
			fenXiang() {
				if (this.$store.state.user == null) {
					uni.navigateTo({
						url: '../../pages/login/login'
					});
				} else {
					uni.showToast({
						title: '暂时无法分享',
						icon: 'none'
					});
				}
			}
		}
	}
</script>

<style>
</style>
