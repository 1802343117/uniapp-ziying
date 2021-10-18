<template>
	<view class="content" style="width: 100%;height: 100vh;background-color: #F4F4FC;">
		<view style="width: 100%;height: 30rpx;background-color: #F4F4FC;"></view>

		<login-zy></login-zy>

		<watch-list v-if="this.$store.state.userWatch.length != 0" :watch_list="this.$store.state.userWatch"></watch-list>

		<common-gn :common_use="common_use"></common-gn>
		
		<diy-tabBar :text="'我的'"></diy-tabBar>
	</view>
</template>

<script>
	import loginZy from '../../components/login_zy/login_zy.vue'
	import watchList from '../../components/watch-list/watch-list.vue'
	import commonGn from '../../components/common-gn/common-gn.vue'
	import diyTabBar from '../../components/diy-tabBar/diy-tabBar.vue'
	export default {
		data() {
			return {
				login_show: true,
				common_use: [{
						cover: "../../static/icon/xiazai_1.png",
						address: "../geren-download/geren-download",
						name: "我的下载"
					},
					{
						cover: "../../static/icon/guanzhu_1.png",
						address: "../geren-collection/geren-collection",
						name: "我的收藏"
					},
					{
						cover: "../../static/icon/shezhi_1.png",
						address: "../setting/setting",
						name: "设置"
					}
				],
				
			}
		},
		components: {
			"login-zy": loginZy,
			"watch-list": watchList,
			"common-gn": commonGn,
			"diy-tabBar": diyTabBar
		},
		methods: {
			login() {
				this.login_show = !this.login_show
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		/*以侧轴居中对齐*/
	}

	.font_bt {
		font-size: 16px;
		font-weight: 600;
		color: #2A2896;
	}
	
</style>
