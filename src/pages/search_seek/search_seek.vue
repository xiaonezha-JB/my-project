<template>
  <div class="all">
    <!-- 顶部搜索 -->
    <div class="top_search">
      <!-- 搜索框 -->
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input @input="handleInput" @confirm="handleConfirm" type="text" placeholder="点击搜索" v-model="searchKey">
      </div>
    </div>
    <!-- 热门推荐 -->
    <div class="hot">
      <div class="word">热门推荐</div>
      <p class="content" @click="getHot(item1)" v-for="(item1, index1) in hotList" :key="index1">{{item1}}</p>
    </div>
    <!-- 历史搜搜 -->
    <div class="history">
      <div class="word_tow">
        <div>历史搜索</div>
        <div @click="clearHistory">清除历史</div>
      </div>
      <div class="history_content">
        <p class="history_word" @click="getHistory(val)" v-for="(val, key) in keyList" :key="key">{{val}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// 引入 request
import request from '../../utils/myrequest.js'
export default {
  data() {
    return {
      searchKey: '', // 搜索关键字
      hotList: {}, // 热门推荐
      keyList: [], // 历史搜索
      thinkList: [], // 联想数组
      timer: null, // 搜索页面的定时器
      token: ''
    }
  }, 
  methods: {
    getData() {
      request.get('/index/search_show', {
      }).then(res => {
        this.hotList = res.data.data
        this.hotList.forEach(c => {
        this.hotList = c[i]
        })
      })
    },
    // 搜索
    handleConfirm() {
      if (this.searchKey.trim().length <= 0) {
        // 不执行后面的搜索代码
        return
      }
      // 跳转到 search_list 中
      wx.navigateTo({
        url: `/pages/search/main?key=${this.searchKey}`
      })
      // 将当前的关键字保存到小程序的 stroage
      this.keyList.unshift(this.searchKey)
      // 使用 set 进行去重
      this.keyList = [...new Set(this.keyList)]
      wx.setStorageSync('history', this.keyList)
      // 将原本的搜索页面中的关键字清除
      this.searchKey = ''
    },
    // 清除缓存历史数据
    clearHistory() {
      // 清除小程序缓存中的数据
      wx.removeStorageSync('history')
      // 清除 keyList 中的数据
      this.keyList = []
    },
    handleInput(ev) {
      // console.log(ev)
      // // 判断是否为空
      // if (this.searchKey.trim().length === 0) {
      //   return
      // }
      // // 让搜索中只有一个定时器
      // if(this.timer) {
      //   // 清除之前的定时器
      //   clearTimeout(this.timer)
      // }
      // // 搜索：
      // this.token = wx.getStorageSync('token') || {} 
      // this.timer = setTimeout(() => {
      //   // 发送请求到服务器拿到与搜索内容相关的数据
      //   var keyword = ev.mp.detail.value
      //   request.get('/index/search', {
      //     name: keyword,
      //     token: this.token
      //   }).then(res => {
      //     this.thinkList = res.data.list
      //   })
      // }, 500)
    },
    thinkClick(key) {
      this.searchKey = key
      this.handleConfirm()
    },
    // 点击热门活动跳转
    getHot(item1) {
      wx.navigateTo({
        url: `/pages/search/main?key=${item1}`
      })
    },
    // 点击历史搜索跳转
    getHistory(val) {
      wx.navigateTo({
        url: `/pages/search/main?key=${val}`
      })
    }
  },
  onLoad() {
    this.getData()
  },
  mounted() {
    // 当每次新进来时重新给 keyList 赋值
    this.keyList = wx.getStorageSync('history') || []
  }
}
</script>

<style scoped lang="sass">
@import 'search_seek.scss';
@import '../../../static/iconfont/iconfont.css'
</style>
