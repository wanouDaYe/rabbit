<template>
	<!-- 数字进度演示 -->
	<view class="app-slider">
		<graceSwiper
		 borderRadius="0rpx" 
		 :width="750" 
		 :height="400"
		 :currentIndex="0" 
		 :spacing="0" 
		 :padding="0" 
		 :opacity="1" 
		 :swiperItems="list" 
		 @swiperchange="swiperchange"
		 indicatorType="none" >
		</graceSwiper>
		<view class="app-slider-pages">{{index}} / {{list.length}}</view>
	</view>
</template>
<script>
import graceSwiper from "@/graceUI/components/graceSwiper.vue";
export default{
	props: {
		list: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			index: 1
		}
	},
	methods:{
		swiperchange : function(e){
			this.index = e+1;
		},
		taped : function(e){
			uni.showToast({
				title:"您点击了第 "+e+" 个项目", icon:"none"
			});
		}
	},
	components: {
		graceSwiper
	}
}
</script>
<style lang="less" scoped>
@import "@/common/less/config.less";
.app-slider {
	position: relative;
}
.app-slider-pages {
	position: absolute;
	width: 116rpx;
	height: 36rpx;
	line-height: 36rpx;
	border-radius: 18rpx;
	background: #FFC000;
	text-align: center;
	bottom: 24px;
	display: inline-block;
	left: 50%;
	transform: translateX(-50%);
	color: #333;
	font-size: 20rpx;
}
</style>

