<template>
	<view class="content_login" style="">
		<view v-if="this.$store.state.user === null"  class="content_login_module">
			<image src="../../static/icon/geren1.png" class="user_portrait" style="margin-top: 20rpx;"></image>
			<button type="default" hover-class="btn_login_press" class="btn_login" @click="login()">点击登入</button>
		</view>
		<view v-else="this.$store.state.user !== null" class="content_login_module" style="position: relative;">
			<view v-if="!bianji" style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;height: 100%;">
				<image :src="this.$store.state.user.avatar" class="user_portrait" @click="chooseImg()"></image>
				<view class="login_after_user_name" @click="qhshow()">{{ this.$store.state.user.nickname.substr(0,6) }}</view>
				<image src="../../static/icon/tuichu_1.png" class="btn_esc_login" @click="tuichu"></image>
			</view>
			
			<view v-else="bianji" style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;height: 100%;">
				<view style="color: #2A2896;font-weight: 600;">请输入你的新名字：</view>
				<input style="border-bottom: 2px solid #2A2896;color: #2A2896;font-size: 20px;" value="asd" :placeholder="this.$store.state.user.nickname" v-model="nickname" />
				<button type="default" hover-class="btn_login_press" class="btn_login" @click="xgnic()">完 成</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: '',
				bianji: false
			}
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '../../pages/login/login'
				})
			},
			tuichu() {
				this.$store.state.user = null
				this.$store.state.token = null
				this.$store.state.socket = null
				this.$store.state.userWatch = []
			},
			chooseImg() {
				uni.chooseImage({
					count: 1,
					success:res => {
						console.log(res)
						console.log(res.tempFilePaths[0])
						this.$store.state.user.avatar = res.tempFilePaths[0]
						console.log('上传文件')
						uni.uploadFile({
							url: 'http://localhost:8081/api/uploadFile',
							filePath: this.$store.state.user.avatar,
							name: 'file',
							success:res => {
								// console.log(res)
								JSON.parse(res.data)
								console.log(JSON.parse(res.data).data)
								this.$store.state.user.avatar = JSON.parse(res.data).data
								if ( JSON.parse(res.data).code == 200 ) {
									this.$H.post('/userInfor/updateAvatar', this.$store.state.user);
								} else {
									uni.showToast({
										title: '文件上传失败',
										icon: 'none'
									});
								}
							}
						});
					}
				})
			},
			qhshow() {
				this.bianji = !this.bianji;
			},
			xgnic() {
				console.log(this.nickname)
				this.$store.state.user.nickname = this.nickname
				this.$H.post('/userInfor/updateUserInfor', this.$store.state.user);
				this.nickname = ''
				this.qhshow()
			}
		},
		computed: {
		}
	}
</script>

<style>
	.login_after_user_name {
		font-size: 18px;color: #2A2896;font-weight: 600;margin-top: 10rpx;
	}
	.content_login_module {
		display: flex;
		flex-direction: column;
		align-items: center;			/*以侧轴居中对齐*/
		justify-content: center;		/*以中轴居中对齐*/
		width: 100%;height: 280rpx;border-bottom: 1px solid #7D7BDC;
	}
	.user_portrait {
		border-radius: 50px;width: 120rpx;height: 120rpx;
	}
	.btn_esc_login {
		width: 40rpx;height: 40rpx;position: absolute;top: 20rpx;right: 30rpx;
	}
	button::after {
		border: none;
	}
	.btn_login {
		font-size: 18px;
		color: #7D7BDC;
		font-weight: 600;
		background-color: #F4F4FC;
	}
	.btn_login_press {
		font-size: 18px;
		color: #2A2896;
		font-weight: 600;
		background-color: #F4F4FC;
	}
	.content_login {
		display: flex;
		flex-direction: column;
		align-items: center;			/*以侧轴居中对齐*/
		justify-content: center;		/*以中轴居中对齐*/
		width: 100%;height: auto;background-color: #F4F4FC;
	}
</style>
