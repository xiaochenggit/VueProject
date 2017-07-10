<template>
	<div class="if">
		<div v-if="loginType === 'userName'">
			<label>Username</label>
  			<input placeholder="Enter your username" key='userName-input'>
		</div>
		<div v-else>
			<label>Email</label>
  			<input placeholder="Enter your email address" key='userEamil-input'>
		</div>
		<button @click="changeLoginType">changeLoginType</button>
		<h2>另一个用于根据条件展示元素的选项是 v-show 指令。用法大致一样：</h2>
		<div>
			<span v-show="loginType === 'userName'">userName</span>
			<span v-show="loginType === 'userEamil'">userEamil</span>
		</div>
		<h2>我们用 v-for 指令根据一组数组的选项列表进行渲染。 v-for 指令需要以 item in items 形式的特殊语法， items 是源数据数组并且 item 是数组元素迭代的别名。</h2>
		<ul>
			<li v-for="(item, index) in items">
				{{parentMessage}}-{{index}}-{{item.message}}
			</li>
		</ul>
		<h2>对象迭代 v-for</h2>
		<ul>
			<li v-for="(value, key, index) in objMessage">
				{{index}}-{{key}}-{{value}}
			</li>
		</ul>
		<h2>整数迭代</h2>
		<ul>
			<li v-for="num in 10">
				{{num}}
			</li>
		</ul>
		<h2>一个简单的todoList</h2>
		<div>{{todos}}</div>
		<v-todoList :todos='todos'></v-todoList>
		<v-todoList :todos='todos'></v-todoList>
		<h2>显示过滤排序结果</h2>
		<ul>
			<li v-for="item in even(numbers)">{{item}}</li>
		</ul>
		<h2>监听事件 v-on</h2>
		<div>
			<button @click="count += 1">点击</button>
			<p>按钮已经点击 {{count}}</p>
		</div>
		<h2>方法事件处理器</h2>
		<div>
			<button @click="great">Click</button>
		</div>
		<h2>内联处理器方法</h2>
		<div>
			<button @click.once="say('Hi')">say Hi</button>
			<button @click="say('Hello')">say Hello</button>
		</div>
		<h2>复选框</h2>
		<div>
			<input type="checkbox" id="checkbox" v-model='checked'>
			<label for="checkbox">{{ checked }}</label>
		</div>
		<h2>多个勾选框，绑定到同一个数组：</h2>
		<div>
			<label><input type="checkbox" value="Jack" v-model="checkedNames">Jack</label>
			<label><input type="checkbox" value="XiaoCheng" v-model="checkedNames">xiaocheng</label>
			<label><input type="checkbox" value="ZhaoQiang" v-model="checkedNames">zhaoqiang</label>
			<p>{{checkedNames}}</p>
		</div>
		<h2>单选按钮</h2>
		<div>
			<label><input type="radio" value="One" v-model="picked">one</label>
			<label><input type="radio" value="Two" v-model="picked">two</label>
			<p>picked{{picked}}</p>
		</div>
		<h2>选择列表</h2>
		<div>
			<select v-model='selected' multiple >
				<option disabled value="">请选择</option>
				<option value="A">A</option>
				<option value="B">B</option>
				<option value="C">C</option>
			</select>
			<p>selected {{selected}}</p>
		</div>	
	</div>
</template>
<script>
import todoList from '@/components/todoList.vue';
export default {
	name: 'if',
	data () {
		return {
			checked: false,
			checkedNames: ['Jack'],
			picked: 'Two',
			selected: ['B'],
			loginType: 'userName',
			parentMessage: 'Parent',
			items: [{
				message: 'One'
			},{
				message: 'Two'
			}],
			objMessage: {
				firstName: 'xiao',
				lastName: 'cheng',
				age: 24
			},
			todos: ['曾经想征服全世界','全部都是你','那些年错过的大雨'],
			numbers: [1,2,3,4,5],
			count: 0,
			name: 'xiaocheng'
		}
	},
	methods: {
		changeLoginType: function() {
			this.loginType = this.loginType === 'userName' ? 'userEamil' : 'userName';
		},
		even: function(numbers) {
			return numbers.filter( function(item) {
				return item % 2 === 0;
			})
		},
		great: function(event) {
			alert('Hello ' + this.name);
			if (event) {
				alert(event.target.tagName);
			}
		},
		say: function(message) {
			alert('说： ' + message);
		}
	},
	components: {
		'v-todoList': todoList
	}
}
</script>
<style scoped>
	
</style>