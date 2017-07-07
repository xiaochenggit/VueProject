<template>
	<div class="hi">
		<h1 v-bind:title="msg">{{ msg }}</h1>
		<div>{{ articles }}</div>
		<h2>v-if 显示/不显示</h2>
		<div v-if='isSeen'>正在加载请稍候...</div>
		<h2>v-for 循环</h2>
		<ul>
			<li v-for="todo in todos">{{todo.text}}</li>
		</ul>
		<h2>v-on 绑定事件 列子 v-on:click</h2>
		<div><button v-on:click="reverseMsg">反转数据</button></div>
		<h2>v-model 双向数据绑定</h2>
		<div><input type="text" v-model="msg"></div>
		<h2>通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上所有的数据绑定：</h2>
		<p v-once>数据是：{{msg}}</p>
		<h2>双大括号会将数据解释为纯文本，而非 HTML 。为了输出真正的 HTML ，你需要使用 v-html 指令：</h2>
		<div v-html="htmlStr"></div>
		<h2>v-bind:disabled</h2>
		<div><button v-bind:disabled='isButtonDisabled'>按钮</button></div>
		<h2>使用 javascript 表达式</h2>
		<div> {{ msg.split("").reverse().join('') }}</div>
		<div v-bind:id="'list' + id ">另一种添加 id 的写法  javascript</div>
		<div> v-bind:href </div>
		<div><a target="_blank" :href="href">多趣</a></div>
		<h2>filters 过滤</h2>
		<p>{{ string | capitalize}}</p>
		<h2> computed 实时计算</h2>
		<p>{{reversedMessage}}</p>
		<p>{{now}}</p>
		<h2>computed vs watched</h2>
		<div>
			姓氏<input v-model='firstName'/> 名<input v-model="lastName"/>
			<p>{{fullName}}</p>
		</div>
		<h2>计算 setter </h2>
		<div><button v-on:click="changeName('zhao qiang')">改名</button></div>
	</div>
</template>
<script>
export default {
	name: 'Hi',
	data () {
		return {
			msg: '一些简单的指令',
			articles: '我是纯文字',
			isSeen: true,
			todos: [
		      { text: '学习 JavaScript' },
		      { text: '学习 Vue' },
		      { text: '整个牛项目' }
		    ],
		    htmlStr: "<div class='div'>div</div>",
		    isButtonDisabled: true,
		    id: 'xiao',
		    href: 'http://www.duoqu.com',
		    string: 'xiaocheng',
		    firstName: 'xiao',
		    lastName: 'cheng'
		}
	},
	methods: {
		reverseMsg: function() {
			this.msg = this.msg.split("").reverse().join("");
		},
		changeName: function(value) {
			return this.fullName = value;
		}
	},
	computed: {
		reversedMessage: function() {
			return this.msg.split("").reverse().join("");
		},
		now: function() {
			return Date.now();
		},
		fullName: {
			get: function() {
				return this.firstName + this.lastName;
			},
			set: function(value){
				const name = value.split(' ');
				this.firstName = name[0];
				this.lastName = name[1];
			}
		}
	},
	filters: {
		capitalize: function(value) {
			if (!value) {
				return ''
			}
			value = value.toString();
			return value.charAt(0).toUpperCase() + value.slice(1);
		}
	},
	mounted () {
	    setTimeout(()=>{
	    	this.isSeen = false;
	    }, 3000);
	}
} 
</script>
<style scoped>
	
</style>