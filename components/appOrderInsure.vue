<template>
	<view class="app-insure app-row">
		<view class="app-insure-synopsis" @click="openPop">
			<view class="app-h5 app-row">
				¥{{product.money}}/人 x 2份
				<image class="icon" src="@/static/images/icon_tips.png"></image>
			</view>
			<view class="app-p">{{product.name}}</view>
		</view>
		<appRadio
			:checked="checked"
			@change="radioPop"
		></appRadio>
		<appPopInsure ref="insure"
			:list="list"
			:tipId="checked"
			@selectInsure="selectInsure"
		></appPopInsure>
	</view>
</template>

<script>
	import appRadio from './appRadio.vue';
	import appPopInsure from './appPopInsure.vue';
	
	export default {
		name:"appOrderInsure",
		props: {
			//产品id
			pid: {
				type: String,
				default: ''
			}
		},
		components: {
			appRadio,
			appPopInsure
		},
		data() {
			return {
				checked: '',
				list: [{
					id: 'sdfjskdf111',
					name: '(意外事故10，社保内医疗1万)',
					money: 2,
					tips: [{
						title: '险种信息',
						content: ['·客户服务电话：95585','·中华联合财产保险股份有限公司','·境内旅行意外伤害保险（2014版）']
					}, {
						title: '险种说明',
						content: '·意外伤害保险金 RMB 400000 元 \n ·意外医疗保险金 RMB 50000 元 \n ·突发急性病身故保险金 RMB 50000 元 \n ·突发急性病医疗保险金 RMB 10000 元 \n ·遗体送返及丧葬费保险金 RMB 10000 元 '
					}]
				}, {
					id: 'sdf222111',
					name: '(意外事故20，社保内医疗2万)',
					money: 5,
					tips: [{
						title: '险种信息',
						content: ['·客户服务电话：955851111111111111111','·中华联合财产保险股份有限公司','·境内旅行意外伤害保险（2014版）']
					}, {
						title: '险种说明',
						content: '·意外伤害保险金 RMB 400000 元 \n ·意外医疗保险金 RMB 50000 元 \n ·突发急性病身故保险金 RMB 50000 元 \n ·突发急性病医疗保险金 RMB 10000 元 \n ·遗体送返及丧葬费保险金 RMB 10000 元 '
					}]
				}, {
					id: 's525252521',
					name: '(意外事故28880，社保内医疗2万)',
					money: 15,
					tips: [{
						title: '险种信息',
						content: ['·客户服务电话：955851111111111111111','·中华联合财产保险股份有限公司','·境内旅行意外伤害保险（2014版）']
					}, {
						title: '险种说明',
						content: '·意外伤害保险金 RMB 400000 元 \n ·意外医疗保险金 RMB 50000 元 \n ·突发急性病身故保险金 RMB 50000 元 \n ·突发急性病医疗保险金 RMB 10000 元 \n ·遗体送返及丧葬费保险金 RMB 10000 元 '
					}]
				}]
			};
		},
		computed: {
			product() {
				let p;
				this.list.forEach(v=>{
					if(this.checked == v.id) p = v;
				});
				return p || this.list[0];
			}
		},
		methods: {
			openPop() {
				this.$refs.insure.showToggle();
			},
			radioPop() {
				if(this.checked) {
					this.checked = '';
				}else {
					this.openPop();
				}
			},
			selectInsure(data) {
				this.checked = data;
				let _data;
				this.list.forEach(v=>{
					if(v.id == data) _data = v;
				});
				this.$emit('change', _data);
			}
		}
	}
</script>

<style lang="less" scoped>
@import "@/common/less/app3.less";

.app-row {
	padding: 8rpx 0;
	border-bottom: none;
}
.app-insure {
	&-synopsis {
		flex-grow: 1;
		.icon {
			margin-left: @mar-short;
		}
		.app-h5 {
			font-size: @size-normal;
			color: @color-font;
		}
		.app-p {
			margin-top: 8rpx;
			font-size: @size-small;
			color: @color-font-normal;
		}
	}
}
</style>
