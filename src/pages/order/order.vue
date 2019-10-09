<template>
  <div class="all">
    <!-- 头部 -->
    <div class="head">
      <!-- 搜索 -->
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input  type="text" placeholder="输入商品名称查询订单" @confirm="handleConfirm" v-model="orderMark">
      </div>
      <!-- 导航栏 -->
      <div class="nav">
        <div class="test">
          <div class="testNav">
            <div
              :class="{'selected':tab === 0,'testTitle':true}"
              @click="changTab(0)"
            >全部</div>
            <div
              :class="{'selected':tab === 1,'testTitle':true}"
              @click="changTab(1)"
            >待付款</div>
            <div
              :class="{'selected':tab === 2,'testTitle':true}"
              @click="changTab(2)"
            >待使用</div>
            <div
              :class="{'selected':tab === 3,'testTitle':true}"
              @click="changTab(3)"
            >待评价</div>
            <div
              :class="{'selected':tab === 4,'testTitle':true}"
              @click="changTab(4)"
            >退款/售后</div>
          </div>
          <div class="container">
            <div v-if="tab === 0">
              <!-- 内容区域 -->
              <div class="content_one">
                <!-- 卡片 -->
                <div class="card" v-for="(item, index) in orderList" :key="index">
                  <!-- 上面文字 -->
                  <div class="word-top">
                    <span>订单号：{{item.order_num}}</span>
                    <span>{{item.state}}</span>
                  </div>
                  <!-- 信息展示 -->
                  <div class="exhibition-box">
                    <div class="left-img">
                      <image v-if="item.picture" :src="'https://xcx.youngsay.net/'+item.picture"></image>
                    </div>
                    <div class="right-word">
                      <p>{{item.activity_name}}</p>
                      <p>数量：{{item.number}}</p>
                      <p>总价：¥{{item.real_pay}}</p>
                    </div>
                  </div>
                  <!-- 立即支付 -->
                  <div @click="getSkip(item.state,item.id)" class="payment">{{item.state}}</div>
                </div> 
              </div>
            </div>
            <div v-else-if="tab === 1" class="content_two">
              <!-- 内容区域 -->
              <div class="content_one">
                <!-- 卡片 -->
                <div class="card" v-for="(value, key) in paymentList" :key="key">
                  <!-- 上面文字 -->
                  <div class="word-top">
                    <span>订单号：{{value.order_num}}</span>
                    <span>{{value.state}}</span>
                  </div>
                  <!-- 信息展示 -->
                  <div class="exhibition-box">
                    <div class="left-img">
                      <image v-if="value.picture" :src="'https://xcx.youngsay.net/'+value.picture"></image>
                    </div>
                    <div class="right-word">
                      <p>{{value.activity_name}}</p>
                      <p>数量：{{value.number}}</p>
                      <p>总价：¥{{value.real_pay}}</p>
                    </div>
                  </div>
                  <!-- 立即支付 -->
                  <div class="payment" @click="getPurchase">{{value.state}}</div>
                </div> 
              </div>
            </div>
            <div v-else-if="tab === 2" class="content_three">
              <!-- 内容区域 -->
              <div class="content_one">
                <!-- 卡片 -->
                <div class="card" v-for="(num, add) in paymentList" :key="add">
                  <!-- 上面文字 -->
                  <div class="word-top">
                    <span>订单号：{{num.order_num}}</span>
                    <span>{{num.state}}</span>
                  </div>
                  <!-- 信息展示 -->
                  <div class="exhibition-box">
                    <div class="left-img">
                      <image v-if="num.picture" :src="'https://xcx.youngsay.net/'+num.picture"></image>
                    </div>
                    <div class="right-word">
                      <p>{{num.activity_name}}</p>
                      <p>数量：{{num.number}}</p>
                      <p>总价：¥{{num.real_pay}}</p>
                    </div>
                  </div>
                  <!-- 立即支付 -->
                  <div class="payment" @click="getOrderUse">{{num.state}}</div>
                </div> 
              </div>
            </div>
            <div v-else-if="tab === 3">
              <!-- 内容区域 -->
              <div class="content_one">
                <!-- 卡片 -->
                <div class="card" v-for="(item1, index1) in paymentList" :key="index1">
                  <!-- 上面文字 -->
                  <div class="word-top">
                    <span>订单号：{{item1.order_num}}</span>
                    <span>{{item1.state}}</span>
                  </div>
                  <!-- 信息展示 -->
                  <div class="exhibition-box">
                    <div class="left-img">
                      <image v-if="item1.picture" :src="'https://xcx.youngsay.net/'+item1.picture"></image>
                    </div>
                    <div class="right-word">
                      <p>{{item1.activity_name}}</p>
                      <p>数量：{{item1.number}}</p>
                      <p>总价：¥{{item1.real_pay}}</p>
                    </div>
                  </div>
                  <!-- 立即支付 -->
                    <div class="payment" @click="getAppraise">{{item1.state}}</div>
                </div> 
              </div>
            </div>
            <div v-else>
              <!-- 内容区域 -->
              <div class="content_one">
                <!-- 卡片 -->
                <div class="card" v-for="(item2, index2) in paymentList" :key="index2">
                  <!-- 上面文字 -->
                  <div class="word-top">
                    <span>订单号：{{item2.order_num}}</span>
                    <span>{{item2.state}}</span>
                  </div>
                  <!-- 信息展示 -->
                  <div class="exhibition-box">
                    <div class="left-img">
                      <image v-if="item2.picture" :src="'https://xcx.youngsay.net/'+item2.picture"></image>
                    </div>
                    <div class="right-word">
                      <p>{{item2.activity_name}}</p>
                      <p>数量：{{item2.number}}</p>
                      <p>总价：¥{{item2.real_pay}}</p>
                    </div>
                  </div>
                  <!-- 立即支付 -->
                  <div class="payment" @click="getAppraise">{{item2.state}}</div>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/myrequest';
export function getOrderUse() {
  /* 获取当前路由栈数组 */
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options
  return options
}
export default {
  data() {
    return {
      tab: 0,
      token: {},
      orderList: {
        state: '',
        id: ''
      },
      paymentList: {
        id: ''
      },
      orderMark: ''
    }
  },
  methods: {
    // 导航栏点击获取数据
    changTab(index) {
      this.tab = index;
      request.get('/order/index' , {
        token: this.token,
        tab: this.tab
      }).then(res => {
        wx.setStorageSync('paymentList',res.data.data)
        this.paymentList = res.data.data
        this.paymentList.forEach(c => {
          this.paymentList.id = c.id
        })
      })
    },
    // 获取全部数据
    getData() {
      this.token = wx.getStorageSync('token') || {}
      request.get('/order/index' , {
        token: this.token,
        tab: 0
      }).then(res => {
        this.orderList = res.data.data
        this.orderList.forEach(v => {
          this.orderList.state = v.state
          this.orderList.id = v.id
        })
      })
    },
    // 全部跳转
    getSkip (state, id) {
      if (state == '待付款') {
        wx.navigateTo({
          url: `/pages/order_particulars/main?id=${id}`
        })
      }else if (state == '待使用') {
        wx.navigateTo({
          url: `/pages/order_use/main?id=${id}`
        })
      }else if (state == '待评价') {
        wx.navigateTo({
          url: `/pages/order_evaluate/main?id=${id}`
        })
      }else if(state == '已完成') {
        wx.navigateTo({
          url: `/pages/accomplish/main?id=${id}`
        })
      }
    },
    // 待使用跳转
    getOrderUse () {
      request.get('/order/order_details', {
        id: this.paymentList.id,
        token: this.token
      }).then(res => {
        let id = this.paymentList.id
        wx.navigateTo({
          url: `/pages/order_use/main?id=${id}`
        })
      })
    },
    // 待付款跳转
    getPurchase() {
      request.get('/order/order_details' , {
        id: this.paymentList.id,
        token: this.token
      }).then(res => {
        let id = this.paymentList.id
        wx.navigateTo({
          url: `/pages/order_particulars/main?id=${id}`
        })
      })
    },
    // 跳转待评价
    getAppraise() {
      request.get('/order/order_details' , {
        id: this.paymentList.id,
        token: this.token
      }).then(res => {
        let id = this.paymentList.id
        wx.navigateTo({
          url: `/pages/order_evaluate/main?id=${id}`
        })
      })
    },
    // 搜索
    handleConfirm() {
      if (this.searchKey.trim().length <= 0) {
        // 不执行后面的搜索代码
        return
      }
      // 将当前的关键字保存到小程序的 stroage
      // this.keyList.unshift(this.searchKey)
      // 使用 set 进行去重
      this.keyList = [...new Set(this.keyList)]
      wx.setStorageSync('history', this.keyList)
      // 将原本的搜索页面中的关键字清除
      this.searchKey = ''
    },
  },
  onLoad(query) {
    this.token = wx.getStorageSync('token')
    if (this.token == '') {
      wx.navigateTo({
        url: '/pages/auth/main'
      })
    }else {
    }
    this.getData()
  },
  onPullDownRefresh() {
    this.getData()
  },
  onShow(){
    this.token = wx.getStorageSync('token') || {}
    this.phone = wx.getStorageSync('phone') || {}
  },
  mouted() {
    this.id = this.$root.$mp.query.id
  }
}
</script>

<style scoped lang="sass">
@import 'order.scss';
@import '../../../static/iconfont/iconfont.css'
</style>
