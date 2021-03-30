<template>
	<view v-if="show" class="pop">
		<view class="pop-footer active">
			<view class="pop-up-title">
				<view class="app-h5">优惠券</view>
				<image class="icon" src="@/static/images/icon_close.png" @click.stop="showToggle"></image>
			</view>
			<view class="pop-up-body">
				<radio-group v-if="list.length > 0" @change="selectOK">
					<view class="app-order-modular">
						<view v-for="(v,k) in list" class="app-row-lg app-coupon" :key="k">
							<view class="app-p">{{v.name}}</view>
							<view class="app-span">￥{{v.money}}</view>
							<radio style="transform: scale(0.74);"
								:value="v.id"
								:checked="v.id == cid ? true : false"
							></radio>
						</view>
						<view class="app-row-lg app-coupon">
							<view class="app-p">不使用优惠券</view>
							<radio style="transform: scale(0.74);"
								value=""
								:checked="!cid ? true : false"
							></radio>
						</view>
						<!--<view class="app-row-lg app-coupon">
							<view class="app-p">优惠券名称</view>
							<view class="app-span">￥0.02</view>
							<radio style="transform: scale(0.74);"></radio>
						</view>
						<view class="app-row-lg app-coupon">
							<view class="app-p">不使用优惠券</view>
							<radio style="transform: scale(0.74);"></radio>
						</view>-->
					</view>
				</radio-group>
			</view>
			<view class="pop-btn-group">
				<view class="pop-btn-3">去领券</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"appPopCoupon",
		props: {
			//用户id
			uid: {
				type: String,
				default: ''
			},
			//优惠券id
			cid: {
				type: String,
				default: ''
			},
			//需要支付的金额
			money: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				list: [{
					id: 'ppp111',
					money: 20,
					min: 50,	//最低条件
					name: '通用券50-20'
				}, {
					id: 'ppp12222',
					money: 5,
					min: 0,	//最低条件
					name: '通用减5券'
				}],
				show: false,
				selected: ''
			};
		},
		methods: {
			showToggle() {
				this.show = !this.show;
			},
			selectOK(e) {
				let id = e.detail.value,
					coupon = {};
				this.selected = id;
				this.list.forEach(v=>{
					if(v.id == id) coupon = v;
				});
				this.$emit('change',coupon);
				this.showToggle();
			}
		}
	}
</script>

<style lang="less" scoped>
@import "@/common/less/config.less";

.app-order-modular {
	padding-top: @mar-short;
}
.app-coupon {
	padding: @mar-short 40rpx;
	.app-p, .app-span {
		font-size: @size-normal;
		color: @color-font;
	}
	.app-p {
		flex-grow: 1;
	}
	.app-span {
		padding-right: @mar-normal;
		padding-left: @mar-normal;
	}
}
</style>
