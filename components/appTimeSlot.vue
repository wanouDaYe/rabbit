<template>
	<view class="app-time" v-if="list.length > 0">
		<view class="app-time-list">
			<block v-for="v in list" :key="v.time">
				<view v-if="v.num === 0" class="app-time-li app-disable">
					<view class="app-h5">{{v.time}}</view>
					<view class="app-p">剩余:{{v.num}}</view>
				</view>
				<view v-else-if="v.time == active" class="app-time-li app-active">
					<view class="app-h5">{{v.time}}</view>
					<view class="app-p">剩余:{{v.num}}</view>
					<image class="icon" src="@/static/images/icon_xuanzhong.png"></image>
				</view>
				<view v-else class="app-time-li" @click="selectedTime(v.time)">
					<view class="app-h5">{{v.time}}</view>
					<view class="app-p">剩余:{{v.num}}</view>
				</view>
			</block>
			<!--<view class="app-time-li">
				<view class="app-h5">11:00-12:00</view>
				<view class="app-p">剩余:20</view>
			</view>
			<view class="app-time-li app-disable">
				<view class="app-h5">11:00-12:00</view>
				<view class="app-p">剩余:20</view>
			</view>
			<view class="app-time-li">
				<view class="app-h5">11:00-12:00</view>
				<view class="app-p">剩余:20</view>
			</view>
			<view class="app-time-li">
				<view class="app-h5">11:00-12:00</view>
				<view class="app-p">剩余:20</view>
			</view>-->
		</view>
	</view>
</template>

<script>
	import {times} from "@/data/timeslot.js";
	
	export default {
		props: ['date'],
		data() {
			return {
				list: [],
				cDate: '',
				test: 1123,
				active: ''
			};
		},
		watch: {
			date(newVal,oldVal) {
				this.cDate = newVal;
				newVal && this.getTimeSlot();
			}
		},
		created() {
			
		},
		methods: {
			//获取时间段
			getTimeSlot() {
				let date = this.cDate,
					_date = new Date(date) ? new Date(date) : '';
				if(!_date) return false;
				
				this.list = times;
				/*this.$http.request({
					url: 'request/timeslot.json'
				}).then(res=>{
					console.log(res);
				});*/
			},
			//选择时间段
			selectedTime(time) {
				this.active = time;
				this.$emit('changeTime', time);
			}
		}
	}
</script>

<style lang="less">
@import "@/common/less/app3.less";	
	
.app {
	&-time {
		background: #F6F6F6;
		border-radius: 8rpx;
		padding: 24rpx;
		.icon {
			width: 32rpx;
			height: 32rpx;
		}
		&-list {
			.flex-align-center();
			flex-wrap: wrap;
		}
		&-li {
			width: 33.33%;
			text-align: center;
			padding: 16rpx 0;
			border: solid 1px;
			border-color: rgba(0,0,0,0);
			box-sizing: border-box;
			border-radius: 8rpx;
			.app-h5 {
				color: @color-font;
				font-size: 24rpx;
			}
			.app-p {
				color: @color-font-normal;
				font-size: 20rpx;
			}
			&.app-active {
				position: relative;
				border-color: @fg-theme;
				background: fadeout(@fg-theme, 90%);
				.app-h5,.app-p {
					color: @fg-theme;
				}
				.icon {
					position: absolute;
					bottom: 0;
					right: 0;
				}
			}
		}
	}
	&-disable {
		.app-h5 {
			color: @color-font-disable;
		}
		.app-p {
			color: @color-font-disable;
		}
	}
}
</style>
