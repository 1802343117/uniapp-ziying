import Vue from 'vue'
import Vuex from 'vuex'

import $H from '../common/request.js';
import $C from '../common/config.js';
import io from '../common/uni-socket.io.js';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		token: null,
		socket: null,
		userWatch: [],
		titles: ["推荐","电视剧","电影","综艺","动漫","游戏","体育","生活"],
		tvList: null,
		swiperLb: true,
		videoList: true,
		actorList: true,
		watchList: true,
		xiHuanList: [],
		sosuoArr: [],
		xiaZaiList: [],
		remen_list: [],
		userHref: null,
		BarHeight: 0
	},
	actions: {
		login({
			state
		}, user) {
			state.user = user.user
			state.token = user.token
			state.userWatch = user.userWatch
			uni.setStorageSync('userWatch', user.userWatch)
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		},
		getUserInfo({
			state
		}) {
			$H.get('/user/info', {
				token: true,
				noJump: true,
				toast: false
			}).then(res => {
				state.user = res
				uni.setStorage({
					key: "user",
					data: bJSON.stringify(state.user)
				})
			})
		},
		initUser({
			state
		}) {
			let u = uni.getStorageSync('user')
			let t = uni.getStorageSync('token')
			if (u) {
				state.user = JSON.parse(u)
				state.token = t
			}
		},
		logout({
			state
		}) {
			$H.post('/logout', {}, {
				token: true,
				toast: false
			})
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		}
	}
})
