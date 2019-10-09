<template>
  <div>
    <SwitchCity
      :mapKey="mapKey"
      :hotCityList="hotCityList"
      @bindCity="bindCity"
      @bindCounty="bindCounty"
    />
  </div>
</template>

<script>
import SwitchCity from '../city/city';
import config from '../../utils/mapConfig';

export default {
  computed: {
    mapKey() {
      return config.key;
    },
    hotCityList() {
      return [
        [
          {city: '北京市', code: '110000'},
          {city: '上海市', code: '310000'},
          {city: '广州市', code: '440100'}
        ],
        [
          {city: '深圳市', code: '440300'},
          {city: '杭州市', code: '330100'},
          {city: '南京市', code: '320100'}
        ],
        [
          {city: '武汉市', code: '420100'},
          {city: '天津市', code: '120000'},
          {city: '西安市', code: '610100'}
        ]
      ];
    }
  },
  components: {
    SwitchCity: SwitchCity
  },
  methods: {
    // TODO: 选择城市之后的逻辑事件
    bindCity(e) {
      // console.log(e)
      wx.setStorage({
        key: 'CITY_INFO',
        data: e
      });
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
    },
    // 选择区县
    bindCounty(e) {
      wx.setStorage({
        key: 'CITY_INFO',
        data: e
      })
    }
  }
};
</script>
