<template>
  <div>
    <div class="content">
      <!-- 显示支付成功 -->
      <div class="payment_succeed">
        <div class="true_mark">
          <i class="iconfont icon-duihao"></i>
        </div>
        <div class="word_succeed">支付成功</div>
      </div>

      <!-- 查看和返回 -->
      <div class="examine_return">
        <div class="examine" @click="getOrder">查看订单</div>
        <div class="return" @click="getIndex">返回首页</div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入promise、
import request from '../../utils/myrequest.js'
export default {
  data() {
    return {
      id: '', // 订单传过来的id
      token: ''
    }
  },
  methods: {
    // 跳转到order页面
    getOrder: function(options) {
      wx.switchTab({
        url: '/pages/order/main'
      })
    },
    getIndex: function(options) {
      wx.switchTab({
        url: '/pages/index/main'
      })
    }
  },
  onLoad(query) {

  },
  mouted() {
    // this.getData()
  }
}
</script>

<style scoped lang="sass">
@import 'payment.scss';
@import '../../../static/iconfont-4/iconfont.css'
</style>
