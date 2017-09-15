<template>
  <div class="main">
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="addressPage">
      <div class="public">
        <div class="left address-nav">
          <ul>
            <h2>设置</h2>
            <li>用户信息</li>
            <li>账户安全</li>
          </ul>
        </div>
        <div class="right address-body">
          <div class="address-com address-header">
            <button class="btn">新增收货地址</button>
             您已创建<span>{{this.addressList.length}}</span>个收货地址 , 最多可创建20个
          </div>
          <div class="address-list">
            <ul>
              <li v-for="(item,index) in addressListFilter" :key="index" :class="['item',{'on': addressIndex == index }]" @click="changeAddressIndex(index)">
                <span class="iconfont icon-close" @click.stop="delAddressConfirm(item.addressId)"></span>
                <h2 class="des">{{item.des}}
                  <span v-if="item.checked">默认地址</span>
                </h2>
                <div class="item-div">
                  <label>收货人：</label>{{ item.userName }}
                </div>
                <div class="item-div">
                  <label>所在地区：</label>{{ item.location }}
                </div>
                <div class="item-div">
                  <label>地址：</label>{{ item.address }}
                </div>
                <div class="item-div">
                  <label>手机：</label>{{ item.phone }}
                </div>
                <div class="item-div">
                  <label>固定电话：</label>{{ item.tel }}
                </div>
                <div class="item-div">
                  <label>电子邮箱：</label>{{ item.email }}
                </div>
                <div class="btn-group">
                  <button class="btn" v-if="!item.checked" @click.stop="setDefaultChecked(item.addressId)">设为默认</button>
                  <button class="btn">编辑</button>
                </div>
              </li>
              <div class="tip" v-if="addressList.length > defaultlimit">
                <button class="btn"  @click="limitSwitch">
                  MORE<span :class="['iconfont', 'icon-spread-up', {'icon-zhankai': addressListFilter.length > defaultlimit }]"></span>
                </button>
              </div>
            </ul>
          </div>
          <div class="address-com address-footer">
            <button class="btn">新增收货地址</button>
             您已创建<span>{{this.addressList.length}}</span>个收货地址 , 最多可创建20个
          </div>
        </div>
      </div>
      <vue-model :message='ModelMessage' :isShow='isModel' @close='isModel = false'>
      </vue-model>
      <vue-model :message='delAddressMessage' :isShow='IsDelAddressModel' @close='IsDelAddressModel = false' :isTimer='false'>
        <div class="btngroup" slot="btngroup">
          <button class="btn" @click="delAddress">确认</button>
          <button class="btn cancel right" @click="IsDelAddressModel = false" >取消</button>
        </div>
      </vue-model>
    </div>     
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from '@/components/Header'
import NavFooter from '@/components/Footer'
import NavBread from '@/components/Bread'
import VueModel from '../components/Model'
import axios from 'axios'
export default {
  name: 'Address',
  data () {
    /**
     * {Array} addressList 所有地址数组
     * {Number} defaultlimit 默认显示条目
     * {Number} limitNum 当前显示条目 默认值与默认显示条目一样
     * {Number} addressIndex 地址选择下标
     * {Number} delAddressId 删除地址下标
     * {String} delAddressMessage 删除地址所弹出的信息
     * {Boolean} IsDelAddressModel 删除地址确认弹框控制器
     * {String} ModelMessage 普通弹窗信息
     * {Boolean} isModel 普通弹窗控制器
     */
    return {
      addressList: [],
      defaultlimit: 3,
      limitNum: 3,
      addressIndex: 0,
      delAddressId: 0,
      delAddressMessage: '你确定要删除此地址吗？',
      IsDelAddressModel: false,
      ModelMessage: '',
      isModel: false
    }
  },
  computed: {
    // 显示地址数组
    addressListFilter () {
      return this.addressList.slice(0, this.limitNum)
    }
  },
  methods: {
    // 获取地址数组
    getAddressList () {
      axios.get('/users/address').then(res => {
        let resData = res.data
        if (resData.status === 200) {
          this.addressList = this.sortAddress(resData.result)
        } else {
          this.isModel = true
          this.ModelMessage = resData.msg
        }
      })
    },
    // address排序 默认地址排在第一个
    sortAddress (addressList) {
      addressList.forEach((item, index) => {
        if (item.checked) {
          let list = addressList.splice(index, 1)
          addressList.unshift(list[0])
        }
      })
      return addressList
    },
    // 展开 , 收起
    limitSwitch () {
      if (this.addressListFilter.length <= this.defaultlimit) {
        this.limitNum = this.addressList.length
      } else {
        this.limitNum = this.defaultlimit
      }
    },
    // 设置默认地址 参数地址id
    setDefaultChecked (addressId) {
      axios.post('/users/address/setdefault', {
        addressId
      }).then(res => {
        if (res.data.status === 200) {
          this.getAddressList()
        }
      })
    },
    // 删除地址确认弹框 参数地址id
    delAddressConfirm (addressId) {
      this.delAddressId = addressId
      this.IsDelAddressModel = true
    },
    // 删除地址
    delAddress () {
      this.IsDelAddressModel = false
      axios.post('/users/address/delete', {
        addressId: this.delAddressId
      }).then(res => {
        let resData = res.data
        if (resData.status === 200) {
          this.getAddressList()
        } else {
          this.ModelMessage = resData.msg
          this.isModel = true
        }
      })
    },
    // 改变所选地址下标
    changeAddressIndex (index) {
      this.addressIndex = index
    }
  },
  mounted () {
    this.getAddressList()
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    VueModel
  }
}
</script>
<style scoped>
  .addressPage {
    padding: 1rem 0px;
    background-color: #f3f3f3;
    overflow: hidden;
  }
  .address-nav {
    width: 12rem;
  }
  .address-body {
    box-sizing: border-box;
    padding: 1rem;
    background-color: #fff;
    width: calc(100% - 12rem)
  }
  .address-com {
    line-height: 1.8rem;
    color: #000;
  }
  .address-com .btn {
    background-color: #f5fbef;
    padding: 0 2rem;
    background-image: linear-gradient(to bottom,#f5fbef 0,#eaf6e2 100%);
    border: 1px solid #bfd6af;
    border-radius: 0.2rem;
    margin-right: 1rem;
  }
  .address-list {
    margin-bottom: 0.5rem;
  }
  .address-list .item{
    cursor: pointer;
    border: 2px solid #ccc;
    padding: 1rem;
    margin-top: 0.5rem;
    position: relative;
  }
  .address-list .item.on{
    border-color: #f60;
  }
  .address-list .item .des{
    margin: 0.5rem 0;
    line-height: 1.4rem;
  }
  .address-list .item .des span {
    display: inline-block;
    margin-left: 1rem;
    font-weight: 200;
    padding: 0 1rem;
    color: #fff;
    background-color: #f60;
    border-radius: 0.2rem;
  }
  .address-list .item .icon-close {
    position: absolute;
    right: 1rem;
    cursor: pointer;
    color: #ccc;
  }
  .item-div {
    line-height: 1.4rem;
    width: 40rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .item-div label {
    width: 4rem;
    display: inline-block;
    text-align: right;
    color: #999;
  }
  .address-list .item .btn-group {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
  .address-list .item .btn-group .btn:hover {
    color: red;
  }
  .tip {
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    line-height: 2.4rem;
  }
  .tip .btn {
    cursor: pointer;
    color: #f60;
  }
</style>
