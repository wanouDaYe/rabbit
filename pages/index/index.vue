<template>
	<view class="app-index app-be-footer">
		<!--轮播-->
		<appSlider :list="swiperItems"></appSlider>
		<view class="app-content">
			<!--景区信息-->
			<view class="app-modular app-slider-next app-index-info">
				<view class="app-h3">{{info.name}}</view>
				<view class="app-row-lg app-info-time">
					<view class="app-info-vice">
						<text class="app-info-vice-state">{{info.business.state}}</text>
						<text>{{info.business.last}}</text>
					</view>
					<view class="app-info-business">
						<text>{{info.business.time}}</text>
					</view>
				</view>
				<view class="app-spot-text">{{info.intro}}</view>
				<view class="app-address app-row-lg">
					<view>{{info.address.text}}</view>
					<navigator class="app-jump" :url="mapUrl">
						<text>地图导航</text>
					</navigator>
				</view>
			</view>
			<!--限时抢购-->
			<view v-if="seckills.length > 0" class="app-modular">
				<image class="app-index-seckill-title" src="@/static/images/index_seckill_title.png"></image>
				<block v-for="seckill in seckills" :key="seckill.url">
					<view class="app-index-li">
						<appIndexSeckill
							:pid="seckill.id"
							:url="seckill.url"
							:title="seckill.title"
							:remarks="seckill.remarks"
							:rules="seckill.rules"
							:labels="seckill.labels"
							:getTicket="seckill.getTicket"
							:sold="seckill.sold"
							:price="seckill.price"
							:listingPrice="seckill.listingPrice"
							:times="seckill.times"
						></appIndexSeckill>
					</view>
				</block>
			</view>
			<!--列表-->
			<view class="app-modular">
				<view class="app-title-1">预定门票</view>
				<block v-for="li in list" :key="li.id">
					<view class="app-index-li">
						<appProduct
							:pid="li.id"
							:url="li.url"
							:title="li.title"
							:remarks="li.remarks"
							:rules="li.rules"
							:labels="li.labels"
							:getTicket="li.getTicket"
							:sold="li.sold"
							:price="li.price"
							:listingPrice="li.listingPrice"
						></appProduct>
					</view>
				</block>
			</view>
		</view>
		<!--底部导航-->
		<view class="app-footer">
			<view class="app-footer-nav">
				<block v-for="(item, index) in footerItems" :key="item.text">
					<navigator v-if="item.url" class="app-footer-nav-item" :class="{'app-active': footerCurrent == index}" :url="item.url">
						<image class="app-footer-icon" :src="item.icon"></image>
						<view class="app-footer-nav-text">{{item.text}}</view>
					</navigator>
					<view v-else-if="item.func" class="app-footer-nav-item" :class="{'app-active': footerCurrent == index}" @click="navAction(item.func)">
						<image class="app-footer-icon" :src="footerCurrent == index ? item.activeIcon : item.icon"></image>
						<view class="app-footer-nav-text">{{item.text}}</view>
					</view>
					<view v-else class="app-footer-nav-item" :class="{'app-active': footerCurrent == index}">
						<image class="app-footer-icon" :src="footerCurrent == index ? item.activeIcon : item.icon"></image>
						<view class="app-footer-nav-text">{{item.text}}</view>
					</view>
				</block>
			</view>
		</view>
		<!--客服-->
		<uni-popup ref="phone">
			<view class="pop-up pop-phone">
				<view class="pop-header">
					<view class="pop-header-title">联系电话</view>
					<view class="pop-close" @click="togglePhone">
						<icon type="clear" size="20"></icon>
					</view>
				</view>
				<view class="pop-body">
					<view class="pop-content">
						<view>房价快速减肥靠技术开发了几十块看时间快乐番薯甲方抗裂砂浆福克斯</view>
						<view class="app-row">
							<label>上班请拨打： </label>
							<view class="fg-blue" @click="call('02888884444')">028-88884444</view>
						</view>
						<view class="app-row">
							<label>下班情拨打： </label>
							<view class="fg-blue" @click="call('40099801111')">400-9980-1111</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import appSlider from '@/components/appSlider.vue';
	import appProduct from '@/components/appProduct.vue';
	import appIndexSeckill from '@/components/appIndexSeckill.vue';
	export default {
		components: {
			uniPopup,
			appSlider,
			appProduct,
			appIndexSeckill
		},
		data() {
			return {
				//轮播
				swiperItems: [
					{
						img : 'https://graceui.oss-cn-beijing.aliyuncs.com/swiperimgs/1.png',
						url : '/pages/details/details?pid=45654',
						opentype : 'navigate'
					},
					{
						img : 'https://graceui.oss-cn-beijing.aliyuncs.com/swiperimgs/2.png',
						url : '/pages/details/details?pid=3234564',
						opentype : 'navigate'
					},
					{
						img : 'https://graceui.oss-cn-beijing.aliyuncs.com/swiperimgs/3.png',
						url : '/pages/details/details?pid=123314564',
						opentype : 'navigate'
					},
					{
						img : 'https://graceui.oss-cn-beijing.aliyuncs.com/swiperimgs/4.png',
						url : '/pages/details/details?pid=12355644564',
						opentype : 'navigate'
					},
					{
						img : 'https://graceui.oss-cn-beijing.aliyuncs.com/swiperimgs/5.png',
						url : '/pages/details/details?pid=123123',
						opentype : 'navigate'
					}
				],
				//景区信息
				info: {
					name: "天堂岛海洋乐园",
					business: {
						state: "正常营业",
						last: "最晚16:30入园",
						time: "10:30 - 20:00"
					},
					intro: "成都最大海洋公园，海洋世界，海洋馆；成都亲子旅游，一日游，周末旅游的好去处。由中国知名海洋主题公园运营商—海昌海洋公园实力打造，以南北极动物表演、展示、互动、科普为主题，涵盖旅游、休闲、亲子度假等多种娱乐方式。",
					address: {
						text: "环球中心天堂岛海洋乐园",
						coordinate: ['103.834036', '30.055428'],
					}
				},
				//限时抢购
				seckills: [
					{
						id: 'sdjfklsj234212',
						url: '/pages/details/details?pid=hkjsdhf',
						title: '天堂岛海洋乐园门票夜场门票—大小同价(夏季夜场票【超值特惠】)',
						remarks: '',
						rules: ['明日可订','即时出票'],
						labels: [{
							text: '不可退',
							class: 'app-label-disable'
						}],
						getTicket: true,
						sold: 11546,
						price: 599,
						listingPrice: 1990,
						times: [
							{
								text: "距结束",
								time: "2020-12-20 02:00:00"
							},
							{
								text: "距开始",
								time: "2020-12-20 00:00:01"
							}
						]
					},
					{
						id: 'sd12131aalsj234212',
						url: '/pages/details/details?pid=234kjhsdkjf',
						title: '天堂岛海洋乐园门票夜场门票—111(夏季夜场票【超值特惠】)',
						remarks: '',
						rules: ['明日可订','即时出票'],
						labels: [{
							text: '不可退',
							class: 'app-label-disable'
						}],
						getTicket: true,
						sold: 1546,
						price: 1599,
						listingPrice: 1990,
						times: [
							{
								text: "距结束",
								time: "2020-11-30 17:45:10"
							},
							{
								text: "距开始",
								time: "2020-11-30 17:45:00"
							}
						]
					}
				],
				//列表
				list: [
					{
						id: 'sdjfklsj234212',
						url: '/pages/details/details',
						title: '天堂岛海洋乐园门票夜场门票—大小同价(夏季夜场票【超值特惠】)',
						remarks: '',
						getTicket: true,
						sold: 11546,
						price: 599,
						listingPrice: 1990,
					},
					{
						id: 'sdaaalsj234212',
						url: '/pages/details/details',
						title: '天堂岛海洋乐园门票夜场门票—111(夏季夜场票【超值特惠】)',
						remarks: '',
						rules: ['明日可订','即时出票'],
						labels: [{
							text: '不可退',
							class: 'app-label-disable'
						}],
						getTicket: true,
						sold: 1546,
						price: 1599,
						listingPrice: 1990
					}
				],
				//底部导航
				footerCurrent : 0,
				footerItems : [
					//数据格式 icon:图标; activeIcon:选中时的图标; text:文字; url:跳转链接; func:当不是超链接时执行的操作;
					{
						icon: "/static/images/footer_house.png",
						activeIcon: "/static/images/footer_house_active.png",
						text: "首页",
						url: "",
					},
					{
						icon: "/static/images/footer_talk.png",
						activeIcon: "/static/images/footer_talk_active.png",
						text: "客服",
						func: "togglePhone"
					},
					{
						icon: "/static/images/footer_order.png",
						activeIcon: "/static/images/footer_order_active.png",
						text: "订单",
						url: "/pages/myOrder/myOrder",
					},
					{
						icon: "/static/images/footer_user.png",
						activeIcon: "/static/images/footer_user_active.png",
						text: "用户",
						url: "/pages/test/test",
					}
				]
			}	
		},
		computed: {
			mapUrl() {
				return "/pages/index/map?longitude="+this.info.address.coordinate[0]+"&latitude="+this.info.address.coordinate[1]+"&name="+this.info.address.text;
			}
		},
		onLoad() {
			
		},
		methods: {
			//footerNav如果有事件的入口事件
			navAction(func) {
				this[func]();
			},
			togglePhone() {
				console.log(111);
				let state = this.$refs.phone.showPopup;
				if(state) {
					this.$refs.phone.close();
				}else {
					this.$refs.phone.open();
				}
			},
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			}
		}
	}
</script>

<style>
	
</style>
