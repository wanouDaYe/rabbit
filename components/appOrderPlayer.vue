<template>
	<view class="app-player-list">
		<!--1对1-->
		<block v-if="playerNum == 1">
			<view class="app-order-row">
				<view class="app-player-li">
					<view class="app-player-item">
						<view class="app-ticket">
							<block v-for="(p,pk) in list1to1" :key="pk">
								<view v-if="p.ticketNumber > 0" class="app-ticket-player" @click="playerShow(pk)">{{p.name}}</view>
							</block>
							<view class="app-ticket-add" @click="playerShow">
								<image class="icon" src="@/static/images/icon_add.png"></image><view class="app-span">添加</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<!--1对多-->
		<block v-else>
			<block v-if="num > 0">
				<view class="app-order-row" v-for="v in num" :key="v">
					<view class="app-player-li">
						<label class="app-player-num">票{{v}}</label>
						<view class="app-player-item">
							<view class="app-ticket">
								<block v-for="(p,pk) in list1toN(v)" :key="pk">
									<view class="app-ticket-player" @click="playerShow(v)">{{p.name}}</view>
								</block>
								<!--<view class="app-ticket-player">哎哟哟</view>
								<view class="app-ticket-player">哎哟哟</view>-->
								<view v-for="(a,ak) in (playerNum-list1toN(v).length)" class="app-ticket-add" @click="playerShow(v)" :key="ak">
									<image class="icon" src="@/static/images/icon_add.png"></image><view class="app-span">添加</view>
								</view>
								<!--<view class="app-ticket-add">
									<image class="icon" src="@/static/images/icon_add.png"></image><view class="app-span">添加</view>
								</view>-->
							</view>
						</view>
					</view>
				</view>
			</block>
		</block>
		<appPopPlayerList ref="player"
			:list="selectPlayers"
			:max="max"
			:tKey="selectKey"
			@playerSelect="playerSelect"
		></appPopPlayerList>
	</view>
</template>

<script>
	import appPopPlayerList from './appPopPlayerList.vue';
	
	export default {
		components: {
			appPopPlayerList
		},
		props: {
			num: {
				type: Number
			},
			uid: {
				type: String
			}
		},
		data() {
			return {
				//每张票对应的玩家数
				playerNum: 1,
				//游玩人列表
				players: [{
					id: 'sdhjfhs12313',
					ticketNumber: -1,		//-1未选择； >0 票号
					name: '张三',
					phone: '198****1989',
					cardType: '身份证',
					cardId: '513*************49'
				}, {
					id: 'aaaa1347483',
					ticketNumber: -1,
					name: '李四',
					phone: '198****1989',
					cardType: '身份证',
					cardId: '513*************49'
				},{
					id: 'sbbbdhjfhs12313',
					ticketNumber: -1,
					name: '张三sa',
					phone: '198****1989',
					cardType: '身份证',
					cardId: '513*************49'
				}, {
					id: 'abbbbaaa1347483',
					ticketNumber: -1,
					name: '李四b',
					phone: '198****1989',
					cardType: '身份证',
					cardId: '513*************49'
				},{
					id: 'zzzhs12313',
					ticketNumber: -1,
					name: '张三uuu',
					phone: '198****1989',
					cardType: '身份证',
					cardId: '513*************49'
				}, {
					id: 'yyyya1347483',
					ticketNumber: -1,
					name: '李四ya',
					phone: '198****1989',
					cardType: '身份证',
					cardId: '513*************49'
				}],
				//当前票可选的游玩人列表
				selectPlayers: [],
				//当前操作的票key
				selectKey: -1,
			};
		},
		computed: {
			//1对1的选中列表
			list1to1() {
				let _list = this.$global.copyObj(this.players);
				_list.sort(function(v1,v2) {
					return v2.ticketNumber - v1.ticketNumber;
				});
				
				return _list;
			},
			//最大选择数
			max() {
				return this.selectKey == -1 ? this.$props.num : this.playerNum;
			},
		},
		watch: {
			
		},
		methods: {
			//1对多的选中列表 n为票号
			list1toN(n) {
				let _list = this.$global.copyObj(this.players),
					_res = [];
				_list.forEach(v=>{
					if(v.ticketNumber == n) _res.push(v);
				});
				return _res;
			},
			//1对多可选列表
			optionalList(tKey = -1) {
				let _list = this.$global.copyObj(this.players),
					_res = [];
					
				_list.forEach(v=>{
					if(v.ticketNumber == -1 || v.ticketNumber == tKey) _res.push(v);
				});
				return _res;
			},
			//游玩人显示
			playerShow(tKey = -1) {
				let _list;
				if(this.playerNum > 1) {
					this.selectKey = tKey;
					_list = this.optionalList(tKey);
					_list.forEach(v=>{
						v.active = v.ticketNumber == tKey ? true : false;
					});
				}else {
					_list = this.list1to1;
					_list.forEach(v=>{
						v.active = v.ticketNumber == 1 ? true : false;
					});
				}
				this.selectPlayers = _list;
				this.$refs.player.showToggle();
			},
			//游玩人选择
			playerSelect(arr, tKey) {
				if(this.playerNum > 1) {	//1对多添加选中
					let _list = this.optionalList(tKey),
						_ids = [];
					_list.forEach(l=>{
						_ids.push(l.id);
					});
					this.players.forEach(p=>{
						if(_ids.indexOf(p.id) >= 0) {
							p.ticketNumber = arr.indexOf(p.id) >= 0 ? tKey : -1;
						}
					});
				}else {	//1对1添加选中
					this.players.forEach(p=>{
						p.ticketNumber = arr.indexOf(p.id) >= 0 ? 1 : -1;
					});
				}
			}
		}
	}
</script>

<style lang="less" scoped>
@import "@/common/less/app3.less";

.app-player {
	&-li {
		width: 100%;
	}
}
.app-ticket {
	flex-wrap: wrap;
	.flex-align-center();
	&-player, &-add {
		text-align: center;
		flex-shrink: 0;
		width: 180rpx;
		height: 96rpx;
		line-height: 96rpx;
		margin-right: 20rpx;
		border: solid 1px;
		border-radius: 8rpx;
		font-size: @size-normal;
		margin-top: 20rpx;
	}
	&-add {
		border-color: #dcdcdc;
		.flex-align-center();
		.icon {
			display: inline-block;
			margin-left: auto;
		}
		.app-span {
			margin-right: auto;
			margin-left: 8rpx;
			color: @fg-theme;
		}
	}
	&-player {
		border-color: @fg-theme;
		color: @color-font;
		background: @fg-theme-light;
	}
}
</style>
