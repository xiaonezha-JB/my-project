/*
*数据转换number型
*n为传入的时间段（年，月，日）
*
*/

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  
  /**
   * 时间戳转化为年 月 日 时 分 秒
   * number: 传入时间戳
   * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
  */
  function formatTime(number, format) {
  
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];
  
    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));
  
    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));
  
    for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
  }

  function js_date_time(unixtime) {
    var dateTime = new Date(parseInt(unixtime) * 1000)
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = Date.parse(now.toDateString());  //typescript转换写法
    var milliseconds = now_new - dateTime;
    var timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    return timeSpanStr;
  }
  module.exports = {
    js_date_time: js_date_time,
    formatTime: formatTime
  }