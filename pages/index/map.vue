<template>
	<view>
		<map :style="{'height': screenHeight+'px'}" :longitude="longitude" :latitude="latitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: uni.getSystemInfoSync().screenHeight,
				longitude: 103.834036,	//经度
				latitude: 30.055428,	//纬度
				name: '时代广场',		//地点名
				markers: [{
					"id": 74,
					"latitude": 30.055428,
					"longitude": 103.834036,
					"iconPath":"/static/images/address_icon.png",
					"width": 21,
					"height": 21,
					"callout": {
						"title": "时代广场",
						"content": "时代广场",
						"color":"#2E9AFE", 
						"borderRadius":10,
						"display": "block",
						"padding":"12",
						"bgColor": "#fff"
					}
				}]		
			}
		},
		methods: {
			
		},
		onLoad(option) {			
			uni.setNavigationBarTitle({
				title: this.name
			})
			
		}
	}
</script>

<style>
	map {
		width: 750rpx;
	}
</style>
