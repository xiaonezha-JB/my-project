<template>
  <div>
    <!-- 头部 -->
    <div class="head">
      <!-- 头部背景 -->
      <div class="background">
        <image src="../../static/images/bj.png"></image>
      </div>
      <!-- 头像 -->
      <div class="picture_frame">
        <div class="picture">
          <open-data type="userAvatarUrl"></open-data>
        </div>
        <div class="name">
          <open-data type="userNickName"></open-data>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 展示内容--我的积分 generalize -->
      <div class="content-box" @click="getIntegral">
        <!-- 图标 -->
        <div class="integral-box">
          <image src="../../static/images/integral.png"></image>
        </div>
        <!-- 文字 -->
        <div class="integral-word">
          <span>我的积分</span>
          <span>{{meList.score}}&nbsp;&nbsp;<i class="iconfont icon-dayuhao"></i></span>
        </div>
      </div>
      <!-- 我的订单 -->
      <div class="content-box" @click="getOrder">
        <!-- 图标 -->
        <div class="integral-box">
          <image src="../../static/images/form.png"></image>
        </div>
        <!-- 文字 -->
        <div class="integral-word">
          <span>我的订单</span>
          <span><i class="iconfont icon-dayuhao"></i></span>
        </div>
      </div>
      <!-- 我的收藏 -->
      <div class="content-box" @click="getCollect">
          <!-- 图标 -->
          <div class="integral-box">
            <image src="../../static/images/collect.png"></image>
          </div>
          <!-- 文字 -->
          <div class="integral-word">
            <span>我的收藏</span>
            <span><i class="iconfont icon-dayuhao"></i></span>
          </div>
      </div>
      <!-- 我的推广 -->
      <div class="content-box" @click="getGeneralize">
        <!-- 图标 -->
        <div class="integral-box">
          <image src="../../static/images/share.png"></image>
        </div>
        <!-- 文字 -->
        <div class="integral-word">
          <span>我的推广</span>
          <span><i class="iconfont icon-dayuhao"></i></span>
        </div>
      </div>
      <!-- 设置 -->
        <div class="content-box">
          <!-- 图标 -->
          <div class="integral-box">
            <image src="../../static/images/fit.png"></image>
          </div>
          <!-- 文字 -->
          <div class="integral-word">
            <span>设置</span>
            <span><i class="iconfont icon-dayuhao"></i></span>
          </div>
        </div>
      <!-- 我的客服 -->
      <div class="content-box">
        <!-- 图标 -->
        <div class="integral-box">
          <image src="../../static/images/customer.png"></image>
        </div>
        <!-- 文字 -->
        <div class="integral-word" @click="getTel">
          <span>我的客服</span>
          <div class="telephone">
            <p>{{meList.phone}}</p>
            <p>8:00-6:00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/myrequest.js'
export default {
  data() {
    return {
      meList: {
        phone: ''
      },
      token: ''
    }
  },
  methods: {
    getData() {
      this.token = wx.getStorageSync('token') || {} 
      request.get('/mine/index', {
        token: this.token
      }).then(res => {
        this.meList = res.data.data.member
      })
    },
    // 拨打电话
    getTel () {
      var that = this
      wx.showModal({
        title: '提示',
        content: '是否拨打客服电话',
        success (res) {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: that.meList.phone
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // 跳转积分页
    getIntegral () {
      wx.navigateTo({
        url: '/pages/integral/main'
      })
    },
    // 跳到我的订单
    getOrder() {
      wx.switchTab({
        url: '/pages/order/main'
      })
    },
    // 跳到我的收藏
    getCollect() {
      wx.navigateTo({
        url: '/pages/collect/main'
      })
    },
    // 跳到我的推广
    getGeneralize() {
      wx.navigateTo({
        url: '/pages/generalize/main'
      })
    }
  },
  onLoad() {
    this.getData()
  },
  mounted() {
  }
}
</script>

<style scoped lang="sass">
@import 'me.scss';
@import '../../../static/iconfont-1/iconfont.css'
</style>
