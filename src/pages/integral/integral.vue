<template>
  <div>
    <div class="all">
      <!-- 上边盒子 -->
      <div class="top_contetn">
        <!-- 可用积分 -->
        <div class="content_name">可用积分</div>
        <!-- 积分 -->
        <div class="content_score">{{all}}</div>
        <!-- 积分规则 -->
        <div class="content_rule">积分规则</div>
      </div>
      <!-- 下边盒子 -->
      <div class="bottom_contetn">
        <!-- 积分明细 -->
        <div class="detail">积分明细</div>
        <!-- 详情 -->
        <div class="introduce" v-for="(item, index) in integralList" :key="index">
          <p>{{item.details}}</p>
          <p>{{item.add_time}}</p>
          <p>+{{item.score}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入promise、
import request from '../../utils/myrequest.js'
var util = require("../../utils/time.js")
export default {
  data() {
    return {
      integralList: {
        add_time: ''
      },
      token: '',
      all: ''
    }
  },
  methods: {
    getData() {
      this.token = wx.getStorageSync('token') || {} 
      request.get('/mine/score', {
        token: this.token
      }).then(res => {
        this.integralList = res.data.data.details
        this.all = res.data.data.all
        for (var i in this.integralList) { 
          this.integralList[i]["add_time"] = util.js_date_time(this.integralList[i]["add_time"]) 
        }
      })
    }
  },
  onLoad() {
    this.getData()
  },
  mouted() {

  }
}
</script>

<style scoped lang="sass">
@import 'integral.scss'
</style>
