<template>
  <div>
    <div class="input">
      <input placeholder="输入城市名或拼音查询" placeholder-style="font-size: 13px" :value="inputName" @input="bindKeyInput" @blur="bindBlur"/>
    </div>

    <div class="container-inner">
      <div class="searchLetter touchClass">
        <div class="thishotText" @click="hotCity">
          <div style="margin-top:0; color: #ed018c;">当前</div>
          <div style="margin-top:0; color: #ed018c;">热门</div>
        </div>
        <div v-for="(item, idx) in searchLetter" :key="idx" style="color:#ed018c;font-size:20rpx;" :data-letter="item.name" @click="clickLetter">
          {{ item.name }}
        </div>
      </div>

      <div class="container">

        <block v-if="isShowLetter">
          <div class="showSlectedLetter">
            {{ toastShowLetter }}
          </div>
        </block>

        <scroll-view scroll-y="true" v-bind:style="{height: winHeight + 'px'}" :scroll-into-view="scrollTopId">
          <ul class="ul" id="completelist">
            <li class="li" v-for="(item, idx) in completeList" :key="idx" :data-city="item.city" :data-code="item.code" @click="bindCity">
              {{ item.city }}
            </li>
          </ul>

          <div v-if="condition" class="hotcity-common" id="selectcounty">选择区县</div>
          <div v-if="condition" class="county">
            <div class="hotcity" v-for="(item, idx) in countyList" :key="idx">
              <div class="weui-grid" style="margin-right: 16rpx;" :data-code="item.id" :data-city="item.fullname" @click="bindCounty">
                <div class="weui-grid__label">{{ item.fullname }}</div>
              </div>
            </div>
          </div>

          <div class="selectCity">
            <!-- <div class="hotcity-common" @click="reGetLocation" id="currentcity">定位城市</div>
            <div class="thisCityName" :data-city="city" :data-code="code">{{ city }}</div> -->

            <div class="hotcity-common">热门城市</div>
            <div class="weui-grids" v-for="(cityList, idx) in hotCityList" :key="idx">
              <div class="weui-grid" :data-code="cityItem.code" :data-city="cityItem.city" @click="bindCity" v-for="cityItem in cityList" :key="cityItem.code">
                <div class="weui-grid__label">{{ cityItem.city }}</div>
              </div>
            </div>
          </div>

          <div class="selection" v-for="(item, idx) in cityList" :key="idx">
            <div class="item_letter" :id="item.initial">{{ item.initial }}</div>
            <div class="item_city" v-for="(cityItem, index) in item.cityInfo" :key="index" :data-code="cityItem.code" :data-city="cityItem.city" @click="bindCity">
              {{cityItem.city}}
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
// 导入promise、
import request from '../../utils/myrequest.js'
import city from '../../utils/city.js'
import qqmap from '../../utils/qqmap-wx-jssdk.min.js'
var demo = new qqmap({
    key: 'UGMBZ-S5AKU-YQGV3-47M5J-BAQ62-ZBBJW'
})
export default {
  props: {
    mapKey: null,
    hotCityList: []
  },
  data() {
    return {
      city: '定位中',
      county: '',
      code: '',
      countyList: [],
      searchLetter: [],
      showLetter: '',
      winHeight: 0,
      cityList: [],
      isShowLetter: false,
      // 置顶id
      scrollTopId: '',
      inputName: '',
      completeList: [],
      condition: false,
      detailAddress: '',
      toastShowLetter: '',
      sum: '',
      latitude: '',
      longitude: ''
    };
  },
  onLoad() {

  },
  created() {
    // console.log(this.mapKey);
    // console.log(this.hotCityList);
    const searchLetter = city.searchLetter;
    const cityList = city.cityList();
    const sysInfo = wx.getSystemInfoSync();
    // console.log(sysInfo);
    const winHeight = sysInfo.windowHeight;
    const itemH = winHeight / searchLetter.length;
    let tempArr = [];

    searchLetter.map(
      (item, index) => {
        let temp = {};
        temp.name = item;
        temp.tHeight = index * itemH;
        temp.bHeight = (index + 1) * itemH;
        tempArr.push(temp);
      }
    );

    this.winHeight = winHeight;
    this.itemH = itemH;
    this.searchLetter = tempArr;
    this.cityList = cityList;

    // this.getLocation();
  },
  methods: {
    // getLocation() {
    //   const mapKey = this.mapKey;
    //   const self = this;
    //   wx.getLocation({
    //     type: 'wgs84',
    //     success: function(res) {
    //       let latitude = res.latitude;
    //       let longitude = res.longitude;
    //       wx.request({
    //         url: `https://xcx.youngsay.net/weixin/index/index?location=${latitude}${longitude}&key=${mapKey}`,
    //         data: {
    //           latitude:  res.latitude,
    //           longitude :  res.longitude
    //         },
    //         success: res => {
    //           console.log(res)
    //           self.city = res.data.city;
    //           // self.code = res.data.result.ad_info.adcode;
    //           self.$emit('bindCity', {
    //             city: self.city,
    //             code: self.code
    //           })
    //         }
    //       });
    //     }
    //   })
    // },
    // selectCounty() {
    //   console.log('正在定位区县');
    //   let code = this.code;
    //   const self = this;
    //   wx.request({
    //     url: `https://apis.map.qq.com/ws/district/v1/getchildren?&id=${code}&key=${self.mapKey}`,
    //     success: function(res) {
    //       self.countyList = res.data.result[0];
    //     },
    //     fail: function() {
    //       console.log('请求区县失败，请重试');
    //     }
    //   });
    // },
    clickLetter(e) {
      const showLetter = e.currentTarget.dataset.letter;
      this.toastShowLetter = showLetter;
      this.isShowLetter = true;
      this.scrollTopId = showLetter;

      const self = this;
      setTimeout(() => {
        self.isShowLetter = false;
      }, 500);
    },
    reGetLocation() {
      this.countyList = [];
      // this.getLocation();
    },
    // 选择城市
    bindCity(e) {
      this.condition = true;
      this.city = e.currentTarget.dataset.city;
      this.code = e.currentTarget.dataset.code;
      this.scrollTopId = 'selectcounty';
      this.completeList = [];
      this.$emit('bindCity', {
        city: this.city,
        code: this.code
      });
      // this.selectCounty();
    },
    bindCounty(e) {
      this.county = e.currentTarget.dataset.city;
      const countyCode = e.mp.currentTarget.dataset.code;
      // console.log(this.county)
      this.sum = this.city + this.county
      // console.log(this.sum)
      // demo.geocoder({
      //   address: this.sum,
      //   success: function(res) {
      //     console.log(res)
      //     var res = res.result
      //     this.latitude = res.location.lat
      //     this.longitude = res.location.lng
      //   }
      // })
      // this.$emit('bindCounty', {
      //   city: this.city,
      //   code: countyCode,
      //   county: this.county,
      //   latitude: this.latitude,
      //   longitude: this.longitude
      // });
    },
    hotCity() {
      this.scrollTopId = 'currentcity';
    },
    bindScroll(e) {
      // console.log(e.detail);
    },
    bindBlur(e) {
      this.inputName = '';
    },
    bindKeyInput(e) {
      this.inputName = e.mp.detail.value;
      // 空搜索框时 取消匹配显示
      if (this.inputName.length < 1) {
        this.completeList = [];
      }
      this.scrollTopId = 'completelist';
      this.auto();
    },
    auto() {
      let inputSd = this.inputName.trim();
      let sd = inputSd.toLowerCase();
      let num = sd.length;
      const cityList = city.cityObjs;
      let finalCityList = [];

      let temp = cityList.filter(
        item => {
          let text = item.short.slice(0, num).toLowerCase();
          // eslint-disable-next-line
          return (text && text == sd);
        }
      );

      // 在城市数据中，添加简拼到“shorter”属性，就可以实现简拼搜索
      let tempShorter = cityList.filter(
        itemShorter => {
          if (itemShorter.shorter) {
            let textShorter = itemShorter.shorter.slice(0, num).toLowerCase();
            // eslint-disable-next-line
            return (textShorter && textShorter == sd);
          }
        }
      );

      let tempChinese = cityList.filter(
        itemChinese => {
          let textChinese = itemChinese.city.slice(0, num);
          // eslint-disable-next-line
          return (textChinese && textChinese == sd);
        }
      );

      if (temp[0]) {
        temp.map(
          item => {
            let testObj = {};
            testObj.city = item.city;
            testObj.code = item.code;
            finalCityList.push(testObj);
          }
        );
        this.completeList = finalCityList;
      } else if (tempShorter[0]) {
        tempShorter.map(
          item => {
            let testObj = {};
            testObj.city = item.city;
            testObj.code = item.code;
            finalCityList.push(testObj);
          }
        );
        this.completeList = finalCityList;
      } else if (tempChinese[0]) {
        tempChinese.map(
          item => {
            let testObj = {};
            testObj.city = item.city;
            testObj.code = item.code;
            finalCityList.push(testObj);
          }
        );
        this.completeList = finalCityList;
      }
    }
  }
};
</script>

<style scoped lang="sass">
@import 'city.scss';
</style>
