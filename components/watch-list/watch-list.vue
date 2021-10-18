<template>
	<view class="content_watch" style="border-bottom: 2px solid #2A2896;">
		<view style="display: flex;flex-direction: row;align-items: center;width: 100%;height: 80rpx;">
			<view class="font_bt" style="margin-left: 30rpx;">观看记录</view>
			<image src="" style="width: 48rpx;height: 48rpx;margin-left: 10rpx;"></image>
		</view>
		<swiper cancelable=true display-multiple-items="3" current="0" class="card_content">
			<block v-for="(item, index) in watch_list" :key="index">
				<swiper-item>
					<view class="card_layout" @click="jump(item.movieId)">
						<image :src="item.movieCover" style="width: 100%;height: 100%;"></image>
						<view class="font_theme" style="margin-top: 10rpx;margin-left: 10rpx;">{{item.movieName}}</view>
						<view class="font_theme_nr" style="margin-top: 5rpx;margin-left: 10rpx;">{{item.movieIntro.substr(0,8)}}</view>
					</view>
				</swiper-item>
			</block>
			<swiper-item v-if="watch_list.length == 1">
				<view class="card_layout">
					<image style="width: 100%;height: 100%;"></image>
					<view class="font_theme" style="margin-top: 10rpx;margin-left: 10rpx;"></view>
					<view class="font_theme_nr" style="margin-top: 5rpx;margin-left: 10rpx;"></view>
				</view>
			</swiper-item>
			<swiper-item v-if="watch_list.length == 1 || watch_list.length == 2">
				<view class="card_layout">
					<image style="width: 100%;height: 100%;"></image>
					<view class="font_theme" style="margin-top: 10rpx;margin-left: 10rpx;"></view>
					<view class="font_theme_nr" style="margin-top: 5rpx;margin-left: 10rpx;"></view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			watch_list: Array
		},
		methods: {
			jump(movieId) {
				uni.redirectTo({
				    url: "../../pages/series-play/series-play?id=" + movieId
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

	.content_watch {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: auto;
		border-top: 2px solid #A4A3E5;
		background-color: #F4F4FC;
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
		justify-content: space-around;
		width: 100%;
		height: 400rpx;
		margin-bottom: 20rpx;
	}

	.card_layout {
		display: flex;
		flex-direction: column;
		align-items: baseline;
		width: 100%;
		height: 100%;
		margin-left: 10rpx;
	}
</style>
