const severUrl = 'https://xcx.youngsay.net/weixin'
function request(url, method = 'GET', data = {}, header = {}) {
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '加载中'
        })
        // 逻辑处理
        wx.request({
            url: severUrl + url,
            method: method,
            data: data,
            success: res => {
                resolve(res)
                wx.hideLoading()
            },
            fail: err => {
                reject(err)
            }
        })
    })
}
// 封装一个get方法
request.get = function (severUrl, data = {}) {
    return request(severUrl, 'GET', data)
}
// post
request.post = function (severUrl, data = {}) {
    return request(severUrl, 'POST', data)
}

// 封闭一个验证是否登录的方法
request.auth = function (severUrl, method, data = {}) {
    // 得到token
    var token = wx.getStorageSync('token')
    if (!token) {
        wx.navigateTo({
            url: '/pages/auth/main'
        })
        return new Promise(() => {})
    }
    // 如果存在，就直接发送请求
    return request(severUrl, method, data, {"Authoiization": token})
}

export default request