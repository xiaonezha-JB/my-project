<template>
  <div>
    <div class="content">
      <div class="top_box">
        <div class="star">
          <div class="head-r">
            <image class="no-star" :src="noStarUrl" @tap="addStar(1)" v-if="activeNum<1"/>
            <image class="star_one" :src="starUrl" v-if="activeNum>0 && activeNum<=5" @tap="addStar(1)"/>
            <image class="no-star" :src="noStarUrl" @tap="addStar(2)" v-if="activeNum<2"/>
            <image class="star_one" :src="starUrl" v-if="activeNum>1 && activeNum<=5" @tap="addStar(2)"/>
            <image class="no-star" :src="noStarUrl" @tap="addStar(3)" v-if="activeNum<3"/>
            <image class="star_one" :src="starUrl" v-if="activeNum>2 && activeNum<=5" @tap="addStar(3)"/>
            <image class="no-star" :src="noStarUrl" @tap="addStar(4)" v-if="activeNum<4"/>
            <image class="star_one" :src="starUrl" v-if="activeNum>3 && activeNum<=5" @tap="addStar(4)"/>
            <image class="no-star" :src="noStarUrl" @tap="addStar(5)" v-if="activeNum<5"/>
            <image class="star_one" :src="starUrl" v-if="activeNum===5"/>
            <span class="praise" v-if="activeNum===5"></span>
            <span class="praise" v-if="activeNum===4"></span>
            <span class="praise" v-if="activeNum===3"></span>
            <span class="praise" v-if="activeNum===2"></span>
            <span class="praise" v-if="activeNum===1"></span>
          </div>
          <div class="word">觉得怎么样,打个分吧</div>
        </div>
      </div>
      <div class="middle">
        <div class="message">
          <textarea 
            class="word_content" 
            placeholder="亲,在这家店消费还满意吗？店家的环境和服务如何？"
            placeholder-style="color:#cccccc;"
            v-model="content"
            ></textarea>
        </div>
        <!-- <div>{{content1}}</div> -->
        <form @submit="formSubmit" @reset="formReset"> 
          <div class="album_one">
            <div class="album_two" v-for="(item, index) in img_arr" :key="index">  
              <div class='logoinfo' @longpress="deleteImage" :data-index="index">  
                <image :src="item"></image>  
              </div>
            </div> 
            <button @click="upimg($event)" class="btn_img">
              <image src="../../static/images/xiangji.png"></image>
              添加照片</button> 
          </div>
        </form>
      </div>
      <button class='btn' @click="getSubmit">提交留言</button>
    </div>
  </div>
  <!--  formType="submit"  -->
</template>

<script>
// 导入promise、
import request from '../../utils/myrequest.js'
var adds = {}
export default {
  data() {
    return {
      activeNum: 0,
      noStarUrl: '../../static/images/shoucang.png',
      starUrl: '../../static/images/shoucang2.png',
      img_arr: [],
      formdata: '',
      token: '',
      id: '',
      content: '',
      focus: false,
      img: ''
    }
  },
  methods: {
    addStar (num) {
      let that = this
      that.activeNum = num
    },
    formSubmit: function (e) {  
      var id = e.target.id  
      adds = e.detail.value;   
      adds.program_id = app.jtappid  
      adds.openid = app._openid  
      adds.zx_info_id = this.data.zx_info_id  
    },
    getSubmit() {
      this.token = wx.getStorageSync('token') || {} 
      this.img = wx.getStorageSync('img')
      request.get('/comment/index', {
        token: this.token,
        id: this.id,
        activeNum: this.activeNum,
        content: this.content,
        img: this.img
      }).then(res => {
        wx.showToast({
          title: '评价成功',
          icon: 'success',
          durantion: 5000,
          success() {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      })
    },
    // 获取图片 
    upimg(e) {
      var that = this
      if (that.img_arr.length <= 3) {
        wx.chooseImage({
          count: 4,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success (res) {
            that.img_arr = that.img_arr.concat(res.tempFilePaths)
            for(var i = 0; i < that.img_arr.length; i++ ){
              wx.uploadFile({
                url: 'https://xcx.youngsay.net/weixin/comment/upload', //仅为示例，非真实的接口地址
                filePath: that.img_arr[i],
                name: 'file',
                formData: {
                },
                success (res){           
                  wx.setStorageSync('img', res.data)
                  console.log(res)
                  const data = res.data
                }
              })
            }
          }
        })
      }else {
        wx.showToast({
          title: '最多上传四张图片',
          icon: 'loading',
          duration: 2000
        });
      }
    },
    // 删除图片
    deleteImage (e) {
      var that = this;
      var images = this.img_arr;
      var index = e.currentTarget.dataset.index;//获取当前长按图片下标
      wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
        images.splice(index, 1);
        } else if (res.cancel) {
          return false;    
        }
      }
      })
    }
  },
  onLoad(query) {
    this.id = query.id
  },
  mouted() {
    // this.chooseWxImage()
    this.upload()
    this.bindTextAreaBlur()
  }
}
</script>

<style scoped lang="sass">
@import 'user_evaluate.scss'
@import '../../../static/iconfont-6/iconfont.css'
</style>
