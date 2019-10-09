<template>
  <div>
    <div class="collect">
      <!-- 1 -->
      <div class="activity-exhibition" v-for="(item, index) in collectList" :key="index" @click="getDetails">
        <div class="exhibition-left">
          <image v-if="item.picture" :src="'https://xcx.youngsay.net/'+ item.picture"></image>
        </div>
        <div class="exhibition-right">
          <p>{{item.activity_name}}</p>
          <p>{{item.describe}}</p>
          <p>¥{{item.now_price}}</p>
        </div>
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
      collectList: {
        id: ''
      },
      token: ''
    }
  },
  methods: {
    gatData() {
      this.token = wx.getStorageSync('token') || {} 
      request.get('/mine/collect', {
        token: this.token
      }).then(res => {
        this.collectList = res.data.data
        this.collectList.forEach(v => {
          this.collectList.id = v.id
        })
      })
    },
    // 跳转详情页
    getDetails() {
      var id = this.collectList.id
      wx.navigateTo({
        url: `/pages/details/main?id=${id}`
      })
    }
  },
  onLoad() {
    this.gatData()
  },
  mouted() {
    
  }
}
</script>

<style scoped lang="sass">
@import 'collect.scss';
</style>
