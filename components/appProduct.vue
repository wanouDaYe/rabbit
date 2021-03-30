<template>
	<view class="app-product">
		<view class="app-product-title">{{title}}</view>
		<view v-if="remarks" class="app-product-tips">备注说明：{{remarks}}</view>
		<view class="app-product-info">
			<view class="app-product-info-left">
				<block v-if="rules.length > 0">
					<view class="app-product-info-rule">
						<block v-for="(rule, index) in rules" :key="rule.text">
							<text v-if="rule.class" :class="rule.class">{{rule.text}}</text>
							<text v-else :class="ruleColors[index%ruleColors.length]">{{rule}}</text>
						</block>
					</view>
				</block>
				<block v-if="labels.length > 0">
					<view class="app-product-info-label">
						<block v-for="(label, index) in labels" :key="label.text">
							<text v-if="label.class" :class="label.class">{{label.text}}</text>
							<text v-else :class="labelColors[index%labelColors.length]">{{label}}</text>
						</block>
					</view>
				</block>
				<view class="app-product-info-demand">
					<text>{{getTicket ? '需取票' : '不需取票'}}</text>
					<text class="app-divider"></text>
					<text>已售：{{conciseSold}}</text>
				</view>
			</view>
			<view class="app-product-info-right">
				<view class="app-product-price">
					<view class="app-product-price-normal">
						<text class="app-i">￥</text>
						<text class="app-span">{{price}}</text>
					</view>
					<text v-if="listingPrice" class="app-del">￥{{listingPrice}}</text>
				</view>
				<navigator class="app-product-btn" :url="url">立即预定</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
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
			listingPrice: Number
		},
		data() {
			return {
				ruleColors: ['fg-blue', 'fg-orange'],
				labelColors: ['app-label-1']
			};
		},
		computed: {
			conciseSold() {
				let _sold = this.$props.sold;
				if(_sold > 10000) {
					_sold = Math.floor(_sold / 1000);
					_sold = _sold / 10;
					_sold += '万+';
				};
				return _sold;
			}
		}
	}
</script>

<style lang="less" scoped>
@import "@/common/less/config.less";
.app-product {
	background: #F5F7FE;
	padding: @mar-normal;
	border-radius: @radio-half;
	&-title {
		color: @color-font;
		font-size: @size-normal;
		line-height: 1.5;
	}
	&-tips {
		font-size: @size-small;
		color: #999;
		margin-top: 2px;
	}
	&-info {
		.flex-align-end();
		padding-top: @mar-short;
		justify-content: space-between;
		&-left {
			flex-grow: 1;
		}
		&-right {
			flex-shrink: 0;
			padding-left: @mar-normal;
			text-align: right;
		}
		&-rule {
			font-size: @size-small;
			margin-bottom: @mar-short;
			text {
				display: inline-block;
				margin-right: @mar-normal;
				margin-bottom: 4px;
			}
		}
		&-label {
			font-size: @size-small - 4;
			margin-bottom: 10px;
			text {
				line-height: 28rpx;
				padding: 2px 8px;
				border-radius: 3px;
				margin-right: @mar-normal;
			}
		}
		&-demand {
			font-size: @size-small;
			color: @color-font-disable;
		}
	}
	&-price {
		margin-bottom: @mar-short;
		&-normal {
			font-weight: bold;
			display: inline-block;
			color: #D22500;
		}
		.app-i {
			font-size: @size-small;
		}
		.app-span {
			font-size: @size-big + 4;
		}
		.app-del {
			font-size: @size-small;
			color: @color-font-disable;
			text-decoration: line-through;
			margin-left: 4px;
		}
	}
	&-btn {
		width: 136rpx;
		height: 48rpx;
		line-height: 48rpx;
		border-radius: 24rpx;
		background: linear-gradient(135deg,rgba(255,162,0,1) 0%,rgba(255,104,0,1) 100%);
		color: @color-white;
		font-size: @size-small;
		float: right;
		text-align: center;
	}
}
</style>
