<template>
  <div>
    <div class="generalize">
      <div class="generalize_box" v-for="(item, index) in generalizeList" :key="index">
        <p>{{item.activity_name}}</p>
        <p>用户名：{{item.name}}</p>
        <p>{{item.pay_time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// 导入promise、
import request from '../../utils/myrequest.js'
var util = require("../../utils/time.js");
export default {
  data() {
    return {
      token: '',
      generalizeList: {
        pay_time:''
      }
    }
  },
  methods: {
    getData() {
      this.token = wx.getStorageSync('token') || {} 
      request.get('/mine/recommend', {
        token: this.token
      }).then(res => {
        this.generalizeList = res.data.data
        for (var i in this.generalizeList) { 
          this.generalizeList[i]["pay_time"] = util.js_date_time(this.generalizeList[i]["pay_time"]) 
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
@import 'generalize.scss';
</style>
