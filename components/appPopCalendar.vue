<template>
	<view v-show="show" class="pop" @click.self="calendarToggle">
		<view class="pop-footer active">
			<view class="pop-up-title">
				<view class="app-h5">选择使用日期</view>
				<image class="icon" src="@/static/images/icon_close.png" @click.stop="calendarToggle"></image>
			</view>
			<view class="pop-up-body">
				<view class="pop-content">
					<view class="pop-date-month" v-for="v in calendar" :key="v.id">
						<view class="pop-date-title">{{v.year}}年{{v.month + 1}}月</view>
						<tTable class="table">
							<tTr class="tr">
								<tTh class="th">日</tTh>
								<tTh class="th">一</tTh>
								<tTh class="th">二</tTh>
								<tTh class="th">三</tTh>
								<tTh class="th">四</tTh>
								<tTh class="th">五</tTh>
								<tTh class="th">六</tTh>
							</tTr>
							<tTr class="tr" v-for="r in v.calendar" :key="r.id">
								<block v-for="c in r.row" :key="c.id">
									<tTd class="td" v-if="c.day">
										<view v-if="c.active" :class="c.active ? 'active': ''">
											<view class="app-h5">{{c.day}}</view>
											<view class="app-p">￥{{c.price}}</view>
										</view>
										<view v-else-if="c.price" @click.stop="changeDate(c.date)">
											<view class="app-h5">{{c.day}}</view>
											<view class="app-p">￥{{c.price}}</view>
										</view>
										<view v-else class="fg-gray">
											<view class="app-h5">{{c.day}}</view>
										</view>
									</tTd>
									<tTd class="td" v-else></tTd>
								</block>
								<!--<t-td class="td"></t-td>
								<t-td class="td"></t-td>
								<t-td class="td">
									<view class="fg-gray">
										<view class="app-h5">1</view>
									</view>
								</t-td>-->
							</tTr>
						</tTable>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd
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
				//显示状态
				show: false
			};
		},
		computed: {
			calendar() {
				let _start = this.$props.data[0].date,
					_end = this.$props.data[this.$props.data.length - 1].date,
					_monthArr = [],
					_s = new Date(),
					_e = new Date(),
					_calendar = [],
					_currentDate = this.$props.current;
				
				_start = _start.split("-");
				_end = _end.split("-");
				
				_s.setFullYear(_start[0], parseInt(_start[1])-1);
				_e.setFullYear(_end[0], parseInt(_end[1])-1);
				
				let _crr = _s;
				while(_crr <= _e) {
					let _y = _crr.getFullYear(),
						_m = _crr.getMonth();
						
					_monthArr.push({
						year: _y,
						month: _m
					});
					
					if(_m == 11) {
						_crr.setFullYear(_y+1);
						_m = -1;
					}
					_crr.setMonth(_m + 1);
				}	
				
				_monthArr.forEach((v, k) => {
					let _dayLength = (new Date(v.year, v.month+1, 0)).getDate(),
						_firstDay = new Date(v.year, v.month, 1),
						_firstWeek = _firstDay.getDay(),
						_month = [];
											
					for(let i = 0; i < _dayLength; i++) {
						let _price = null,
							_type = null,
							_date = v.year+'-',
							_list = this.$props.data;
						_date += v.month+1;
						_date += '-';
						_date += i+1;
						
						let	_active = _date == _currentDate ? true : false;
							
						_list.forEach((_lv, _lk) => {
							if(_date == _lv.date) {
								_price = _lv.price;
								_type = _lv.type;
							}
						});
						
						let _day = {
							year: v.year,
							month: v.month,
							day: i+1,
							date: _date,
							price: _price,
							type: _type,
							active: _active
						}
						_month.push(_day);
					}
					
					let _propArr = new Array(_firstWeek),
						_nextArrLength = 42 - _month.length - _firstWeek,
						_nextArr = new Array(_nextArrLength),
						_rowArr = [],
						_tableArr = [];
						
					_month = _propArr.concat(_month.concat(_nextArr));
					
					
					for(let i = 0; i<_month.length; i++) {
						//_month[i].id = this.$global.randomKey();
						_month[i] = Object.assign({},_month[i],{id: this.$global.randomKey()});
						if(_rowArr.length < 7) {
							_rowArr.push(_month[i]);
							if(i == _month.length - 1) {
								_tableArr.push({
									row: _rowArr,
									id: this.$global.randomKey()
								});
							}
						}else {
							_tableArr.push({
								row: _rowArr,
								id: this.$global.randomKey()
							});
							_rowArr = [];
							_rowArr.push(_month[i]);
						}
					}
					
					_calendar.push({
						id: this.$global.randomKey(),
						year: v.year,
						month: v.month,
						calendar: _tableArr
					})
				});
				
				return _calendar;
			}
		},
		methods: {
			//显示隐藏
			calendarToggle() {
				this.show = !this.show;
			},
			//修改选中日期
			changeDate(date) {
				this.$emit('changeDate', date);
				this.calendarToggle();
			}
		}
	}
</script>

<style lang="less">
@import "@/common/less/app3.less";

.icon {
	width: 32rpx;
	height: 32rpx;
}
.table {
	border: none;
}
.tr {
	background: none !important;
}
.td, .th {
	width: 14.28%;
	height: 80rpx;
	/*box-sizing: border-box;
	flex-shrink: 0;
	overflow: hidden;
	border: none;*/
}
.td {
	color: @color-font;
}
.th {
	color: @color-font-normal;
}
.fg-gray {
	color: #ccc;
}
.t-td .active, .td .active {
	background: @fg-theme;
	color: #fff;
	width: 100%;
	padding: 10rpx 0;
	border-radius: @radio-half;
	.app-h5, .th {
		color: #fff;
	}
}
.pop-date-month {
	.app-h5, .th {
		font-size: 24rpx;
	}
	.app-p {
		font-size: 20rpx;
	}
}
.pop-date-title {
	font-size: @size-big;
	text-align: center;
	color: @color-font;
	margin-bottom: 8rpx;
}
.red {
	color: red !important;
}
</style>
