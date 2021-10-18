<template>
	<view class="content" style="width: 100%;height: 100vh;background-color: #F4F4FC;">
		<view style="width: 100%;height: 50rpx;background-color: #F4F4FC;"></view>
		
		<view
			style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 80rpx;
			background-color: #F4F4FC;border-bottom: 1px solid #2A2896;">
			<image src="../../static/icon/fanhui1_1.png" style="width: 40rpx;height: 40rpx;margin-left: 30rpx;"
				@click="jump()"></image>
		</view>
		<image src="../../static/img/ZYlogo1.png" style="width: 240rpx;height: 240rpx;margin-top: 200rpx;border-radius: 10rpx;"></image>
		<view v-show="this.shows" style="margin-top: 50rpx;">
			<view style="display: flex;">
				<view style="">账号：</view>
				<input style="width: 300rpx;height: 50rpx;border: 1px solid #2A2896;border-radius: 10rpx;"
					v-model="form.account"></input>
			</view>
			<view style="display: flex;margin-top: 20rpx;">
				<view style="">密码：</view>
				<input password="true" style="width: 300rpx;height: 50rpx;border: 1px solid #2A2896;border-radius: 10rpx;"
					v-model="form.password"></input>
			</view>
		</view>
		<view v-show="!this.shows" style="margin-top: 50rpx;">
			<view style="display: flex;margin-top: 20rpx;">
				<view style="letter-spacing: 8rpx;">手机号：</view>
				<input style="width: 300rpx;height: 50rpx;border: 1px solid #2A2896;border-radius: 10rpx;"
					v-model="forms.phoneNumber"></input>
			</view>
			<view style="display: flex;margin-top: 20rpx;">
				<view style="letter-spacing: 22rpx;">密码：</view>
				<input style="width: 300rpx;height: 50rpx;border: 1px solid #2A2896;border-radius: 10rpx;"
					v-model="forms.password"></input>
			</view>
			<view style="display: flex;margin-top: 20rpx;">
				<view style="">确认密码：</view>
				<input style="width: 300rpx;height: 50rpx;border: 1px solid #2A2896;border-radius: 10rpx;"
					v-model="forms.qrPassword"></input>
			</view>
			<view style="display: flex;margin-top: 20rpx;">
				<view style="letter-spacing: 8rpx;">验证码：</view>
				<input style="width: 300rpx;height: 50rpx;border: 1px solid #2A2896;border-radius: 10rpx;"
					v-model="forms.verifyCode"></input>
			</view>
			<view style="display: flex;margin-top: 20rpx;">
				<view style="letter-spacing: 22rpx;">邮箱：</view>
				<input style="width: 300rpx;height: 50rpx;border: 1px solid #2A2896;border-radius: 10rpx;"
					v-model="forms.email"></input>
			</view>
		</view>
		<view v-show="this.shows" style="display: flex;flex-direction: row;justify-content:space-between;margin-top: 20rpx;width: 50%;">
			<button type="" @click="login()">登入</button>
			<button type="" @click="toggleSwitch()">去注册</button>
		</view>
		<view v-show="!this.shows" style="display: flex;flex-direction: row;justify-content:space-between;margin-top: 20rpx;width: 50%;">
			<button type="" @click="toggleSwitch()">去登入</button>
			<button type="" @click="addUser()">注册</button>
		</view>
		
		<view style="display: flex;align-items: center;justify-content: space-between; 
			width: 100%;height: 40rpx;margin-top: 50rpx;">
			<view style="width: 280rpx;height: 1rpx;background-color: #2A2896;"></view>
			<view style="font-size: 12px;color: #2A2896;margin-left: 18rpx;margin-right: 18rpx;">第三方登录</view>
			<view style="width: 280rpx;height: 1rpx;background-color: #2A2896;"></view>
		</view>
		
		<view style="display: flex;align-items: center;justify-content: center;width: 100%;height: auto;margin-top: 20rpx;">
			<image src="../../static/QQ.png" @click="partyLogin(party='qq')" style="width: 80rpx;height: 80rpx;border-radius: 50px;"/>
			<image src="../../static/weixin.png" @click="partyLogin(party='weixin')" style="width: 80rpx;height: 80rpx;border-radius: 50px;margin-left: 50rpx;margin-right: 50rpx;"/>
			<image src="../../static/xinlang.png" @click="partyLogin(party='sinaweibo')" style="width: 80rpx;height: 80rpx;border-radius: 50px;"/>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'login',
				form: {
					account: '',
					password: '',
					verifyCode: 'avc'
				},
				forms: {
					password: '',
					qrPassword: '',
					verifyCode: '',
					phoneNumber: '',
					email: ''
				},
				shows: true,
				party: ''
			}
		},
		methods: {
			jump() {
				uni.navigateBack({
				    delta: 1
				});
			},
			login() {
				console.log("登入")
				this.$H.post('/userInfor/login', this.form).then(res => {
					
					if ( res.code == 200 ) {
						
						// console.log(res.data)
							
						// console.log("当前用户信息：" + this.$store.state.user);
						
						this.form.account = ''
						this.form.password = ''
						
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						});
						this.$store.dispatch('login', res.data);
						this.$store.state.userHref = res.data.href
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
					
				});
			},
			addUser() {
				if( this.forms.password == this.forms.qrPassword ) {
					if ( this.forms.password != '' ) {
						if ( this.forms.verifyCode != '' ) {
							if ( this.forms.phoneNumber != '' ) {
								if ( this.forms.email != '' ) {
									this.$H.post('/userInfor/addUser', this.forms).then(res => {
										uni.showToast({
											title: '注册成功',
											icon: 'none'
										});
									});
								} else {
									uni.showToast({
										title: '邮箱不能为空',
										icon: 'none'
									});
								}
							} else {
								uni.showToast({
									title: '电话号码不能为空',
									icon: 'none'
								});
							}
						} else {
							uni.showToast({
								title: '验证码不能为空',
								icon: 'none'
							});
						}
					} else {
						uni.showToast({
							title: '密码不能为空',
							icon: 'none'
						});
					}
				} else {
					uni.showToast({
						title: '密码不一致',
						icon: 'none'
					});
				}
			},
			toggleSwitch() {
				this.shows = !this.shows
			},
			partyLogin(party) {
				console.log(party)
				uni.getProvider({
				    service: 'oauth',
				    success: res => {
				        if (~res.provider.indexOf(party)) {
				            uni.login({
				                provider: party,
				                success: loginRes => {
									// 获取用户信息
									uni.getUserInfo({
										provider: party,
										success: infoRes => {
											let user = {
												"account": infoRes.userInfo.openId,
												"nickname": infoRes.userInfo.nickName,
												"avatar": infoRes.userInfo.avatarUrl
											}
											this.$H.post('/userInfor/partyLogin', user).then(turn => {
												if ( turn.code == 200 ) {
													uni.showToast({
														title: '登录成功',
														icon: 'none'
													});
													this.$store.dispatch('login', turn.data);
													console.log("当前用户信息：");
													console.log(this.$store.state.userWatch);
													uni.navigateBack({
														delta: 1
													});
												} else {
													uni.showToast({
														title: turn.msg,
														icon: 'none'
													});
												}
											});
										},
									});
				                }
				            });
				        }
				    }
				});
			}
		},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		/*以侧轴居中对齐*/
	}
</style>
