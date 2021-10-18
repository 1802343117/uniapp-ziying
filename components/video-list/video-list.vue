<template>
	<view style="width: 100%;height: auto;background-color: #F4F4FC;border-top: 2px solid #A4A3E5;">
		<view style="display: flex;flex-direction: row;align-items: center;width: 100%;height: 80rpx;">
			<view class="font_bt" style="margin-left: 30rpx;">影视推荐</view>
		</view>
		<view class="card_content">
			<view v-for="(item, index) in video_list" :key="index" @click="jump(item)"
				style="width: 45%;height: 580rpx;margin-bottom: 20rpx;margin-left: 24rpx;">
				<image :src="item.movieCover" style="width: 100%;height: 500rpx;"></image>
				<view class="font_theme" style="margin-left: 10rpx;">{{item.movieName}}</view>
				<view class="font_theme_nr" style="margin-left: 10rpx;">{{item.movieIntro.substr(0,12)}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			video_list: Array
		},
		data() {
			return {
				
			}
		},
		methods: {
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
				uni.navigateTo({
				    url: "../../pages/series-play/series-play?id=" + item.movieId
				});
			}
		}
	}
</script>

<style>
	.font_bt {
		font-size: 16px;
		font-weight: 600;
		color: #2A2896;
	}

	.font_theme {
		font-size: 14px;
		color: #2A2896;
		font-weight: 500;
	}

	.font_theme_nr {
		font-size: 12px;
		color: #A4A3E5;
	}

	.card_content {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		width: auto;
		height: auto;
	}
</style>
