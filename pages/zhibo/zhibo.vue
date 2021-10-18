<template>
	<view class="content" style="width: 100%;height: 100vh;background-color: #55ffff;">
		<view style="display: flex;align-items: center;width: 100%;height: 130rpx;background-color: #F4F4FC;">
			<image src="../../static/icon/fanhui1_1.png" style="width: 50rpx;height: 50rpx;margin-top: 30rpx;margin-left: 30rpx;"
				@click="jump()"></image>
		</view>
		<video id="myVideo" autoplay :controls="true" show-progress="false" play-strategy="3" 
		show-play-btn="false"
			enable-progress-gesture="false"
			:src="item" 
			style="width: 100%;height: 100%;"
			>
		</video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: ''
			}
		},
		onReady: function (res) {
		    // 获取 video 上下文 videoContext 对象
		    this.videoContext = uni.createVideoContext('myVideo');
		    // 进入全屏状态
		    this.videoContext.requestFullScreen(-90);
		},
		onLoad(option) {
			console.log(option.item); //打印出上个页面传递的参数。
			this.item = option.item
		},
		methods: {
		    jump() {
		    	uni.navigateBack({
		    	    delta: 1
		    	});
		    }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;			/*以侧轴居中对齐*/
		justify-content: center;		/*以中轴居中对齐*/
	}
	
	.dinbuguding {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 1000;
	}
</style>
