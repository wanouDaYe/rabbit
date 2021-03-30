<template>
	<view class="app-radio" :class="{'checked':check}" @click="change">
		<image class="app-radio-icon" src="@/static/images/icon_agree.png"></image>
	</view>
</template>

<script>
	export default {
		name:"appRadio",
		props: {
			checked: String
		},
		watch: {
			checked(newVal) {
				this.check = newVal;
			}
		},
		data() {
			return {
				check: true
			};
		},
		mounted() {
			this.check = this.$props.checked;
		},
		methods: {
			change() {
				this.$emit('change',this.check);
			}
		}
	}
</script>

<style lang="less">
@import "@/common/less/config.less";
	.app-radio {
		box-sizing: border-box;
		width: 32rpx;
		height: 32rpx;
		border: solid 1px rgb(187,187,187);
		border-radius: 50%;
	}
	.app-radio.checked {
		border: none;
		.app-radio-icon {
			display: block;
		}
	}
	.app-radio-icon {
		width: 32rpx;
		height: 32rpx;
		display: none;
	}
</style>
