<template>
  <div>
    <!-- 头部图片 -->
    <div class="banner">
      <div class="banner-img">
        <image v-if="detailsList.picture" :src="'https://xcx.youngsay.net/' + detailsList.picture"></image>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="content">

      <!-- 信息介绍 -->
      <div class="information">
        <!-- 上面文字 -->
        <div class="information_top">
          <div class="word_left">
            <span>¥{{detailsList.now_price}}</span>
            <span>¥{{detailsList.old_price}}</span>
          </div>
          <div class="word_right">
            <button class="btn_zf" open-type="share" hover-class="none">
              <image src="../../static/images/repeat.png"></image>
              <div class="xiao"></div>
            </button>
            <i 
              :class='{"iconfont":true,"icon-star":true,"shoucang":true,"active":isSelected}' 
              @click="toggleCollect"
            ></i>
          </div>
        </div>
        <!-- 五角星 -->
        <div class="head_r">
            <image class="no_star" :src="noStarUrl" @tap="addStar(1)" v-if="activeNum<1"/>
            <image class="star" :src="starUrl" v-if="activeNum>0 && activeNum<=5" @tap="addStar(1)"/>
            <image class="no_star" :src="noStarUrl" @tap="addStar(2)" v-if="activeNum<2"/>
            <image class="star" :src="starUrl" v-if="activeNum>1 && activeNum<=5" @tap="addStar(2)"/>
            <image class="no_star" :src="noStarUrl" @tap="addStar(3)" v-if="activeNum<3"/>
            <image class="star" :src="starUrl" v-if="activeNum>2 && activeNum<=5" @tap="addStar(3)"/>
            <image class="no_star" :src="noStarUrl" @tap="addStar(4)" v-if="activeNum<4"/>
            <image class="star" :src="starUrl" v-if="activeNum>3 && activeNum<=5" @tap="addStar(4)"/>
            <image class="no_star" :src="noStarUrl" @tap="addStar(5)" v-if="activeNum<5"/>
            <image class="star" :src="starUrl" v-if="activeNum===5"/>
            <span class="praise">{{detailsList.comment}}分</span>
        </div>
        <!-- 活动介绍 -->
        <div class="activity">
          <p>{{detailsList.activity_name}}</p>
        </div>
        <!-- 积分等级 -->
        <div class="integral_and_grade">
          <div class="word_ig">积分：300300</div>
          <div class="word_ig">等级：青铜</div>
          <div class="word_ig">等级：青铜</div>
        </div>
      </div>

      <!-- 线条 -->
      <div class="line"></div>

      <!-- 描述 -->
      <div class="describe">
          <div class="describe_ash">描述：</div>
          <div class="describe_black">{{detailsList.describe}}</div>
      </div>

      <!-- 线条 -->
      <div class="line"></div>

      <!-- 电话 -->
      <div class="telephone">
        <!-- 商家信息 -->
         <div class="merchant">商家信息</div>
         <!--店面 -->
         <div class="storefront">
           <div class="storefront_picture"></div>
           <div class="merchant_word clearfix">
             <p>{{detailsList.name}}</p>
             <p>
               <image src="../../static/images/address.png"></image>
               {{detailsList.city}}{{detailsList.address}}
             </p>
           </div>
         </div>
         <!-- 电话图标 -->
         <div class="telephone_icon">
           <image src="../../static/images/call.png"></image>
         </div>
      </div>

      <!-- 线条 -->
      <div class="line"></div>

      <!-- 详细介绍 -->
      <div class="content_particular">
        <!-- 活动规则和用户评价 -->
        <div class="test">

          <div class="testNav">
            <div :class="{'selected':tab === 1,'testTitle':true}" @click="changTab(1)">活动规则</div>
            <div :class="{'selected':tab === 2,'testTitle':true}" @click="changTab(2)">用户评价</div>
          </div>

          <div class="container">
            <!-- 活动规则 -->
            <div v-if="tab===1" class="activity_rules">
              <ul class="period_of_validity">
                <li>有效期：</li>
                <li>•&nbsp;&nbsp;2018.5.6至20196.6(周末、法定节假日通用)</li>
              </ul>
              <ul class="period_of_validity">
                <li>使用时间：</li>
                <li>•&nbsp;&nbsp;11:00-14:00,&nbsp;17:00-21:00</li>
              </ul>
              <ul class="period_of_validity">
                <li>适用范围：</li>
                <li>•&nbsp;&nbsp;全场通用</li>
              </ul>
              <ul class="period_of_validity">
                <li>适用范围：</li>
                <li>•&nbsp;&nbsp;无须预约，消费高峰期时可能需要等位</li>
                <li>•&nbsp;&nbsp;不可叠加使用</li>
                <li>•&nbsp;&nbsp;可免费使用包间</li>
                <li>•&nbsp;&nbsp;团购用户不可同时享受商家其他优惠</li>
                <li>•&nbsp;&nbsp;商家提供免费WIFI</li>
                <li>•&nbsp;&nbsp;免费提供两个车位</li>
                <li>•&nbsp;&nbsp;仅限堂吃，不提供餐前外带，餐毕未吃完可打包，打包费详情请咨询商家</li>
              </ul>
            </div>
            <!-- 用户评价 -->
            <div v-else-if="tab===2" class="user_evaluate">
              <div class="evaluate" v-for="(item, index) in evaluateList" :key="index">
                <!-- 头像和昵称 -->
                <div class="name_head">
                  <image class="evaluate_head" :src="item.head"></image>
                  <div class="evaluate_name">{{item.name}}</div>
                </div>
                <!-- 文字评价 -->
                <div class="evaluate_word">{{item.content}}</div>
                <!-- 评价时间 -->
                <div class="evaluate_time">{{item.comment_time}}</div>
                <!-- 图片评价 -->
                <div class="evaluate_picture"></div>
                <!-- 商家回应 -->
                <div class="reply">
                  <div class="triangle"></div>
                  <div class="merchant_reply">
                    <span>商家回应</span>
                    <span>&nbsp;:&nbsp;&nbsp;{{item.reply}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部购买 -->
    <div class="bottom_purchase">
      <div class="purchase_box">
        <div class="purchase_left">
          <p><span>¥52</span>&nbsp;&nbsp;<span>5.2折</span></p>
          <p>市场价¥100</p>
        </div>
          <div class="purchase_right" @click="getPurchase">立即抢购</div>
      </div>
    </div>
    <!-- 空格 -->
    <div class="bottom"></div>
  </div>
</template>

<script>
// 导入promise、
import request from '../../utils/myrequest.js'
export default {
  data() {
    return {
      activeNum: 0, // 星星评价
      // 星星图片路径
      noStarUrl: 'http://common.static.sangeayi.cn/shop_wx/images/icon_star_border.png',
      starUrl: 'http://common.static.sangeayi.cn/shop_wx/images/icon_star_green.png',
      // tab切换
      tab: 1,
      // 数据获取
      detailsList: {
        activity_name: '',
        picture:'',
        comment: ''
      },
      evaluateList: [],
      userList: [],
      id: '', // 详情数据对应商品id
      isSelected:false,
      token: {},
      goods: {},
    }
  },
  methods: {
    getDetails () {
      request.get('/activity/index', {
        id: this.id
      }).then(res => {
        this.detailsList = res.data.data
        this.detailsList.comment = res.data.data.comment
        this.activeNum = this.detailsList.comment
      })
      request.get('/activity/comment', {
        id: this.id
      }).then(res => {
        this.evaluateList = res.data.data
        this.userList = res.data.data
      })
    },
    // -----------------------
    // addStar (num) {
      // console.log(num)
      // let that = this
      // that.activeNum = num
      // that.activeNum = that.detailsList.comment
    // },
    changTab(index) {
      this.tab = index;
    },
    getAdd() {
      wx.showShareMenu({
        withShareTicket: true
      })
    },
    // 收藏
    toggleCollect(){
      request.auth('/activity/collect', 'POST', {
        id: this.id,
        token: this.token
      }).then(res => {
        if (this.isSelected = !this.isSelected) {
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
        }else {
          wx.showToast({
            title: '取消收藏',
            icon: 'success',
            duration: 2000
          })
        }
      })
    },
    // 购买
    getPurchase(){
      this.token = wx.getStorageSync('token') || {}
      request.auth('/buy/index', 'get', {
        id: this.id,
        token: this.token
      }).then(res => {
        var id = res.data.data.id
        wx.navigateTo({
          url: `/pages/purchase/main?id=${this.id}`
        })
      })
    }
  },
  onLoad(query) {
    this.id = query.id
    this.getDetails() 
    wx.showShareMenu()
  },
  //转发
  onShareAppMessage (res) {
    console.log(res)
    if (res.from === 'button') {
      console.log(res.target)
    }
    let picture ='https://xcx.youngsay.net/' + this.detailsList.picture
    console.log(picture)
    let activity_name = this.detailsList.activity_name
    return {
      title: activity_name,
      path: `/page/details/main`,
      imageUrl: picture,
      success: function (res) {
        console.log(res)
      }
    }
  },
  onShow(){
    this.token = wx.getStorageSync('token') || {}
  },
  mouted() {
    this.toggleCollect()
    this.getPurchase()
  }
}
</script>

<style scoped lang="sass">
@import 'details.scss';
@import '../../../static/iconfont-5/iconfont.css'
</style>
