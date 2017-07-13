<template>
	<div class="price">
		<label>$<input type='text' @keyup="change" @blur="overFormat" ref="input"></input></label>
	</div>
</template>
<script>
export default {
	data() {
		return{
		}
	},
	methods: {
		change: function(event){
			var event = event || window.event;  
	        var code = event.keyCode;  
	        if(navigator.userAgent.indexOf("Firefox")>-1){  
	            code = event.which;  
	        }  
	        if(code == 37 || code ==39) return;  
	        var regStrs = [  
	            ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0  
	            ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点  
	            ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点  
	            ['^(\\d+\\.\\d{2}).+', '$1'], //禁止录入小数点后两位以上  
	            ['^(\\.\\d+)','$1']//禁止输入情况下小数点出现在首位  
	        ];  
	        for (var i = 0; i < regStrs.length; i++) {  
	            var reg = new RegExp(regStrs[i][0]);  
	            this.$refs.input.value = this.$refs.input.value.replace(reg, regStrs[i][1]);
	        }  
		},
		overFormat: function(){
			var v = this.$refs.input.value;  
	        if (v === '') {  
	            v = '0.00';  
	        } else if (v === '0') {  
	            v = '0.00';  
	        } else if (v === '0.') {  
	            v = '0.00';  
	        } else if (/^0+\d+\.?\d*.*$/.test(v)) {  
	            v = v.replace(/^0+(\d+\.?\d*).*$/, '$1');  
	            v = inp.getRightPriceFormat(v).val;  
	        } else if (/^0\.\d$/.test(v)) {  
	            v = v + '0';  
	        } else if (!/^\d+\.\d{2}$/.test(v)) {  
	            if (/^\d+\.\d{2}.+/.test(v)) {  
	                v = v.replace(/^(\d+\.\d{2}).*$/, '$1');  
	            } else if (/^\d+$/.test(v)) {  
	                v = v + '.00';  
	            } else if (/^\d+\.$/.test(v)) {  
	                v = v + '00';  
	            } else if (/^\d+\.\d$/.test(v)) {  
	                v = v + '0';  
	            } else if (/^[^\d]+\d+\.?\d*$/.test(v)) {  
	                v = v.replace(/^[^\d]+(\d+\.?\d*)$/, '$1');  
	            } else if (/\d+/.test(v)) {  
	                v = v.replace(/^[^\d]*(\d+\.?\d*).*$/, '$1');  
	                ty = false;  
	            } else if (/^0+\d+\.?\d*$/.test(v)) {  
	                v = v.replace(/^0+(\d+\.?\d*)$/, '$1');  
	                ty = false;  
	            } else {  
	                v = '0.00';  
	            }  
	        }  
	        this.$refs.input.value = v;
	        this.$emit('changeprice',v);
		}
	}
}
</script>
<style scoped>
	
</style>