<template>
	<view class="content_common">
		<view class="font_bt">常用功能</view>
		<view class="common_card">
			<view v-for="(item, index) in common_use" :key="index" class="content" @click="jump(item.address)">
				<image :src="item.cover" style="width: 120rpx;height: 120rpx;"></image>
				<view class="card_font">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			common_use: Array
		},
		data() {
			return {
				
			}
		},
		methods: {
			jump(e) {
				if (this.$store.state.user == null) {
					uni.navigateTo({
						url: '../../pages/login/login'
					});
				} else {
					uni.navigateTo({
						url: e
					});
				}
			}
		}
	}
</script>

<style>
	.content_common {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: auto;
		background-color: #F4F4FC;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		/*以侧轴居中对齐*/
		justify-content: center;
		/*以中轴居中对齐*/
		width: 200rpx;
		height: 200rpx;
		border: 1px solid #2A2896;
		margin-left: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 10px;
	}

	.font_bt {
		font-size: 16px;
		font-weight: 600;
		color: #2A2896;
		width: 100%;
		padding: 20rpx 0rpx 20rpx 30rpx;
	}

	.common_card {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		width: 90%;
		height: auto;
		margin-left: 30rpx;
		margin-bottom: 20rpx;
	}

	.card_font {
		font-size: 14px;
		color: #2A2896;
		margin-top: 10rpx;
	}
</style>
