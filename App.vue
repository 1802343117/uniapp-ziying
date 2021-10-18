<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$store.state.BarHeight = uni.getSystemInfoSync().statusBarHeight
			uni.connectSocket({
			  // url: 'ws://localhost:8081/websocket'
			  url: 'ws://ziying.cn.utools.club/websocket'
			});
			uni.onSocketOpen(function (res) {
			  console.log('WebSocket连接已打开！');
			});
			uni.onSocketError(function (res) {
			  console.log('WebSocket连接打开失败，请检查！');
			});
		},
		onShow: function() {
			uni.onSocketMessage(res => {
			
				var obj = JSON.parse(res.data);
				console.log('收到服务器内容：');
				console.log(obj)
				if ( obj.sign ) {
					this.$store.state.remen_list[parseInt(obj.index)].movieComments.push(obj)
				} else {
					console.log("执行")
					this.$H.post('/attachedFiles/selectByArticleId?articleId=' + obj.articleId).then( src => {
						obj.attachedFiles = src.data
						this.$store.state.remen_list.unshift(obj)
					})
				}
			});
			console.log('App Show')
		},
		onHide: function() {
			// 注意这里有时序问题，
			// 如果 uni.connectSocket 还没回调 uni.onSocketOpen，而先调用 uni.closeSocket，那么就做不到关闭 WebSocket 的目的。
			// 必须在 WebSocket 打开期间调用 uni.closeSocket 才能关闭。
			uni.onSocketOpen(function () {
			  uni.closeSocket();
			});
			uni.onSocketClose(function (res) {
			  console.log('WebSocket 已关闭！');
			});
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
