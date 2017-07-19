<template>
	<div class="selection-component" >
		<div class="selection-show" @click.stop='toggleDrop'>
			<span>{{selections[nowIndex].label}}</span>
			<div class="arrow" v-if="selections.length > 1"></div>
		</div>
		<transition name='drop'>
      <div class="selection-list" v-if="isDrop&& selections.length > 1">
        <ul>
          <li v-for='(item,index) in selections' 
          @click="changeIndex(index)" >
          {{item.label}}
          </li>
        </ul>
      </div>  
    </transition> 
	</div>
</template>
<script>
import {bus} from '../../bus';
	export default {
		props: {
			selections: {
				type: Array,
				default() {
					return [{
						"label": 'text',
						"value": 0
					}]
				}
			},
      typeName: {
        type: String,
        default() {
          return "1"
        }
      }
		},
		data() {
			/**
			 * @param {Number} nowIndex 当前选项 默认 0 
       * @param {Boolean} isDrop 下拉框隐藏状态 默认 false(隐藏) 
			 */
			return {
				nowIndex: 0,
        isDrop: false
			}
		},
    watch: {
      // 路由变化重置参数
      "$route.params"() {
        this.nowIndex = 0;
        this.isDrop = false;
      }
    },
    methods: {
      /**
       * [changeIndex 改变当前选项 并且隐藏下拉框然后传值]
       */
      changeIndex(index) {
        this.nowIndex = index;
        this.$emit('on-change', this.typeName, this.nowIndex);
      },
      /**
       * [toggleDrop 切换下拉框隐藏状态]
       */
      toggleDrop() {
        this.isDrop = !this.isDrop;
      }
    },
    mounted() {
      bus.$on('resetComponent',() => {
        this.isDrop = false;
      })
    }
	}
</script>
<style scoped>
.drop-enter-active,
.drop-leave-active{
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}
.drop-enter,
.drop-leave-to{
  opacity: 0.2;
}
.selection-component {
  position: relative;
  display: inline-block;
}
.selection-show {
  border: 1px solid #e3e3e3;
  padding: 0 20px 0 10px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  border-radius: 3px;
  background: #fff;
}
.selection-show .arrow {
  display: inline-block;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #e3e3e3;
  width: 0;
  height: 0;
  margin-top: -1px;
  margin-left: 6px;
  margin-right: -14px;
  vertical-align: middle;
}
.selection-list {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 25px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  z-index: 5;
}
.selection-list li {
  padding: 5px 15px 5px 10px;
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  cursor: pointer;
  background: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}
.selection-list li:hover {
  background: #e3e3e3;
}
</style>