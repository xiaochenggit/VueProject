<template>
	<div class="login-form" @click.stop="">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" 
          v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error" v-if='!userErrors.status'>{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" 
          v-model="passwordModel" placeholder="请输入密码" @keydown.enter='onLogin'>
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p v-if='errorText'>{{ errorText }}</p>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			usernameModel: '',
			passwordModel: '',
			errorText: ''
		}
	},
	computed: {
		userErrors() {
			let errorText = '' , status = true;
			if (!/@/g.test(this.usernameModel)) {
				errorText = '没有 @ 符号！';
				status = false;
			}
			if (!this.userFlag) {
				errorText = '';
				this.userFlag = true;
			}
			return {
				errorText,
				status
			}
		},
		passwordErrors() {
			let errorText = '', status = true;
			if (this.passwordModel.length < 8) {
				errorText = '密码不能小于8位！';
				status = false;
			}
			if (!this.passwordFlag) {
				errorText = '';
				this.passwordFlag = true;
			}
			return {
				errorText,
				status
			}
		}
	},
	methods: {
		onLogin() {
			if (!this.userErrors.status || !this.passwordErrors.status) {
				this.errorText = '请输入正确的账号或密码！'
			} else {
				this.errorText = '';
				this.$http.post('/api/login')
				.then((data) => {
					// 发送登录用户数据
					this.$emit('onLogin', data.body);
					// 关掉登录弹窗
					this.$emit('dialogClose','isLoginDialog');
				}, (error) => {
					console.log(error);
				})
			}
		}
	}
}
</script>