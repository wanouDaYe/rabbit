<template>
	<view v-if="show" class="pop" @click.self="showToggle">
		<view class="pop-footer active" @click.stop="function(e) {e.preventDefault()}">
			<view class="pop-up-title">
				<view class="app-h5">保险名称</view>
				<image class="icon" src="@/static/images/icon_close.png" @click.stop="showToggle"></image>
			</view>
			<view class="pop-up-body">
				<view class="pop-content app-insure">
					<view class="app-h5">选择产品</view>
					<radio-group @change="activeChange">
						<view class="app-order-modular">
							<view v-for="(v,k) in list" class="app-row-lg app-insure-product" :key="k">
								<view class="app-span fg-red">{{v.money}}元 </view>
								<view class="app-span">/份</view>
								<view class="app-p">{{v.name}}</view>
								<radio style="transform: scale(0.74);" 
									:value="v.id"
									:checked="v.id == tipId ? true : false"
								>
								</radio>
							</view>
						</view>
					</radio-group>
					<view v-if="isObject(product)" class="app-insure-info">
						<block v-for="(v,k) in product.tips" :key="k">
							<view class="app-h5">{{v.title}}</view>
							<view class="app-insure-info-body">
								<block v-if="isArray(v.content)">
									<view class="app-p" v-for="(r,rk) in v.content" :key="rk">{{r}}</view>
								</block>
								<view v-else class="app-p">{{v.content}}</view>
							</view>
						</block>
					</view>
				</view>
			</view>
			<view class="pop-btn-group">
				<view class="pop-btn-2" @click="selectOK">以阅读并确认投保</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"appPopInsure",
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				}
			},
			tipId: {
				type: String,
				default: ''
			} 
		},
		data() {
			return {
				show: false,
				active: '',
				selected: ''
			};
		},
		watch: {
			tipId(newVal) {
				this.active = newVal || this.list[0].id;;
			}
		},
		computed: {
			product() {
				let res;
				this.$props.list.forEach(v=>{
					if(v.id == this.active) res = v;
				});
				return res;
			}
		},
		methods: {
			showToggle() {
				this.show = !this.show;
			},
			activeChange(e) {
				this.active = e.detail.value;
			},
			selectOK() {
				this.selected = this.active;
				this.$emit('selectInsure', this.selected);
				this.showToggle();
			},
			//判断是否为object
			isObject(obj) {
				return Object.prototype.toString.call(obj) === '[object Object]';
			},
			//判断是否为Array
			isArray(arr) {
				return Object.prototype.toString.call(arr) === '[object Array]';
			}
		},
		mounted() {
			this.active = this.tipId || this.list[0].id;
		}
	}
</script>

<style lang="less">
@import "@/common/less/app3.less";

.app-insure-product {
	padding-top: 24rpx;
	padding-bottom: 24rpx;
	border-bottom: @border;
	.app-span, .app-p {
		font-size: @size-small;
	}
	.app-p {
		flex-grow: 1;
		margin-left: @mar-short;
	}
}
.app-h5 {
	font-size: @size-normal;
	color: @color-font;
	font-weight: 400;
	margin-bottom: 8rpx;
}
.app-insure-info {
	.app-h5 {
		margin-top: 30rpx;
	}
	.app-p {
		font-size: @size-small;
		color: @color-font-normal;
		margin-top: 8rpx;
	}
}
</style>
