<template>
	<view class="content" style="width: 100%;background-color: #F4F4FC;" :style="{ height: height }">
		<view style="width: 100%;background-color: #F4F4FC;height: 120rpx;"></view>
		
		<view class="shoshuo-con" style="width: 100%;height: 100rpx;background-color: #F4F4FC;border-bottom: 1px solid #2A2896;">
			<image src="../../static/icon/fanhui1_1.png" style="width: 50rpx;height: 50rpx;margin-left: 30rpx;"
				@click="jumps()"></image>
			<view style="width: 70%;height: 54rpx; border: 1px solid #2A2896;border-radius: 10px;margin-left: 20rpx;">
				<input type="text" :placeholder="placeholder" v-model="sosou_value" style="width: 95%;height: 54rpx; margin-left: 15rpx;"/>
			</view>
			<view class="shoshuo-con" style="border: 1px solid #2A2896;border-radius: 10px;margin-left: 20rpx;" @click="sosuo()">
				<image src="../../static/icon/sousuo_1.png" style="width: 50rpx;height: 50rpx;margin: 5rpx 10rpx 5rpx 10rpx;"></image>
			</view>
		</view>
		
		<view v-if="movieInforList.length == 0" class="content" style="width: 100%;height: auto;">
			<view v-if="this.$store.state.sosuoArr.length != 0" style="display: flex;width: 90%;height: auto;margin-top: 20rpx;">
				<view style="display: flex;flex-direction: row; width: 50%;color: #B2B1EA;">历史搜索</view>
				<view style="display: flex;flex-direction: row-reverse; width: 50%;">
					<image src="../../static/icon/shanchu.png" style="width: 20px;height: 20px;" @click="empty_sosuo()"></image>
				</view>
			</view>
			<view v-if="this.$store.state.sosuoArr.length != 0" style="display: flex;flex-wrap: wrap; width: 90%;height: auto;">
				<view v-for="(item, index) in this.$store.state.sosuoArr" :key="index" @click="lishi_sosuo(item)"
				style="border: 1px solid #2A2896;border-radius: 10px;
				margin-top: 20rpx;margin-right: 20rpx; padding: 5rpx 10rpx 5rpx 10rpx;">{{item}}</view>
			</view>
			
			<view style="display: flex;width: 90%;height: auto;margin-top: 20rpx;">
				<view style="display: flex;flex-direction: row; width: 50%;color: #B2B1EA;">热门推荐</view>
			</view>
			<view style="display: flex;flex-wrap: wrap; width: 90%;height: auto;">
				<view v-for="(item, index) in arr" :key="index" @click="lishi_sosuo(item)"
				style="border: 1px solid #2A2896;border-radius: 10px;
				margin-top: 20rpx;margin-right: 20rpx; padding: 5rpx 10rpx 5rpx 10rpx;">{{item}}</view>
			</view>
		</view>
		
		<view v-else class="content" style="width: 100%;height: auto;">
			<view v-for="(item, index) in movieInforList" :key="index" class="shoshuo-con" 
			style="display: flex;width: 100%;height: auto;border-bottom: 1px solid #2A2896;">
				<image :src="item.movieCover" @click="jump(item)" style="width: 300rpx;height: 400rpx;margin-top: 10rpx;margin-bottom: 10px;"></image>
				<view v-show="movieIntro_show" class="content" 
				style="justify-content: space-around;width: 430rpx;height: 400rpx;margin-left: 20rpx;margin-top: 10rpx;margin-bottom: 10rpx;">
					<view class="shoshuo-con" style="width: 100%;height: auto;">
						<p style="font-size: 38rpx;color: #2A2896;">{{item.movieName}}</p>
					</view>
					<view class="shoshuo-con" style="width: 100%;height: auto;">
						<p style="font-size: 26rpx;color: #2A2896;">类型：{{item.movieCategory}}</p>
					</view>
					<view style="display: flex;width: 100%;height: auto;">
						<p style="font-size: 26rpx;color: #2A2896;">地区：{{item.moviePlace}}</p>
						<p style="font-size: 26rpx;color: #2A2896;">年份：{{item.movieRelease}}</p>
						<p style="font-size: 26rpx;color: #2A2896;">评分：{{item.movieScore}}</p>
					</view>
					<view style="display: flex;flex-wrap: wrap;width: auto;height: auto;">
						<p style="font-size: 26rpx;color: #2A2896;">主演：{{item.movieLeading}}</p>
					</view>
					<view style="display: flex;flex-wrap: wrap;width: 100%;height: auto;">
						<p style="font-size: 26rpx;color: #2A2896;">导演：{{item.movieDirector}}</p>
					</view>
					<view style="display: flex;flex-wrap: wrap;width: auto;height: auto;" @click="qiehuan()">
						<p style="font-size: 26rpx;color: #2A2896;">简介：{{item.movieIntro.substr(0,29)}}</p>
					</view>
				</view>
				<view v-show="!movieIntro_show" class="content" 
				style="justify-content: space-around;width: 430rpx;height: 400rpx;margin-left: 20rpx;margin-top: 10rpx;margin-bottom: 10rpx;">
					<view style="display: flex;flex-wrap: wrap;width: auto;height: auto;" @click="qiehuan()">
						<p style="font-size: 26rpx;color: #2A2896;">简介：{{item.movieIntro}}</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sosou_value: '',
				arr: ['庆余年','一人之下','斗罗大陆','小舍得','哪吒','悬崖之上'],
				movieInforList: [],
				movieIntro_show: true,
				placeholder: '一人之下',
				height: '100vh'
			}
		},
		onLoad() {
		},
		methods: {
			jumps() {
				uni.navigateBack({
				    delta: 1
				});
			},
			sosuo() {
				if (this.sosou_value != '') {
					this.movieIntro_show = true
					let arr = this.$store.state.sosuoArr
					let bol = true
					for(let i = 0; i < arr.length; i++) {
						if (arr[i] == this.sosou_value) {
							bol = false
							break;
						}
					}
					console.log(bol)
					if (bol) {
						this.$store.state.sosuoArr.push(this.sosou_value)
					}
					let movieName = this.sosou_value
					this.$H.post('/movieInfor/selectByMovieName?movieName=' + movieName).then(res => {
						if (res.data.length == 0) {
							uni.showToast({
								title: '未找到您要找的资源',
								icon: 'none'
							});
						}
						this.movieInforList = res.data
						if ( this.movieInforList.length > 2 ) {
							this.height = 'auto'
						}
					});
					this.placeholder = this.sosou_value
					this.sosou_value = ''
				}
			},
			lishi_sosuo(item) {
				let movieName = item
				this.placeholder = movieName
				this.$H.post('/movieInfor/selectByMovieName?movieName=' + movieName).then(res => {
					console.log(res.data)
					this.movieInforList = res.data
					let arr = this.$store.state.sosuoArr
					let bol = true
					for(let i = 0; i < arr.length; i++) {
						if (arr[i] == movieName) {
							bol = false
							console.log(bol)
							break;
						}
					}
					console.log(bol)
					if (bol) {
						this.$store.state.sosuoArr.push(movieName)
					}
				});
			},
			empty_sosuo() {
				uni.showModal({
				    title: '提示',
				    content: '是否删除历史搜索记录',
				    success: res => {
				        if (res.confirm) {
							this.$store.state.sosuoArr.splice(0, this.$store.state.sosuoArr.length)
				        }
				    }
				});
			},
			qiehuan() {
				this.movieIntro_show = !this.movieIntro_show
			},
			jump(item) {
				if ( this.$store.state.user != null ) {
					let bool = true
					for (let i = 0; i < this.$store.state.userWatch.length; i++) {
						if (this.$store.state.userWatch[i].movieId == item.movieId) {
							bool = false
							break
						}
					}
					if (bool) {
						let userWatch = {
							"userId": this.$store.state.user.userId,
							"movieId": item.movieId
						}
						this.$H.post('/userWatch/addUserWatch', userWatch).then(res => {
							this.$store.state.userWatch.push(item)
						});
					}
				}
				uni.redirectTo({
				    url: "../../pages/series-play/series-play?id=" + item.movieId
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;/*以侧轴居中对齐*/
	}
	
	.shoshuo-con {
		display: flex;
		align-items: center;
	}

</style>
