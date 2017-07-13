<template>
	<div>
		<h1>过渡</h1>
		<h2>JS 控制过渡</h2>
		<div class="demo" style="margin-bottom:20px">
			<transition 
				@before-enter="beforeEnter" 
				@enter="Enter" 
				@leave="Leave"
				>
				<p v-show='isShow' class="ishow">js控制过渡</p>
			</transition>
			<button @click="isShow = !isShow">Toggle</button>
		</div>
		<div class="demo">
			<button @click="toggle = !toggle">Toggle</button>
			<transition name='toggle'>
				<p v-if='toggle'>Hello</p>
			</transition>
		</div>
		<div class="demo1">
			<button @click="demo1 = !demo1">demo1</button>
			<transition name='demo1'>
				<p v-if='demo1'>demo1</p>
			</transition>
		</div>
		<div class="demo2">
			<button @click="demo2 = !demo2">demo2</button>
			<transition name="demo2">
				<p v-if="demo2">demo2</p>
			</transition>
		</div>
		<div class="demo3">
			<h2>多个组件的过渡</h2>
			<div>
				<label><input type="radio" value="view-a" name='view' v-model="view">A</label>
				<label><input type="radio" value="view-b" name='view' v-model="view">B</label>
			</div>
			<transition name='view'>
				<div v-if="view === 'view-a'">
					<v-view :view='view'></v-view>
				</div>
				<div v-else>
					<v-view :view='view'></v-view>
				</div>
			</transition>
		</div>
		<div class="demo4">
			<h2>列表过渡</h2>
			<button @click="addList">AddList</button>
			<button @click="removeList">RemoveList</button>
			<transition-group name='list' tag='div'>
				<span v-for="(item,index) in items" v-bind:key="item" class="list-item">
 					{{ item }}
				</span>
			</transition-group>
		</div>
		<div class="demo5">
			<h2>列表位移过渡</h2>
			<button @click='randomArray'>random</button>
			<transition-group name='random' tag='div'>
				<li v-for='(item,index) in items' :key="item">{{item}}</li>
			</transition-group>
		</div>
		<div class="demo6">
			<h2>列表随机打乱</h2>
			<button @click='randomGrop' style="margin-bottom:10px">random</button>
			<transition-group name='grops' tag='div' class='div-group'>
				<span v-for='(group,index) in groups' class='group' :key="group">{{group}}</span>
			</transition-group>
		</div>
	</div>
</template>
<script>
import View from '@/components/View';
export default {
	data() {
		return {
			isShow: true,
			toggle: true,
			demo1: true,
			demo2: true,
			view:'view-a',
			items: [1,2,3,4,5,6,7,8,9],
			nextItem: 10,
			groups: [
			]
		}
	},
	components : {
		'v-view': View
	},
	methods: {
		beforeEnter: function(el) {
			$(el).css({
				left: '-500px',
				opacity: 0
			})
		},
		Enter: function(el, done) {
			$(el).animate({
				left: 0,
				opacity: 1
			},{
				duration: 1500,
				complete: done
			});
		},
		Leave: function(el, done) {
 			$(el).animate({
				left: "500px",
				opacity: 0
			},{
				duration: 1500,
				complete: done
			});
		},
		randomIndex: function() {
			return Math.floor(Math.random() * this.items.length);
		},
		addList: function() {
			this.items.splice(this.randomIndex(), 0, this.nextItem ++);
		},
		removeList: function() {
			this.items.splice(this.randomIndex(), 1);
		},
		random: function(arr){
			const length = arr.length;
			let array = [];
			for (var i = 0 ; i < length ; i ++ ){
				array.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
			}
			return array;
		},
		randomArray: function() {
			this.items = this.random(this.items);
		},
		randomGrop: function(){
			this.groups = this.random(this.groups)	
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			var arr = [];
			for(var i = 1; i < 100 ; i ++) {
			arr.push(i);
			}
			this.groups = arr;
		})
	}
}
</script>
<style scoped>
.ishow{
	position: absolute;
	left: 0px;
	top: 0px;
	margin-left: 500px;
}
.toggle-enter-active,
.toggle-leave-active{
	transition:opacity 0.5s;
}
.toggle-enter,
.toggle-leave-to{
	opacity: 0;
}
.demo1{
	overflow: hidden;
}
.demo1-enter-active,
.demo1-leave-active{
	transition: all 0.5s ease-in-out;
}
.demo1-enter,
.demo1-leave-to{
	-webkit-transform: translateX(10px);
	-ms-transform: translateX(10px);
	-o-transform: translateX(10px);
	transform: translateX(10px);
	opacity: 0;
}
.demo2-enter-active {
  animation: bounce-in 1s;
}
.demo2-leave-active {
  animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.view-enter-active,
.view-leave-active{
  transition: opacity .3s ease;
}
.view-enter, 
.view-leave-to{
  opacity: 0;
}
.list-item{
	display: inline-block;
	width: 30px;
	text-align: center;
	float: left;
}
.list-enter-active,
.list-leave-active{
	-webkit-transition: all 0.8s;
	-o-transition: all 0.8s;
	transition: all 0.8s;
}
.list-enter,
.list-leave-to{
	-webkit-transform: translateY(30px);
	-ms-transform: translateY(30px);
	-o-transform: translateY(30px);
	transform: translateY(30px);
	opacity: 0px;
}
.grops-move,
.random-move,
.list-move{
  transition: transform 1s;
}
.div-group{
	width: 369px;
}
.group{
	display: inline-block;
	width: 40px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	border: 1px solid #ccc;
	margin-left: -1px;
	margin-top: -1px;
}
</style>