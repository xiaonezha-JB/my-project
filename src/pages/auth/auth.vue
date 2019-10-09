<template>
  <div>
    <div class="top_ima">
      <image src="../../static/images/young.png"></image>
    </div>
    <button open-type="getUserInfo" @getuserinfo="onGotUserInfo">用户授权</button>
  </div>
</template>

<script>
// 导入promise、
import request from '../../utils/myrequest.js'
export default {
  data() {
    return {
      userInfo: {},
      // 数据获取
      params: {
        code: '',
        encryptedData: '',
        iv: '',
        rawData: ''
      }
    }
  },

  methods: {
    onGotUserInfo(res) {
      // 保存用户登陆信息
      let { detail } = res.mp
      this.params.encryptedData = detail.encryptedData
      this.params.iv = detail.iv
      this.params.rowData = JSON.stringify(detail.rawData)
      this.params.signature = detail.signature
      // 发送登陆请求
      request.post('/login/login', {
        code: this.params.code,
        encry: detail.encryptedData,
        iv: detail.iv,
        rowData: detail.rowData,
        signature: detail.signature
      }).then(res => {
        console.log(res)
        // 得到token 将token保存到storage中
        wx.setStorageSync('token', res.data.data)
        wx.showToast({
          title: '授权成功',
          icon: 'success',
          durantion: 2000,
          success: function() {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      })
    }
  },
  onLoad() {
    // 调用wx.login得到 code
    wx.login({
      success: res => {
        this.params.code = res.code
      }
    })
  },
mouted() {}
}
</script>

<style scoped>
.top_ima {
  width: 150rpx;
  height: 80rpx;
  margin: 300rpx auto 100rpx;
}
image {
  width: 100%;
  height: 100%;
}
button {
  width: 90%;
  height: 98rpx;
  background-color: #ed018c;
  border-radius: 15rpx;
  font-size: 41rpx;
  color: azure;
  line-height: 98rpx;
  text-align: center;
}
</style>
