<template>
	<view v-if="show" class="pop" @click.self="showToggle">
		<view class="pop-footer active" @click.stop="function(e) {e.preventDefault()}">
			<view class="pop-up-title">
				<view class="app-h5">添加游玩人</view>
				<image class="icon" src="@/static/images/icon_close.png" @click.stop="showToggle"></image>
				<view class="pop-btn-1">新增常用联系人</view>
			</view>
			<view class="pop-up-body">
				<view class="pop-content">
					<checkbox-group @change="selectChange">
						<view class="app-row" v-for="(p,pk) in list" :key="pk" >
							<checkbox :value="p.id" :checked="p.active" style="transform: scale(0.74);" color="#3B68EA"></checkbox>
							<view class="app-player-info">
								<view class="app-h5">{{p.name}} {{p.phone}}</view>
								<view class="app-p">{{p.cardType}} {{p.cardId}}</view>
							</view>
							<navigator class="app-player-edit">编辑</navigator>
						</view>
					</checkbox-group>
				</view>
			</view>
			<view class="pop-btn-group">
				<view class="pop-btn-2" @click="selectOK">确 定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import appRadio from './appRadio.vue';
	
	export default {
		name:"appPopPlayerList",
		props: {
			/**list 可选的游玩人
			 * id: 游玩人id
			 * name: 姓名
			 * phone: 电话
			 * cardType: 证件类型
			 * cardId: 证件号
			 * active: 选中状态
			 */
			list: {
				type: Array,
				default: function() {
					return [];
				}
			},
			//选择最大数量
			max: {
				type: Number,
				default: 1
			},
			//当前票key
			tKey: {
				type: Number
			}
		},
		components: {
			appRadio
		},
		data() {
			return {
				show: false,
				selectArr: []
			};
		},
		watch: {
			selectArr(newVal, oldVal) {
				if(newVal.length > this.$props.max) {
					let id = this.$global.getArrDifference(newVal,oldVal);
					uni.showToast({
						icon: 'none',
						title: "人数超过最大数量"
					});
				}
			}
		},
		methods: {
			showToggle() {
				this.show = !this.show;
			},
			selectChange(e) {
				this.selectArr = e.detail.value;
			},
			selectOK() {
				if(this.selectArr.length <= this.$props.max) {
					this.$emit('playerSelect',this.selectArr,this.$props.tKey);
					this.showToggle();
				}else {
					uni.showToast({
						icon: 'none',
						title: "人数超过最大数量,请取消多余的选择"
					});
				}
			}
		}
	}
</script>

<style lang="less" scoped>
@import "@/common/less/app3.less";

.pop-content {
	height: 552rpx;
}
.app-row {
	padding: @mar-normal 0;
	border-bottom: @border;
}
.app-row:first-child {
	padding-top: 8rpx;
}
.app-player-info {
	padding-left: 16rpx;
	padding-right: 16rpx;
	flex-grow: 1;
	.app-h5 {
		font-size: @size-normal;
		color: @color-font;
		font-weight: 400;
	}
	.app-p {
		font-size:@size-small;
		color: @color-font-normal;
		margin-top: 8rpx;
	}
}
.app-player-edit {
	font-size:@size-small;
	color: @color-font-normal;
	padding: 8rpx 0 8rpx 30rpx;
	border-left: @border;
}
</style>
