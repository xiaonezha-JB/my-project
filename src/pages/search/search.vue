<template>
  <div class="all">
    <!-- 顶部搜索 -->
    <div class="top_search">
      <!-- 搜索框 -->
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input @confirm="handleConfirm" type="text" placeholder="点击搜索" v-model="searchKey">
      </div>
    <!-- 下拉框-------------------------------------- 占时无用-------------------------------------------------------- -->
        <div class="drop_down">
          <!--  @click="bindShowMsg(index,select)"  下拉框  -->
          <span 
            v-for="(item, index) in list" 
            :key="index"
            :style="{'color' : (select == false ? '#9a9a9a' : '#f00089')}"
            >{{item.name}}</span>
          </div>
          <!-- 下拉内容 -->
          <div class="down_content" @click="mySelect"  v-if="select && tab == 0">
            <div class="classify" v-for="(val, key) in fyList" :key="key">{{val.value}}</div>
          </div>
          <div class="down_content" @click="mySelect"  v-else-if="select && tab == 1">2</div>
          <div class="down_content" @click="mySelect"  v-else-if="select && tab == 2">3</div>
        </div>
    <!-- ------------------------------------------------------------------------------------------------------- -->
    <!-- 内容区域 -->
    <div class="content" 
        :catchtouchmove='stop'
        :style="{'background-color' : (select == false ? '#ffffff' : 'rgba(0,0,0,0.2)')}">
      <div class="nearby-exhibition" v-for="(item, index) in searchList" :key="index" @click="getParticulars">
        <div class="nearby-left">
          <image v-if="item.picture" :src="'https://xcx.youngsay.net/'+item.picture"></image>
        </div>
        <div class="nearby-right">
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
      select: false,
      tab: 0,
      list: [
        {name: '分类'},
        {name: '全城'},
        {name: '智能分类'},
      ],
      fyList: [
        {value: '全部'},
        {value: '显示活动'},
        {value: '烟酒'},
        {value: '距离远近'},
        {value: '烟酒'},
        {value: '距离远近'},
        {value: '烟酒'},
        {value: '显示活动'},
      ],
      stop: false,
      searchList: {
        id: ''
      },
      searchKey: '',
      name: ''
    }
  },
  methods: {
    // 下拉框
    // bindShowMsg(index,select) {
    //   this.tab = index
    //   if (this.select == false) {
    //     this.select= true
    //     this.stop = true
    //   }else {
    //     this.select = false
    //     this.stop = false
    //   }
    // },
    getData() {
      request.get('/index/search', {
        name: this.name
      }).then(res => {
        this.searchList = res.data.data.list
        this.searchList.forEach(c => {
          this.searchList.id = c.id
        })
      })
    },
    // 跳转详情页
    getParticulars() {
      wx.navigateTo({
        url: `/pages/details/main?id=${this.searchList.id}`
      })
    },
    // 搜索
    handleConfirm() {
      if (this.searchKey.trim().length <= 0) {
        // 不执行后面的搜索代码
        return
      }
      this.getData()
      // 将当前的关键字保存到小程序的 stroage
      // this.keyList.unshift(this.searchKey)
      // 使用 set 进行去重
      this.keyList = [...new Set(this.searchList)]
      wx.setStorageSync('history', this.searchList)
      // 将原本的搜索页面中的关键字清除
      this.searchKey = ''
    },
  },
  onLoad(query) {
    this.name = query.key
    this.getData()
  },
  mouted() {
  }
}
</script>

<style scoped lang="sass">
@import 'search.scss';
@import '../../../static/iconfont/iconfont.css'

</style>
