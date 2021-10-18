<template>
	<view class="content" style="position: relative;background-color: #F4F4FC;" :style="{height: height}">
		<view style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 120rpx;background-color: #F4F4FC;border-bottom: 2px solid #2A2896;">
			<image src="../../static/icon/fanhui1_1.png" style="width: 40rpx;height: 40rpx;margin-top: 50rpx;margin-left: 30rpx;" 
				@click="jumps()">
			</image>
		</view>
		<view class="img_skewing" style="width: auto;height: 120rpx;">
			<image :src="this.$store.state.user.avatar" style="width: 120rpx;height: 120rpx;background-color: #55ffff;border-radius: 10px;"></image>
			<view style="display: flex;flex-direction: column;justify-content: center;width: auto;margin-left: 20rpx;">
				<p style="font-size: 30rpx;color: #F4F4FC;">{{this.$store.state.user.nickname}}</p>
				<!-- <p style="font-size: 24rpx;margin-top: 10rpx;color: #F4F4FC;">{{this.$store.state.user.email}}</p> -->
			</view>
		</view>
		
		<image src="../../static/img/3.jpg" style="align-items: center;width: 100%;height: 400rpx;"></image>
		
		<remen-card v-show="huan" :remen_list="this.$store.state.remen_list" style="padding-bottom: 120rpx;"></remen-card>
		
		<view v-show="!huan" class="content" style="width: 100%;height: auto;">
			<input v-model="input_valur" placeholder=" 标题" style="width: 80%;height: 50rpx;border: 2px solid #2A2896;border-radius: 10rpx;margin-top: 20rpx;" />
			<textarea v-model="textarea_valur" auto-height placeholder=" 内容" style="width: 80%;border: 2px solid #2A2896;border-radius: 10rpx;margin-top: 20rpx;" />
			<view style="display: flex;flex-wrap: wrap; width: 80%;height: auto;margin-top: 20rpx;border: 2px solid #2A2896;border-radius: 10rpx;">
				<image @click="chooseImg()" src="../../static/icon/jia_1.png" style="width: 160rpx;height: 160rpx;border: 2px dashed #2A2896;border-radius: 10rpx;margin: 15rpx;"></image>
				<image v-for="(item, index) in imgarr" :key="index" :src="item" style="width: 160rpx;height: 160rpx;border: 2px dashed #2A2896;border-radius: 10rpx;margin: 15rpx;"></image>
			</view>
			<view style="display: flex;flex-direction: row-reverse;width: 80%;height: auto;margin-top: 20rpx;">
				
				<view @click="faSho()" class="content" style="width: 120rpx;height: 40rpx;border: 2px solid #2A2896;border-radius: 10rpx;margin: 10rpx;">发送</view>
			</view>
		</view>
		
		<view v-show="this.gongneng_show" style="width: 20rpx;height: 100rpx;position: fixed;bottom: 200rpx;right: 0;background-color: #2A2896;border-radius: 50rpx;" @click="qiehuan()"></view>
		<view v-show="!this.gongneng_show" style="width: 18%;height: 100%;position: fixed;top: 0;right: 0;background-color: rgba(38, 43, 54, 0.8);;margin: 130rpx 0 100rpx 0;">
			<view style="display: flex;flex-direction: column;align-items: center;">
				<image src="../../static/icon/geren.png" style="width: 80rpx;height: 80rpx;margin-top: 80rpx;" @click="geren()"></image>
				<image src="../../static/icon/bianji.png" style="width: 80rpx;height: 80rpx;margin-top: 80rpx;" @click="bianji()"></image>
				<image src="../../static/icon/fanhui.png" style="width: 80rpx;height: 80rpx;margin-top: 80rpx;" @click="qiehuan()"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gongneng_show: true,
				input_valur: '',
				textarea_valur: '',
				imgarr: [],
				huan: null,
				height: null
			}
		},
		onLoad(option) {
			if (option.item == '1') {
				this.huan = true
				this.height = 'auto'
			} else {
				this.huan = false
				this.height = '100vh'
			}
			this.$H.get('/article/selectByUserId?userId=' + this.$store.state.user.userId).then(res => {
				this.$store.state.remen_list = res.data.remen_list
			})
		},
		methods: {
			jumps() {
				uni.navigateTo({
				    url: '../../pages/remen/remen',
				});
			},
			qiehuan() {
				this.gongneng_show = !this.gongneng_show
			},
			top() { //回到顶部
				uni.pageScrollTo({
					scrollTop: 0, duration: 300
				});
			},
			faSho() {
				let articleId = Math.round(Math.random()*1000);
				for (let i = 0; i < this.imgarr.length; i++) {
					console.log(i)
					uni.uploadFile({
						url: 'http://ziying.cn.utools.club/api/uploadFile',
						filePath: this.imgarr[i],
						name: 'file',
						success:res => {
							// console.log(JSON.parse(res.data).data)
							let font = {
								"articleId": articleId,
								"attachedImg": JSON.parse(res.data).data
							}
							this.$H.post('/attachedFiles/addAttached', font);
						}
					});
				}
				let font = {
					"articleId": articleId,
					"userId": this.$store.state.user.userId,
					"articleTitle": this.input_valur,
					"articleContent": this.textarea_valur,
					"attachedFiles": [],
					"creationTime": null,
					"nickname": this.$store.state.user.nickname,
					"avatar": this.$store.state.user.avatar,
					"sign": "WZ"
				}
				this.$H.post('/article/addRarticle', font).then( res => {
					console.log(res.data.remen_list[0])
					let json = JSON.stringify(res.data.remen_list[0]);
					uni.sendSocketMessage({
						data: json,
					});
				})
				this.input_valur = ''
				this.textarea_valur = ''
				this.imgarr = []
			},
			bianji() {
				this.huan = false
				this.height = '100vh'
			},
			geren() {
				this.huan = true
				this.height = 'auto'
			},
			chooseImg() {
				uni.chooseImage({
					count: 5,
					success:res => {
						this.imgarr = res.tempFilePaths
					}
				})
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;			/*以侧轴居中对齐*/
	}
	.img_skewing {
		display: flex;
		position: absolute;
		top: 400rpx;
		left: 60rpx;
		z-index: 999;
	}
</style>
