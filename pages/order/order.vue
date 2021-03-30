<template>
	<view class="app-order app-be-footer">
		<!--底部导航-->
		<view class="app-footer">
			<view class="app-order-footer">
				<view class="app-order-total">
					<label>总价：</label>
					<view class="app-h5">¥1,009.00</view>
				</view>
				<view class="app-order-detailed">
					<text>价格明细</text>
					<image class="icon" src="@/static/images/icon_jinru.png"></image>
				</view>
			</view>
			<navigator class="app-footer-btn" url="/pages/order/order">去支付</navigator>
		</view>
		<view class="app-content">
			<view class="app-modular app-row-lg">
				<view class="app-h4">成人票</view>
				<view class="app-jump">购票须知</view>
			</view>
		</view>
		<view class="app-content">
			<view class="app-modular">
				<view class="app-h5">使用日期：</view>
				<view class="app-order-modular">
					<appOrderDate
						:data="data"
						:current="currentDate"
						v-on:changeDate="changeDate($event)"
					></appOrderDate>
				</view>
				<view class="app-order-modular">
					<appTimeSlot
						:date="currentDate"
						v-on:changeTime="changeTime"
					></appTimeSlot>
				</view>
				<view class="app-order-modular app-order-row">
					<label class="app-label">数量</label>
					<view class="app-row">
						<view class="app-order-num-btn" @click="numReduce">
							<image class="icon" src="@/static/images/icon_jian.png"></image>
						</view>
						<view class="app-order-num-btn">
							<input class="app-order-num-input" type="number" v-model="num" @blur="numVerify" />
						</view>
						<view class="app-order-num-btn" @click="numPlus">
							<image class="icon" src="@/static/images/icon_jia.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="app-content">
			<view class="app-modular">
				<view class="app-h5">优惠券：</view>
				<view class="app-order-modular app-row" @click="couponShow">
					<label class="app-label">{{coupon.name}}</label>
					<image class="icon" src="@/static/images/icon_next.png"></image>
				</view>
			</view>
		</view>
		<view class="app-content">
			<view class="app-modular">
				<view class="app-h5">出行游客<text class="app-span">每张票需要</text><text class="app-span fg-red">1</text><text class="app-span">位游玩人信息</text></view>
				<view class="app-order-modular">
					<appOrderPlayer ref="tourist"
						:num="num"
					></appOrderPlayer>
				</view>
			</view>
		</view>
		<view class="app-content">
			<view class="app-modular">
				<view class="app-h5">保险名称</view>
				<view class="app-order-modular">
					<appOrderInsure
						@change="changeInsure"
					></appOrderInsure>
				</view>
			</view>
		</view>
		<appPopCoupon ref="coupon"
			:cid="coupon.id"
			@change="changeCoupon"
		></appPopCoupon>
	</view>
</template>

<script>
	import appOrderDate from '@/components/appOrderDate.vue';
	import appTimeSlot from '@/components/appTimeSlot.vue';
	import appOrderPlayer from '@/components/appOrderPlayer.vue';
	import appOrderInsure from '@/components/appOrderInsure.vue';
	import appPopCoupon from '@/components/appPopCoupon.vue';
	
	export default {
		components: {
			appOrderDate,
			appTimeSlot,
			appOrderPlayer,
			appOrderInsure,
			appPopCoupon
		},
		data() {
			return {
				//选中日期
				currentDate: '',
				//可选日期
				data: [
					{
						date: '2021-2-23',
						price: 200.01,
						type: 'normal'
					},
					{
						date: '2021-2-24',
						price: 0.01,
						type: 'normal'
					},
					{
						date: '2021-2-25',
						price: 0.08,
						type: 'normal'
					},
					{
						date: '2021-2-28',
						price: 10.01,
						type: 'normal'
					},
					{
						date: '2021-3-5',
						price: 10.01,
						type: 'normal'
					}
				],
				//选中的时间段
				time: '',
				//数量
				num: 1,
				//每张票对应的数量
				tNum: 1,
				//选中的保险
				insure: {
					id: '',
					money: 0,
					name: ''
				},
				//优惠券
				coupon: {
					id: '',
					money: 0,
					name: '选择优惠券'
				}
			}
		},
		watch: {
			num(val) {
				this.num = parseInt(val);
			}
		},
		methods: {
			//修改日期
			changeDate(date) {
				this.currentDate = date;
				this.time = '';
			},
			//修改时间段
			changeTime(time) {
				this.time = time;
			},
			//数量增加
			numPlus() {
				this.num = parseInt(this.num) + 1;
			},
			//数量减少
			numReduce() {
				if(this.numVerify()) this.num = parseInt(this.num) - 1;
				//this.num -= 1;
			},
			//数量验证
			numVerify() {
				console.log(this.num < 2 || !this.num || this.num != Math.floor(this.num));
				if(this.num < 2 || !this.num || this.num != Math.floor(this.num)) {
					this.num = 1;
					return false;
				}else {
					return true;
				}
			},
			//优惠券显示
			couponShow() {
				this.$refs.coupon.showToggle();
			},
			//修改保险
			changeInsure(data) {
				this.insure = {
					id: data.id,
					money: data.money,
					name: data.name
				}
			},
			//修改优惠券
			changeCoupon(data) {
				this.coupon = {
					id: data.id ? data.id : '',
					money: data.money ? data.money : 0,
					name: data.name ? data.name : '选择优惠券'
				}
			}
		},
		mounted() {
			this.tNum = this.$refs.tourist.playerNum;
		}
	}
</script>

<style lang="less">
@import "@/common/less/config.less";

.app-content {
	background: #fff;
	padding: 0;
}
.app-order-modular {
	margin-top: @mar-order;
}
.app-modular {
	.app-order-row:first-child {
		padding-top: 0;
	}
	.app-order-row:last-child {
		padding-bottom: 0;
	}
}
.app-order-num-btn {
	text-align: center;
	width: 80rpx;
	height: 72rpx;
	line-height: 72rpx;
	border: solid 1px #bbb;
	.icon {
		margin-top: 20rpx;
	}
}
.app-order-num-btn:first-child {
	border-right: none;
	border-top-left-radius: 8rpx;
	border-bottom-left-radius: 8rpx;
}
.app-order-num-btn:last-child {
	border-left: none;
	border-top-right-radius: 8rpx;
	border-bottom-right-radius: 8rpx;
}
.app-order-num-input {
	height: 72rpx;
	line-height: 72rpx;
	color: @color-font;
	font-size: @size-big;
	padding: 0;
}
.app-h5 .app-span {
	font-weight: 400;
	color: @color-font-normal;
	margin-left: 10rpx;
}
.app-h5 .app-span.fg-red {
	.fg-red();
}
.app-h5 .app-span:first-child {
	margin-left: 20rpx;
}
</style>
