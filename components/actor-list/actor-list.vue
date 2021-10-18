<template>
	<swiper display-multiple-items="4" current="0" class="content_swi">

		<block v-for="(item, index) in actor" :key="index">
			<swiper-item>
				<view class="content">
					<image :src="item.portrait" class="content_swi_img"></image>
					<view class="content_swi_text">{{item.name}}</view>
				</view>
			</swiper-item>
		</block>

	</swiper>
</template>

<script>
	export default {
		props: {
			actor: Array
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style>
	.content_swi_text {
		display: flex;
		justify-content: center;
		font-size: 14px;
		margin-top: 20rpx;
	}

	.content_swi_img {
		width: 140rpx;
		height: 140rpx;
		border-radius: 50px;
	}

	.content_swi {
		width: 100%;
		height: 260rpx;
		border-top: 2px solid #A4A3E5;
		background-color: #F4F4FC;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		/*以侧轴居中对齐*/
		justify-content: center;
		/*以中轴居中对齐*/
		width: 150rpx;
		height: 260rpx;
		margin-left: 18rpx;
	}
</style>
