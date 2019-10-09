<template>
  <div>
    <!-- 头部 -->
    <div class="head">
      <!-- 头部文字盒子 -->
      <div class="top_box clearfix">
        <div class="word">
          <p>待支付</p>
          <p>订单超过30分钟自动取消,请在20分18秒内完成支付</p>
        </div>
      </div>
      <!-- 中间内容盒子 -->
      <div class="middle_box">
        <!-- 灰色线条 -->
        <div class="gray_box"></div>
        <!-- 内容展示 -->
        <div class="content_box">
          <!-- 图片 -->
          <div class="img_left">
            <image v-if="orderList.picture" :src="'https://xcx.youngsay.net/'+orderList.picture"></image>
          </div>
          <!-- 文字 -->
          <div class="word_right">
            <p>{{orderList.activity_name}}</p>
            <p>数量:1</p>
            <p>总价:¥{{orderList.total}}</p>
          </div>
        </div>
      </div>
      <!-- 底部空盒子 -->
      <div class="bottom_box"></div>
    </div>
    <!-- 中间 -->
    <div class="centre">

      <!-- 活动详情 -->
      <div class="activity_centre">

        <!-- 活动标题 -->
        <div class="activity_headline">

          <!-- 图标 -->
          <div class="huodong">
            <image class="huodong_img" src='../../static/images/huodong.png'></image>
          </div>

          <!-- 标题文字 -->
          <div class="headline_word">活动详情</div>

        </div>
        <!-- 活动介绍 -->
        <div class="content_word">
          <p>单人活动
            <span class="word_one">(1位)</span>
          </p>
          <p>备注:</p>
          <p>活动卷:&nbsp;11:30-14:00,17:30-21:00</p>
          <p>仅可使用1次，不可重复使用</p>
        </div>

      </div>
      <!-- 线条 -->
      <div class="line"></div>

      <!-- 商家信息 -->
      <div class="activity_centre">

        <!-- 活动标题 -->
        <div class="activity_headline">

          <!-- 图标 -->
          <div class="huodong">
            <image class="huodong_img" src='../../static/images/shangjia.png'></image>
          </div>

          <!-- 标题文字 -->
          <div class="headline_word">商家信息</div>

        </div>
        <!-- 名称地址 -->
        <div class="name_site">
          <p>商家名称:&nbsp;&nbsp;
            <span class="merchant">{{orderList.name}}</span>
          </p>
          <p>商家地址:&nbsp;&nbsp;
            <image src="../../static/images/address.png"></image>&nbsp;
            <span class="merchant">{{orderList.city}}{{orderList.address}}</span>
          </p>
          <p>活动名称:&nbsp;&nbsp;
            <span class="merchant">某商家活动卷</span>
          </p>
        </div>
        <!-- 右侧电话 -->
        <div class="phone_call" @click="getTel">
          <image src="../../static/images/call.png"></image>
        </div>

      </div>
      <!-- 线条 -->
      <div class="line"></div>

      <!-- 活动规则 -->
      <div class="activity_centre">

        <!-- 活动标题 -->
        <div class="activity_headline">

          <!-- 图标 -->
          <div class="huodong">
            <image class="huodong_img" src='../../static/images/lingdang.png'></image>
          </div>

          <!-- 标题文字 -->
          <div class="headline_word">活动规则</div>

        </div>
        <!-- 活动内容 -->
        <div class="describe">
          <p>&nbsp;&nbsp;&nbsp;有效期:&nbsp;&nbsp;
            <span class="word_one">2019.04.28-2019.05.29</span>
          </p>
          <div class="employ">使用规则:&nbsp;&nbsp;
            <div class="text_word">使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则</div>
          </div>
        </div>

      </div>
      <!-- 线条 -->
      <div class="line"></div>

      <!-- 订单信息 -->
      <div class="activity_centre">

        <!-- 活动标题 -->
        <div class="activity_headline">

          <!-- 图标 -->
          <div class="huodong">
            <image class="huodong_img" src='../../static/images/dingdan.png'></image>
          </div>

          <!-- 标题文字 -->
          <div class="headline_word">订单信息</div>

        </div>
        <!-- 订单内容 -->
        <div class="order_content">
          <p>订单编号:&nbsp;&nbsp;
            <span class="word_black">{{orderList.order_num}}</span>
          </p>
          <p>下单时间:&nbsp;&nbsp;
            <span class="word_black">{{orderList.order_time}}</span>
          </p>
          <p>商品名称:&nbsp;&nbsp;
            <span class="word_black">{{orderList.activity_name}}</span>
          </p>
          <p>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量:&nbsp;&nbsp;
            <span class="word_black">×1</span>
          </p>
          <p>付款金额:&nbsp;&nbsp;
            <span class="word_black">¥{{orderList.total}}</span>
          </p>
        </div>

      </div>
      <!-- 线条 -->
      <div class="line"></div>
    </div>
    <!-- 底部 -->
    <div class="purchase" @click="getPut">立即支付</div>
    <div class="stance"></div>
  </div>
</template>

<script>
// 导入promise、
import request from '../../utils/myrequest.js'
export default {
  data() {
    return {
      id: '', // 订单传过来的id
      token: '',
      orderList: {
        order_time: '',
        contact: '',
        id: ''
      }
    }
  },
  methods: {
      getData() {
        this.token = wx.getStorageSync('token') || {}   
        request.get('/order/order_details', {
          id : this.id,
          token: this.token
        }).then(res => {
          this.orderList = res.data.data.order
          var time = require('../../utils/time.js')
          this.orderList.order_time = time.formatTime(this.orderList.order_time, 'Y/M/D h:m:s')
        })
      },
      // 拨打电话
      getTel () {
        wx.makePhoneCall({
          phoneNumber: this.orderList.contact
        })
      },
      //  支付功能
      getPut() {
      this.token = wx.getStorageSync('token') || {}
      request.get('/buy/pay', {
        id: this.orderList.id,
        token: this.token
      }).then(res => {
        let rst = res.data
        wx.requestPayment({
          timeStamp: rst.timeStamp,
          nonceStr: rst.nonceStr,
          package: rst.package,
          signType: 'MD5',
          paySign: rst.paySign,
          success (res) { 
            wx.navigateTo({
              url: '/pages/payment/main'
            })
          },
          fail (res) { 
            wx.showToast({
              title: '支付失败',
              icon: 'success',
              duration: 2000
            })
          }
        })
      })
    }
  },
  onLoad(options) {
    this.id = options.id
    this.getData()
  },
  mouted() {
  }
}
</script>

<style scoped lang="sass">
@import 'order_particulars.scss';
@import '../../../static/iconfont-3/iconfont.css'
</style>
