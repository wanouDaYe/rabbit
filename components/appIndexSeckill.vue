<template>
	<view class="seckill">
		<appProduct
			:pid="pid"
			:url="url"
			:title="title"
			:remarks="remarks"
			:rules="rules"
			:labels="labels"
			:getTicket="getTicket"
			:sold="sold"
			:price="price"
			:listingPrice="listingPrice"
		></appProduct>
		<block v-if="countDown.time">
			<view class="seckill-countDown">
				<view class="seckill-label">{{countDown.text}}：</view>
				<block v-if="countDown.index >= 0">
					<graceCountDown
						ref="countdown" 
						:timer="countDown.time" 
						borderColor="rgba(0,0,0,0)" 
						splitorColor="#FC4700" 
						fontColor="#FC4700" 
						bgrColor="none" 
						fontSize="24rpx"
						width="24rpx"
						:splitorText="['天', '时', '分', '秒']" 
						v-on:endDo="endDo(countDown.index)">
					</graceCountDown>
				</block>
				<view class="seckill-end" v-else>{{countDown.time}}</view>
			</view>
		</block>
	</view>
</template>

<script>
	import graceCountDown from '@/graceUI/components/graceCountDown.vue';
	import appProduct from './appProduct.vue';
	var graceDate = require("@/graceUI/jsTools/date.js");
	export default {
		components: {
			appProduct,
			graceCountDown
		},
		props: {
			pid: {
				type: String,
				required: true
			},
			url: {
				type: String,
				required: true
			},
			title: {
				type: String,
				required: true
			},
			remarks: {
				type: String,
				defaule: ''
			},
			rules: {
				type: Array,
				default: function() {
					return [];
				}
			},
			labels: {
				type: Array,
				default: function() {
					return [];
				}
			},
			getTicket: {
				type: Boolean,
				required: true
			},
			sold: {
				type: Number,
				default: 0
			},
			price: {
				type: Number,
				required: true
			},
			listingPrice: Number,
			times: {
				type: Array,
				required: true,
				default: function() {
					return [{
						time: '',	//XXXX-X-XX XX:XX:XX	时间节点
						text: ''	//倒计时提示语
					}]
				}
			}
		},
		data() {
			return {
				countDown: {
					index: 0,	//排序后$props.times当前倒计时的序列
					text: '',
					time: ''	//graceCountDown 所用的时间格式
				}
			};
		},
		methods: {
			endDo(index) {
				let _times = this.$props.times;
				index += 1;
				if(index < _times.length) {
					this.countDown = {
						index: index,
						text: _times[index].text,
						time: _times[index].time
					};
					this.$refs.countdown.reSetTimer(_times[index].time);
				}else {
					this.countDown = {
						index: -1,
						text: '倒计时',
						time: '已结束'
					}
				}
			},
		},
		mounted() {
			let times = this.$props.times;
			times.sort((a,b)=> {
				let aTime = new Date(a.time),
					bTime = new Date(b.time);
				
				aTime = aTime.getTime();
				bTime = bTime.getTime();
				
				if(aTime <= bTime) {
					return -1;
				}else {
					return 1;
				}
			});
			
			for(let i=0; i<times.length; i++) {
				let v = times[i];
					
				let vTime = new Date(v.time),
					now = new Date();
					
				vTime = vTime.getTime();
				now = now.getTime();
				
				if(now < vTime) {
					let _time = graceDate.formatDateTime(vTime,'str');
					this.countDown = {
						index: i,
						text: v.text,
						time: _time
					}
					break;
				}else {
					this.countDown = {
						index: -1,
						text: '倒计时',
						time: '已结束'
					}
				}
			}
			//console.log(this.countDown);
		}
	}
</script>

<style lang="less" scoped>
@import "@/common/less/config.less";
.seckill {
	background: #F5F7FE;
	border-radius: @radio-half;
	overflow: hidden;
}
.seckill-countDown {
	background: #EBEFFD;
	.flex-align-center();
	justify-content: space-between;
	padding: @mar-short @mar-normal;
}
.seckill-label, .seckill-end {
	color: @color-font;
	font-size: @size-small;
}
.grace-countdown-numbers {
	background: red;
}
</style>
