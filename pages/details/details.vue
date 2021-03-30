<template>
	<view class="app-details app-be-footer">
		<!--轮播-->
		<appSlider :list="swiperItems"></appSlider>
		<view class="app-content">
			<!--票信息-->
			<view class="app-modular app-slider-next app-index-info">
				<view class="app-h4">{{ticketInfo.name}}</view>
				<view class="app-row-lg app-details-info">
					<view class="app-info-price">
						<view class="app-info-price-normal">
							<text class="app-i">￥</text>
							<text class="app-span">{{ticketInfo.price}}</text>
						</view>
						<text class="app-del">￥{{ticketInfo.listingPrice}}</text>
					</view>
					<view class="app-info-sale">
						<text>已售:{{ticketInfo.sold}}</text>
					</view>
				</view>
				<view class="app-address app-row-lg">
					<view>{{ticketInfo.address.text}}</view>
					<navigator class="app-jump">
						<text>地图导航</text>
					</navigator>
				</view>
			</view>
			<!--购买须知/图文详情-->
			<view class="app-modular app-tabs">
				<view class="app-tabs-nav">
					<view class="app-nav-term" :class="{'app-active': tabIndex == 0}" @click="tabToggle(0)">
						<view class="app-tabs-title">购买须知</view>
						<view class="app-tabs-title-line"></view>
					</view>
					<view class="app-nav-term" :class="{'app-active': tabIndex == 1}" @click="tabToggle(1)">
						<view class="app-tabs-title">图文介绍</view>
						<view class="app-tabs-title-line"></view>
					</view>
				</view>
				<view v-show="tabIndex == 0" class="app-tabs-content">
					<block v-for="rule in rules" :key="rule.title">
						<view class="app-details-tabs-title">{{rule.title}}</view>
						<view class="app-details-tabs-body">			
								<rich-text :nodes="rule.richText"></rich-text>
						</view>
					</block>
				</view>
				<view v-show="tabIndex == 1" class="app-tabs-content app-active">
					<rich-text :nodes="imageText"></rich-text>
				</view>
			</view>
			<!--列表-->
			<view class="app-modular">
				<view class="app-title-1">更多推荐</view>
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
				<block v-for="(item, index) in footerItems" :key="item.icon">
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
			<navigator class="app-footer-btn" url="/pages/order/order">立即预定</navigator>
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
	import parse from 'mini-html-parser2';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import appSlider from '@/components/appSlider.vue';
	import appProduct from '@/components/appProduct.vue';
	export default {
		components: {
			uniPopup,
			appSlider,
			appProduct
		},
		data() {
			return {
				//轮播
				swiperItems: [
					{
						img : 'https://graceui.oss-cn-beijing.aliyuncs.com/swiperimgs/1.png',
						url : '/pages/test/test',
						opentype : 'navigate'
					},
					{
						img : 'https://graceui.oss-cn-beijing.aliyuncs.com/swiperimgs/2.png',
						url : '/pages/test/test',
						opentype : 'navigate'
					},
					{
						img : 'https://graceui.oss-cn-beijing.aliyuncs.com/swiperimgs/3.png',
						url : '/pages/test/test',
						opentype : 'navigate'
					},
					{
						img : 'https://graceui.oss-cn-beijing.aliyuncs.com/swiperimgs/4.png',
						url : '/pages/test/test',
						opentype : 'navigate'
					},
					{
						img : 'https://graceui.oss-cn-beijing.aliyuncs.com/swiperimgs/5.png',
						url : '/pages/test/test',
						opentype : 'navigate'
					}
				],
				//票信息
				ticketInfo: {
					name: "天堂岛海洋乐园门票-双人票",
					price: 599.00,
					listingPrice: 1599.00,
					sold: 11546,
					address: {
						text: "四川省成都市武侯区环球中心天堂岛海洋乐园",
						coordinate: ['104.06','30.67'],
					}
				},
				//选项卡选中的index
				tabIndex: 0,
				//购买须知
				rules: [
					{
						title: "购买须知",
						richText: "<div>123圣诞节疯狂老实交代</div>"
					},
					{
						title: "使用说明",
						richText: "<div><p>·入园时间：09:00-16:00</p></p>·入园地址：游客集散处</p></div>",
					}
				],
				//图文介绍
				imageText: "<div><img style='width: 100%;' src='/static/images/dalaba.jpeg' /><p>·包含成人票两张【海洋馆+水母馆】</p></div>",
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
				footerCurrent : -1,
				footerItems : [
					//数据格式 icon:图标; activeIcon:选中时的图标; text:文字; url:跳转链接; func:当不是超链接时执行的操作;
					{
						icon: "/static/images/footer_house.png",
						activeIcon: "/static/images/footer_house_active.png",
						text: "首页",
						url: "/pages/index/index",
					},
					{
						icon: "/static/images/footer_talk.png",
						activeIcon: "/static/images/footer_talk_active.png",
						text: "客服",
						func: "togglePhone"
					},
					{
						icon: "/static/images/footer_share.png",
						text: "分享",
						func: "",
					}
				]
			}
		},
		methods: {
			//footerNav如果有事件的入口事件
			navAction(func) {
				this[func]();
			},
			togglePhone() {
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
			},
			//切换选项卡
			tabToggle(index) {
				this.tabIndex = index;
			}
		},
		onLoad() {
			//富文本转nodes数组
			this.rules.forEach((v,k)=> {
				parse(v.richText, (err, htmlNodes)=> {
					this.rules[k].richText = htmlNodes;
				});
			});
			parse(this.imageText, (err, htmlNodes)=> {
				this.imageText = htmlNodes;
			});
		}
	}
</script>

<style>

</style>
