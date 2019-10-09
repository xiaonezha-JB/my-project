<template>
  <div class="all">
    <!-- 搜索区域 -->
    <div class="search">
      <div class="city">
        <navigator hover-class="none" style="none" url="/pages/CityPage/main">
          <span>{{cityInfo == '' ? city : cityInfo}}</span>
        </navigator>
      </div>
      <div class="seqrch-input">
          <navigator  hover-class="none" style="none" url="/pages/search_seek/main">
            <image src="../../static/images/search.png"></image>
            <span>搜索商家名称、活动名称</span>
          </navigator>
      </div> 
    </div>

    <!-- 内容区域 -->
    <div class="content">

      <!-- 轮播图 -->
      <swiper class="swiper" autoplay circular>
        <block v-for="(item, index) in imgList" :key="index">
          <swiper-item>
            <!-- 
              :src="'https://xcx.youngsay.net/'+ item.thumbnail"
             -->
            <image v-if="item.png" :src="item.png" class="slide-image" mode="aspectFill" bindchange="bindchange"></image>
          </swiper-item>
        </block>
      </swiper>
      
      <!-- 美食分类 -->
      <div class="food">
        <ul class="food-ul" v-for="(arr,key1) in foodList" :key="key1">
          <li><image v-if="arr.png" :src="arr.png"></image></li>
          <li>{{arr.name}}</li>
        </ul>
      </div>
      
      <!-- 
        图片详情:
          :src="'https://xcx.youngsay.net/'+item.picture"
          {{item.activity_name}}
          ¥{{item.now_price}}
       -->
      <div class="picture">
        <navigator  class="picture_details"  hover-class="none" style="none" :url="'/pages/details/main?id=' + item.id" v-for="(item, index) in pictureList" :key="index">
              <image  v-if="item.picture" :src="item.picture"></image>
              <span class="picture-typeface">{{item.activity_name}}</span>
              <span class="picture-money">¥{{item.now_price}}</span>
        </navigator>
      </div>
      <!-- 热门活动 -->
      <div class="activity-box">
        <!-- 文字部分 -->
        <div class="activity-content">
          <span>热门活动</span>
          <span>天天换新，每天都有新活动</span>
          <image src="../../static/images/forward.png"></image>
        </div>
        <!-- 活动展示 -->
        <navigator class="activity-exhibition" 
          v-for="(item, index) in keyList" 
          :key="index" 
           hover-class="none" style="none" :url="'/pages/details/main?id=' + item.id">
              <div class="exhibition-left">
                <image :src="'https://xcx.youngsay.net/'+item.picture"></image>
              </div>
              <div class="exhibition-right">
                <p>{{item.activity_name}}</p>
                <p>{{item.describe}}</p>
                <p>¥{{item.now_price}}</p>
              </div>
        </navigator>
      </div>

      <!-- 附近活动 -->
      <div class="activity-nearby">
        <!-- 文字部分 -->
        <div class="nearby-content">
          <div class="content-top">
            <span>附近活动</span>
            <image src="../../static/images/forward.png"></image>
          </div>
            <div class="comprehensive-left">
              <p>综合排序</p>
            </div>
            <div class="comprehensive-right">
              <p>距离</p>
            </div>
        </div>
        <!-- 附近展示 -->
        <navigator  class="nearby-exhibition" v-for="(val, key) in nearList" :key="key"  hover-class="none" style="none" :url="'/pages/details/main?id=' + val.id">
            <div class="nearby-left">
              <image :src="'https://xcx.youngsay.net/'+val.picture"></image>
            </div>
            <div class="nearby-right">
              <p>{{val.activity_name}}</p>
              <p>{{val.describe}}</p>
              <p>¥{{val.now_price}}<span>距我{{val.distance}}</span></p>
            </div>
        </navigator>
      </div>
    </div>
  </div>
</template>

<script>
// 导入promise、
import request from '../../utils/myrequest.js'
var that
export function getQuery() {
  /* 获取当前路由栈数组 */
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options
  return options
}
export default {
  data() {
    return {
      imgList: [
        { png: '../../static/imaYan/20180924214844.png' },
        { png: '../../static/imaYan/20180924214848.jpg' },
        { png: '../../static/imaYan/20190829214157 (5).jpg' }
      ],
      pictureList: [
        {
          picture: '../../static/images/20190829214157 (10).jpg',
          activity_name: '',
          now_price: '',
        },
        {
          picture: '../../static/images/20190829214157 (9).jpg',
          activity_name: '',
          now_price: '',
        },
        {
          picture: '../../static/images/20190829214157 (11).jpg',
          activity_name: '',
          now_price: '',
        },
      ], // 日推
      keyList: [], // 热门
      nearList: [], // 附近
      foodList: [
        {
          png : '../../static/imaYan/20180924214828.jpg',
          name: '茶叶'
        },
        {
          png : '../../static/imaYan/20190428142021 (4).jpg',
          name: '活动'
        },
        {
          png : '../../static/imaYan/20190829214157 (2).jpg',
          name: '美食'
        },
        {
          png : '../../static/imaYan/20190829214157 (4).jpg',          
          name: '烟酒'
        },
        {
          png : '../../static/imaYan/20190428142021 (3).jpg',
          name: '娱乐'
        },
      ], // 美食
      city: '',
      city_code: '',
      id: '',
      userInfo: {},
      params: {
        code: '',
      },
      latitude: '',
      longitude: '',
      cityInfo: '',
      codeInfo: ''
    }
  },
  //  显示城市    添加区县： ${data.county}
  onShow(query) {
    const data = wx.getStorageSync('CITY_INFO');
    that.city_code = wx.getStorageSync('city_code') || {}
    if (data) {
      that = this
      that.cityInfo = `${data.city}`
      that.code1 = `${data.code}`
      wx.setStorageSync('code', data.code)
      if (that.code1 == '') {
        that.city_code = that.city_code
      }else{
        that.city_code = that.code1
      }
      request.get('/index/top', {
        city_code: that.city_code
      }).then(res => {
        that.pictureList = res.data.data
      })
      request.get('/index/hot', {
        city_code: that.city_code
      }).then(res => {
        that.keyList = res.data.data
      })
      request.get('/index/near', {
        city_code: that.city_code
      }).then(res => {
        that.nearList = res.data.data
      })
    }
  },
  methods: {
    // getData() {
    //   var that = this
    //   request.get('/index/round_map', {
    //   }).then(res => {
    //     that.imgList = res.data.data
    //   })
    // },
    backTop() {
      // 滚动到最上
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    }
  },
  onLoad(query, code) {
    // that = this
    // that.id = query.id
    // wx.login({
    //   success: res => {
    //     wx.request({
    //       url: 'https://xcx.youngsay.net/weixin/login/session',
    //       data: {
    //         code: res.code
    //       },
    //       success: function () {
    //         if (res.code === 200) {
    //           wx.setStorageSync('token', res.data.data)
    //         }
    //       }
    //     })
    //   }
    // })
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     that.latitude = res.latitude
    //     that.longitude = res.longitude
    //     request.get('/index/getCity', {
    //       latitude: that.latitude,
    //       longitude: that.longitude
    //     }).then(res => {
    //       wx.setStorageSync('city', res.data.data.city)
    //       wx.setStorageSync('city_code', res.data.data.city_code)
    //       that.city = res.data.data.city
    //     })
    //   }
    // })
    // that.code1 = wx.getStorageSync('code')
    // if (that.code1 == '') {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请选择你所在的城市',
    //     success (res) {
    //       if (res.confirm) {
    //         wx.navigateTo({
    //           url : '/pages/CityPage/main'
    //         })
    //       }else if (res.cancel){
    //         wx.showToast({
    //           title: '获取失败',
    //           icon: 'loading',
    //           duration: 3000
    //         })
    //       }
    //     }
    //   })
    // }else {
    //   }
    //   that.getData()
  },
  onPullDownRefresh() {
    this.getData()
  },
  mouted() {
    that.id = that.$root.$mp.query.id
  },
  /**
    * 用户点击右上角分享（index.js）
    */
    //转发
  onShareAppMessage: function() {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') {}
    return {
      title: '转发',
      path: '/pages/index/index',
      success: function(res) {}
    }
  }
}
</script>

<style scoped lang="sass">
@import 'index.scss';
</style>
