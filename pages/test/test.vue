<template>
	<gracePage headerBG="#FFFFFF" :customHeader="false">
		<view slot="gBody" class="grace-body">
			<view class="grace-padding-top">
				<text class="grace-text lineH60">验证码已经发送到您的手机 \n</text>
				<text class="grace-text grace-bold grace-blue lineH60">181 **** 8888</text>
			</view>
			<view class="grace-number-inputs grace-margin-top">
				<view class="grace-number-input" @tap.stop="showKbd">{{vcode[0]}}</view>
				<view class="grace-number-input" @tap.stop="showKbd">{{vcode[1]}}</view>
				<view class="grace-number-input" @tap.stop="showKbd">{{vcode[2]}}</view>
				<view class="grace-number-input" @tap.stop="showKbd">{{vcode[3]}}</view>
				<view class="grace-number-input" @tap.stop="showKbd">{{vcode[4]}}</view>
				<view class="grace-number-input" @tap.stop="showKbd">{{vcode[5]}}</view>
			</view>
			<view class="grace-center grace-margin-top">
				<text class="grace-text grace-gray">请填写6位数字验证码</text>
				<text @tap="getVCode" class="grace-text" style="margin-left:10px; color:#3688FF;">{{vcodeBtnName}}</text>
			</view>
			<graceNumberKeyboard :isPoint="false" :show="graceNumberKeyboardShow" 
			v-on:keyboardDone="keyboardDone" v-on:keyboardInput="keyboardInput" v-on:keyboardDelete="keyboardDelete"></graceNumberKeyboard>
		</view>
	</gracePage>
</template>
<script>
import gracePage from "../../graceUI/components/gracePage.vue";
import graceNumberKeyboard from "../../graceUI/components/graceNumberKeyboard.vue";
export default {
    data() {
		return {
			vcode : ['','','','','',''],
			graceNumberKeyboardShow : true,
			vcodeBtnName: "",
			countNum : 120,
			countDownTimer : null
		};
    },
	onLoad() {
		// 倒计时 时间间隔自行设置
		this.countNum = 120;
		this.countDownTimer = setInterval(function(){this.countDown();}.bind(this), 1000);
	},
	methods:{
		showKbd : function(){ this.graceNumberKeyboardShow = true; },
		// 自动提交
		submitCode : function(){
			// 验证码保存在数组 vcode 中
			console.log(this.vcode.join(''));
			uni.showLoading({title:"提交..."});
			// 请自行完善验证码提交工作
			setTimeout(function(){uni.hideLoading();}, 2000);
		},
		// 监听输入
		keyboardInput : function(e){
			if(e == '.'){return ;}
			var code       =  this.vcode;
			var codeLength = 0;
			for(let i = 0; i < code.length; i++){
				codeLength = i + 1;
				if(code[i] === ''){code.splice(i, 1, e); break;}
			}
			this.vcode = code;
			if(codeLength >= 6){
				// 收起键盘
				this.graceNumberKeyboardShow = false;
				// 验证码提交
				this.submitCode();
			}
		},
		// 监听删除
		keyboardDelete : function(){
			for(let i = this.vcode.length - 1; i >= 0; i--){
				if(this.vcode[i] !== ''){
					this.vcode.splice(i,1, '');
					break;
				}
			}
		},
		// 完成事件
		keyboardDone : function(){
			this.graceNumberKeyboardShow = false;
		},
		// 发送验证码
		getVCode : function(){
			// 手机号码为 : 上一级页面已经获得了才能来到这里，利用url参数传递过来即可
			// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
			if (this.vcodeBtnName != '获取验证码' && this.vcodeBtnName != '重新发送'){return ;}
			this.vcodeBtnName =  "发送中...";
			// 与后端 api 交互，发送验证码 【自己写的具体业务代码】
			// 假设发送成功，给用户提示
			uni.showToast({ title: '短信已发送，请注意查收', icon : "none"});
			// 倒计时
			this.countNum = 120;
			this.countDownTimer = setInterval(()=>{this.countDown();}, 1000);
		},
		countDown : function(){
			if (this.countNum <= 1){
			  clearInterval(this.countDownTimer);
			  this.vcodeBtnName = "重新发送";
			  return ;
			}
			this.countNum--;
			this.vcodeBtnName =  this.countNum + '秒后重新发送';
		}
	},
	components:{gracePage, graceNumberKeyboard}
}
</script>
<style>
.lineH60{line-height:60rpx;}
.grace-number-inputs{display:flex; flex-wrap:nowrap; justify-content:center;}
.grace-number-input{width:80rpx; font-size:32rpx; font-weight:700; color:#A5A7B2; height:80rpx; text-align:center; line-height:80rpx; margin:10rpx; border:1px solid #D5D6D8; background-color:#FFFFFF; border-radius:10rpx;}
</style>

