<template>
	<div class="slide-show" @mouseover="clearSlideTimer" @mouseout="invGo">
		<div class="slide-img">
			<a :href="slides[nowIndex].href">
				<transition name="slide-trans">
		          <img v-if="isShow" :src="slides[nowIndex].src">
		        </transition>
		        <transition name="slide-trans-old">
		          <img v-if="!isShow" :src="slides[nowIndex].src">
		        </transition>
			</a>
			<h2>{{slides[nowIndex].title}}</h2>
			<ul class="slide-pages">
				<li @click="goto(preIndex)">&lt;</li>
				<li v-for='index in slides.length' :key="index">
					<a :class="{on:index - 1 === nowIndex}" @click="goto(index - 1)">{{index}}</a>
				</li>
				<li @click="goto(nextIndex)">&gt;</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		slides: {
			type: Array,
			default() {
				return []
			}
		},
		invTime: {
			type: Number,
			default() {
				return 3000
			}
		}
	},
	data() {
		return {
			nowIndex: 0,
			isShow: true
		}
	},
	computed: {
		preIndex() {
			if (this.nowIndex - 1 < 0) {
				return this.slides.length - 1;
			}
			return this.nowIndex - 1;
		},
		nextIndex() {
			if (this.nowIndex + 1 > this.slides.length - 1) {
				return 0;
			}
			return this.nowIndex + 1;
		}
	},
	methods: {
		goto(index) {
			this.isShow = false
			setTimeout(() => {
				this.isShow = true
				this.nowIndex = index
				this.$emit('onChange', index);
			}, 10)
		},
		invGo() {
			this.slideTimer = setInterval(()=>{
				this.goto(this.nextIndex);
			}, this.invTime);
		},
		clearSlideTimer() {
			clearInterval(this.slideTimer);
		}
	},
	mounted() {
		this.invGo();
	}
}
</script>
<style scoped>
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(100%);
}
.slide-trans-old-leave-active {
  transition: all .5s;
}
.slide-trans-old-leave-to{
   transform: translateX(-100%);
}
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}
.slide-img a{
	display: inline-block;
	width: 100%;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  text-indent: 15px;
  line-height: 30px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
}
</style>