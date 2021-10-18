<template>
	<view class="content">
		<view style="width: 100%;height: 30rpx;background-color: #F4F4FC;"></view>
		
		<channel-choose :channel_list= "channel_list"></channel-choose>
		
		<television :CCTV ="this.CCTV" :channel_TV= "this.channel_TV" style="padding-bottom: 120rpx;"></television>
		
		<diy-tabBar :text="'分类'"></diy-tabBar>
	</view>
</template>

<script>
	import channelChoose from '../../components/channel-choose/channel-choose.vue'
	import television from '../../components/television/television.vue'
	import diyTabBar from '../../components/diy-tabBar/diy-tabBar.vue'
	export default {
		data() {
			return {
				channel_list: [
					{
						cover: "../../static/fenle_icon/dianshiju.png",
						cover_1: "../../static/fenle_icon_1/dianshiju.png",
						title: "电视剧"
					},
					{
						cover: "../../static/fenle_icon/dianying.png",
						cover_1: "../../static/fenle_icon_1/dianying.png",
						title: "电影"
					},
					{
						cover: "../../static/fenle_icon/doman.png",
						cover_1: "../../static/fenle_icon_1/doman.png",
						title: "动漫"
					},
					{
						cover: "../../static/fenle_icon/gaogenxie.png",
						cover_1: "../../static/fenle_icon_1/gaogenxie.png",
						title: "时尚"
					},
					{
						cover: "../../static/fenle_icon/gupiao.png",
						cover_1: "../../static/fenle_icon_1/gupiao.png",
						title: "股市"
					},
					{
						cover: "../../static/fenle_icon/jiankang.png",
						cover_1: "../../static/fenle_icon_1/jiankang.png",
						title: "健康"
					},
					{
						cover: "../../static/fenle_icon/jiaoyu.png",
						cover_1: "../../static/fenle_icon_1/jiaoyu.png",
						title: "教育"
					},
					{
						cover: "../../static/fenle_icon/jundui.png",
						cover_1: "../../static/fenle_icon_1/jundui.png",
						title: "军事"
					},
					{
						cover: "../../static/fenle_icon/lanqiu.png",
						cover_1: "../../static/fenle_icon_1/lanqiu.png",
						title: "体育"
					},
					{
						cover: "../../static/fenle_icon/lvyou.png",
						cover_1: "../../static/fenle_icon_1/lvyou.png",
						title: "旅游"
					},
					{
						cover: "../../static/fenle_icon/noye.png",
						cover_1: "../../static/fenle_icon_1/noye.png",
						title: "农业"
					},
					{
						cover: "../../static/fenle_icon/shaoer.png",
						cover_1: "../../static/fenle_icon_1/shaoer.png",
						title: "少儿"
					},
					{
						cover: "../../static/fenle_icon/shenghuo-.png",
						cover_1: "../../static/fenle_icon_1/shenghuo-.png",
						title: "生活"
					},
					{
						cover: "../../static/fenle_icon/wudao2.png",
						cover_1: "../../static/fenle_icon_1/wudao2.png",
						title: "舞蹈"
					},
					{
						cover: "../../static/fenle_icon/yinshi.png",
						cover_1: "../../static/fenle_icon_1/yinshi.png",
						title: "美食"
					},
					{
						cover: "../../static/fenle_icon/yishu.png",
						cover_1: "../../static/fenle_icon_1/yishu.png",
						title: "美术"
					},
					{
						cover: "../../static/fenle_icon/youxi.png",
						cover_1: "../../static/fenle_icon_1/youxi.png",
						title: "游戏"
					},
					{
						cover: "../../static/fenle_icon/yule.png",
						cover_1: "../../static/fenle_icon_1/yule.png",
						title: "搞笑"
					},
					{
						cover: "../../static/fenle_icon/zongyi.png",
						cover_1: "../../static/fenle_icon_1/zongyi.png",
						title: "综艺"
					}
				],
				CCTV: [],
				channel_TV: []
			}
		},
		onLoad() {
			if ( this.$store.state.titles == null ) {
				this.$store.state.titles = this.$T.title
			}
			this.$H.get('/api/television').then(res => {
				// console.log(res.data)
				this.CCTV = res.data.cctv
				this.channel_TV = res.data.region
			});
		},
		components: {
			"channel-choose": channelChoose,
			"television": television,
			"diy-tabBar": diyTabBar
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
	.content_watch {
		display: flex;
		flex-direction: column;
		align-items: center;			/*以侧轴居中对齐*/
	}
	.font_bt {
		font-size: 18px;
		font-weight: 600;
		color: #2A2896;
	}
</style>
