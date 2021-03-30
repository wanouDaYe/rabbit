<template>
	<view class="group">
		<checkbox-group>
			<slot></slot>
		</checkbox-group>
	</view>
</template>

<script>
	export default {
		provide() {
			return {
				appCheckboxGroup: this
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">

</style>
