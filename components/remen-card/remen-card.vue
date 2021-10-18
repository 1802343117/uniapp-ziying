<template>
	<view class="content">
		<view class="content" v-for="(item, index) in this.$store.state.remen_list" :key="index" style="border-top: 2px solid #2A2896;">
			<view class="content_remen_title">
				<image :src="item.avatar" class="portrait"></image>
				<view class="remen_user_name">{{item.nickname}}</view>
				<view class="remen_data">{{item.articleDateSign}}</view>
			</view>
			<view style="display: flex;flex-direction: column;width: 100%;margin-top: 20rpx;">
				<view style="font-size: 24rpx;color: #A4A3E5;margin-left: 34rpx;">{{item.articleTitle}}</view>
				<view style="font-size: 30rpx;margin-left: 34rpx;">{{item.articleContent}}</view>
			</view>
			<view class="remen_content">
				<image v-for="(items, index) in item.attachedFiles" :key="index" :src="items"
					class="remen_content_picure"></image>
			</view>

			<scroll-view v-if="item.movieComments.length != 0" scroll-y="true" class="comment_content">
				<view v-for="(items, index) in item.movieComments" :key="index" style="display: flex;flex-direction: row;">
					<view class="comment_content_user">{{items.userName}}</view>
					<view class="comment_content_user"> :</view>
					<view class="comment_content_user" style="color: #000000;">{{items.commentContent}}</view>
				</view>
			</scroll-view>

			<view class="remen_content_function">
				<image src="../../static/icon/fenxiang.png" class="remen_function_icon_size" @click="fenXiang()"/>
				<image src="../../static/icon/xiaoxi.png" class="remen_function_icon_size" style="margin-right: 46rpx;" @click="qiehuan_show(index)"/>
				<image v-if="item.xihuan" src="../../static/icon/xihuan.png" class="remen_function_icon_size" style="margin-right: 46rpx;" @click="xihuan_show(index)"/>
				<image v-else src="../../static/icon/xihuan_1.png" class="remen_function_icon_size" style="margin-right: 46rpx;" @click="xihuan_show(index)"/>
			</view>
			
			<view v-show="item.xiaoxi" style="display: flex;align-items: center;justify-content: center;margin-bottom: 20rpx;margin-top: 10rpx;">
				<view @click="addComment(item, index)" style="width: 100rpx;height: 50rpx;border: 2px solid #2A2896;border-radius: 50rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
					<p>发送</p>
				</view>
				<input v-model="input_valur" style="width: 600rpx;height: 50rpx;border: 2px solid #2A2896;border-radius: 50rpx;" />
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			remen_list: Array
		},
		data() {
			return {
				input_valur: ''
			}
		},
		methods: {
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
			},
			qiehuan_show(item) {
				if (this.$store.state.user != null) {
					this.$store.state.remen_list[item].xiaoxi = !this.$store.state.remen_list[item].xiaoxi
				} else {
					uni.navigateTo({
						url: '../../pages/login/login',
					})
				}
			},
			xihuan_show(item) {
				this.$store.state.remen_list[item].xihuan = !this.$store.state.remen_list[item].xihuan
			},
			addComment(item, index) {
				if (this.input_valur != '') {
					let font = {
						"articleId": item.articleId,
						"userName": this.$store.state.user.nickname,
						"commentContent": this.input_valur,
						"index": index,
						"sign": "PL"
					}
					let json = JSON.stringify(font)
					uni.sendSocketMessage({
						data: json
					});
					this.$H.post("/movieComment/addComment", json);
					this.input_valur = ''
				} else {
					uni.showToast({
						title: '内容为空',
						icon: 'none'
					});
				}
			}
		}
	}
</script>

<style>
	.remen_function_icon_size {
		width: 40rpx;
		height: 40rpx;
	}

	.remen_content_function {
		display: flex;
		flex-direction: row-reverse;
		width: 90%;
		height: 40rpx;
		margin-bottom: 20rpx;
		margin-top: 10rpx;
	}

	.comment_content_user {
		font-size: 12px;
		color: #B2B1EA;
		margin-left: 10rpx;
	}

	.comment_content {
		display: flex;
		flex-direction: column;
		width: 90%;
		height: 110rpx;
		border-left: 2px solid #A4A3E5;
		margin-top: 20rpx;
	}
	.comment_content_exhibition {
		display: flex;
		flex-direction: column;
		width: 90%;
		height: 350rpx;
		border-left: 2px solid #A4A3E5;
		margin-top: 20rpx;
	}

	.remen_content_picure {
		width: 200rpx;
		height: 200rpx;
		margin: 10rpx;
	}

	.remen_content {
		display: flex;
		flex-wrap: wrap;
		width: 90%;
		height: auto;
		margin-top: 20rpx;
	}

	.remen_data {
		font-size: 30rpx;
	}

	.remen_user_name {
		width: 70%;
		height: 40rpx;
		font-size: 28rpx;
		margin-left: 10rpx;
	}

	.portrait {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50px;
		margin-left: 30rpx;
	}

	.content_remen_title {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: auto;
		margin-top: 20rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		/*以侧轴居中对齐*/
		justify-content: center;
		/*以中轴居中对齐*/
		width: 100%;
		height: auto;
		background-color: #F4F4FC;
	}
</style>
