<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
/* 加载核心样式 非 nvue 平台  */
/* #ifndef APP-PLUS-NVUE */
@import "./graceUI/graceUI.css";
@import "./graceUI/graceIcons.css";
/* #endif */

/* 加载核心样式 nvue 平台  */
/* #ifdef APP-PLUS-NVUE */
@import "./graceUI/graceWeex.css";
.grace-icons{font-family:graceIconfont;}
/* #endif */

@import "./common/less/app3.less";
</style>
