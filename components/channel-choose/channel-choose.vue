<template>
	<view class="content_watch">
		<view class="watch_card">
			<view class="font_bt">已选频道</view>
			<!-- <image src="../../static/icon/shezhi.png" style="width: 46rpx;height: 46rpx;"></image> -->
			<switch style="transform: scale(0.8,0.8)" type="switch" color="#2A2896" :disabled="disabled_bool" @change="qiehuan()"/>
		</view>
		<view class="channel">
			<view class="channel_content">
				<block v-for="(item, index) in channel_list" :key="index">
					<view v-if="traverse(item.title)" class="channel_list_sheng" @click="deleteArr(item.title)">
						<image :src="item.cover_1" style="width: 60rpx;height: 60rpx;"></image>
						<view class="channel_title_sheng">{{item.title}}</view>
					</view>
					<view v-show="box_show" v-else class="channel_list" @click="addArr(item.title)">
						<image :src="item.cover" style="width: 60rpx;height: 60rpx;"></image>
						<view class="channel_title">{{item.title}}</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			channel_list: Array
		},
		data() {
			return {
				disabled_bool: false,
				box_show: false
			}
		},
		methods: {
			traverse(title) {
				let length = this.$store.state.titles.length
				let returns = false
				for (let i = 0; i < length; i++) {
					if (this.$store.state.titles[i] == title) {
						i = length
						returns = true
					}
				}
				// console.log(returns)
				return returns
			},
			qiehuan() {
				this.box_show = !this.box_show
				let length = this.$store.state.titles.length
				console.log(length)
			},
			addArr(title) {
				this.$store.state.titles.push(title)
				let length = this.$store.state.titles.length
				console.log(length)
				if ( length == 5 ) {
					this.disabled_bool = !this.disabled_bool
				}
			},
			deleteArr(title) {
				for (let i = 0; i < this.$store.state.titles.length; i++) {
					// console.log(i)
					if (this.$store.state.titles[i] == title) {
						this.$store.state.titles.splice(i, 1)
						let length = this.$store.state.titles.length
						console.log(length)
						if ( length == 4 ) {
							this.disabled_bool = !this.disabled_bool
						}
						break;
					}
				}
				
			}
		}
	}
</script>

<style>
	.watch_card {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100rpx;
	}

	.content_watch {
		display: flex;
		flex-direction: column;
		align-items: center;
		/*以侧轴居中对齐*/
		width: 100%;
		height: auto;
		background-color: #F4F4FC;
		border-bottom: 2px solid #A4A3E5;
	}

	.font_bt {
		font-size: 18px;
		font-weight: 600;
		color: #2A2896;
		margin-left: 36rpx;
		width: 580rpx;
	}

	.channel_content {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		width: 600rpx;
		height: 100%;
	}

	.channel_list {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 20rpx;
		margin-left: 24rpx;
		border: 1px solid #A4A3E5;
	}

	.channel_list_sheng {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 20rpx;
		margin-left: 24rpx;
		border: 1px solid #2A2896;
	}

	.channel_title {
		font-size: 12px;
		color: #A4A3E5;
		margin-top: 10rpx;
	}

	.channel_title_sheng {
		font-size: 12px;
		color: #2A2896;
		margin-top: 10rpx;
	}

	.channel {
		display: flex;
		justify-content: center;
		width: 100%;
		height: auto;
		margin-bottom: 40rpx;
	}
</style>
