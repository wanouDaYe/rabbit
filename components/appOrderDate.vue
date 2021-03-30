<template>
	<view class="app-date" v-if="data.length > 0">
		<view class="app-date-select">
			<block v-for="option in optionView" :key="option.date">
				<view class="app-date-option" v-if="option.date == current" @click="changeDate(option.date)">
					<view class="app-date-item active">
						<view class="app-date-text">{{option.label ? option.label+' ' : ''}}{{option.monthDate}}</view>
						<view class="app-date-price">￥{{option.price}}</view>
						<image class="icon" src="@/static/images/icon_xuanzhong.png"></image>
					</view>
				</view>
				<view class="app-date-option" v-else @click="changeDate(option.date)">
					<view class="app-date-item">
						<view class="app-date-text">{{option.label ? option.label+' ' : ''}}{{option.monthDate}}</view>
						<view class="app-date-price">￥{{option.price}}</view>
					</view>
				</view>
			</block>
			<!--<view class="app-date-option">
				<view class="app-date-item active">
					<view class="app-date-text">今天 03.18</view>
					<view class="app-date-price">￥10000.00</view>
					<image class="icon" src="@/static/images/icon_xuanzhong.png"></image>
				</view>
			</view>
			<view class="app-date-option">
				<view class="app-date-item">
					<view class="app-date-text">今天 03.18</view>
					<view class="app-date-price">￥10000.00</view>
				</view>
			</view>-->
		</view>
		<view class="app-date-item app-date-more" @click="calendarToggle">
			<view class="app-date-more-text">
				<view>更多</view>
				<view>日期</view>
			</view>
			<image class="icon" src="@/static/images/icon_next.png"></image>
		</view>
		<appPopCalendar ref="calendar"
			:data="data"
			:current="current"
			v-on:changeDate="changeDate($event)"
		></appPopCalendar>
	</view>
</template>

<script>
import appPopCalendar from './appPopCalendar.vue';
export default {
	components: {
		appPopCalendar
	},
	props: {
		data: {
			type: Array,
			default: function() {
				return [];
			}
		},
		current: {
			type: String,
			defaule: ''
		}
	},
	data() {
		return {
			//快速选择日期的起始index
			startIndex: 0
		}
	},
	computed: {
		//快速选择日期
		optionView() {
			let list = this.$props.data,
				length = list.length,
				view = [],
				index = this.startIndex,
				max = 3;
			if((index+max) > length) {
				for(let i = max; i>0 ; i--) {
					let last = list[length-i];
					if(last) {
						view.push({
							date: last.date,
							price: last.price
						});
					} 
				}
			}else {
				for(let i = 0; i<max ; i++) {
					let last = list[index+i];
					view.push({
						date: last.date,
						price: last.price
					});
				}
			}
			view.forEach(v=>{
				let today = new Date(),
					date = new Date(v.date),
					deff;
				today.setHours(0);
				today.setMinutes(0);
				today.setSeconds(0);
				deff = date.getTime() - today.getTime();
				
				if(deff >= 0 && deff < 1000*60*60*24) {
					v.label = '今天';
				}else if(deff >= 1000*60*60*24 && deff < 1000*60*60*24*2) {
					v.label = '明天';
				}else if(deff >= 1000*60*60*24*2 && deff < 1000*60*60*24*3) {
					v.label = '后天';
				}
				v.monthDate = this.$global.dateFormat(v.date,'MD');
			});
			
			return view;
		}
	},
	methods: {
		//日历切换
		calendarToggle() {
			this.$refs.calendar.calendarToggle();
		},
		//修改选中日期
		changeDate(date) {
			let fast = false;
			this.optionView.forEach(v=>{
				if(v.date == date) fast = fast || true;
			});
			if(!fast) {
				this.data.forEach((v,k)=> {
					if(v.date == date) this.startIndex = k;
				});
			}
			this.$emit('changeDate', date);
		}
	}
}
</script>

<style lang="less" scoped>
@import "@/common/less/app3.less";

.app-date {
	.flex-align-stretch();
	
	.icon {
		width: 32rpx;
		height: 32rpx;
	}
	&-select {
		flex-grow: 1;
		.flex-align-stretch();
	}
	&-option {
		width: 33.33%;
		.app-date-item {
			margin-right: 8rpx;
			position: relative;
		}
	}
	&-item {
		border: solid 1px #dcdcdc;
		padding: 16rpx 20rpx;
		border-radius: 8rpx;
		text-align: center;
	}
	&-item.active {
		.border-date-active();
		overflow: hidden;
		.icon {
			position: absolute;
			bottom: 0;
			right: 0;
		}
	}
	&-more {
		.flex-align-center();
		padding-right: 12rpx;
		flex-shrink: 0;
		view {
			font-size: @size-small;
		}
	}
	&-text {
		font-size: @size-small;
		color: @color-font;
		margin-bottom: 4rpx;
	}
	&-price {
		font-size: @size-small;
		color: #DB2700;
	}
}
</style>
