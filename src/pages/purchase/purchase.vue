<template>
  <div>
    <div class="content">
      <!-- 商品介绍 -->
      <div class="content_box">
        <!-- 上边内容 -->
        <div class="content_top">
            <!-- 图片展示 -->
            <div class="img_left">
              <image v-if="purList.picture" :src="'https://xcx.youngsay.net/'+purList.picture"></image>
            </div>
            <!-- 文字展示 -->
            <div class="word_centre">
              <p>{{purList.activity_name}}</p>
              <p>数量:1</p>
              <p>单价:¥{{purList.now_price}}</p>
            </div>
          <!-- 加减 -->
          <div class="addition_box">
            <div class="subtraction" v-on:click="subtract()">-</div>
            <input type="text" value="1" v-model="count">
            <div class="addition" v-on:click="add()">+</div>
          </div>
        </div>
        <!-- 下边展示 -->
        <div class="content_bottom">
          <div class="subtotal">
            <span>小计:</span>&nbsp;
            <span>¥{{count*purList.now_price}}</span>
          </div>
        </div>
      </div>
      <!-- 可用积分 -->
      <div class="integral">
        <div class="integral_word">当前可用{{purList.score}}积分抵扣</div>
        <div class="switch_right">
          <span>－¥{{ purList.switch }}</span>
          <switch color="#ea0895" style="zoom:.6;" :style="{'checked' : (purList.switch > 1  ? false : true)}" disabled @change="switch1Change" />
        </div>
      </div>
      <!-- 展示手机号和实付款 -->
      <div class="phone">
        <!-- 手机号 -->
        <div class="phone_top">
          手机号
          <button 
            class="btn" 
            open-type="getPhoneNumber" 
            @getphonenumber="getPhoneNumber"
            v-show="play"
          >获取手机号</button>
          <!--              -->
          <div v-show="out" class="phone_one">{{purList.phone}}</div>
        </div>
        <!-- 实付款 -->
        <div class="payment">
          <div class="true_payment">
            <p>实付款</p>
            <p>¥{{total}}</p>
          </div>
          <div class="integral_mortgage">
            <p>积分抵扣</p>
            <p>－¥{{purList.switch}}</p>
          </div>
        </div>
      </div>
      <!-- 提交订单 -->
      <!-- <navigator hover-class="none" style="none" url="/pages/payment/main"> -->
        <div class="submit" @click="getPut">提交订单</div>
      <!-- </navigator> -->
    </div>
  </div>
</template>

<script>
// 导入promise、
import request from '../../utils/myrequest.js'
export default {
  data() {
    return {
      purList: {
        stock: '',
        now_price: '',
        switch: ''
      },
      id: '', // 获取id
      code: '', // 获取code
      // 手机号参数
      encryptedData: '', 
      iv: '',
      token: {}, // 获取token
      phoneList: [], // 获取手机号
      // 开关按钮
      play: true,
      out: false,
      count: 1, // 加减参数
      total: ''
    }
  },
  methods: {
    // 获取数据
    getData() {
      this.token = wx.getStorageSync('token') || {}
      request.get('/buy/index', {
        // parseFloat(value).toFixed(2)
        id: this.id,
        token: this.token
      }).then(res => {
        this.purList = res.data.data.shop
        this.purList.phone = res.data.data.shop.phone
        console.log(res)
        if (this.purList.switch < 1) {
          this.purList.switch = 0
        }
        this.total = (this.count* this.purList.now_price - this.purList.switch).toFixed(2)
        if (this.purList.phone == null) {
          this.play = true
          this.getPhoneNumber()
        }else {
          this.play = !this.play
          this.out = true
        }
      })
    },
    // 获取手机号
    getPhoneNumber(res) {
      let { detail } = res.mp
      this.encryptedData = detail.encryptedData
      this.iv = detail.iv
      request.post('/login/getphone', {
        code: this.code,
        encry: detail.encryptedData,
        iv: detail.iv,
        token: this.token
      }).then(res => {
        wx.setStorageSync('phone', res.data.data.phone)
        this.phoneList = res.data.data.phone
      })
    },
    // 开关按钮
    switch1Change() {
      if (this.purList.switch > 1) {
        disabled = true
      }else {
        disabled = false
      }
    },
    // 加减功能
    add (count) {
      if (this.count >= this.purList.stock) {
        wx.showToast({
          title: '不能多了',
          icon: 'success',
          duration: 2000
        })
      }else {
        this.count++
      }
    },
    subtract (count) {
      if (this.count <= 1) {
        wx.showToast({
          title: '不能少了',
          icon: 'success',
          duration: 2000
        })
      }else {
        this.count -= 1
      }
    },
    // 支付功能
    getPut() {
      this.token = wx.getStorageSync('token') || {}
      request.get('/buy/buy', {
        id: this.id,
        token: this.token,
        switch: this.purList.switch,
        count: this.count
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
  onLoad(query) {
    this.id = query.id
    this.getData()
    wx.login({
      success: res =>{
        this.code = res.code
      } 
    })
  },
  onShow(){
    this.token = wx.getStorageSync('token') || {}
    this.phone = wx.getStorageSync('phone') || {}
  },
  mouted() {
    this.getMoney()
  }
}
</script>

<style scoped lang="sass">
@import 'purchase.scss';
@import '../../../static/iconfont-3/iconfont.css'
</style>
