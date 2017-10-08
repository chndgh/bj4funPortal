//app.js
var USER = {}; //pass to back end to login
var JS_CODE = ''; //store user login js_code
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        JS_CODE = res.code;
        // 获取用户信息
        wx.getSetting({
          success: res => {
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  USER = res.userInfo;
                  USER.jsCode = JS_CODE;
                  wx.request({
                    url: "http://localhost:8080/user/login",
                    data: JSON.stringify(USER),
                    method: "POST",
                    success: function (res) {
                      console.log("111111111");
                      wx.setStorageSync("userInfo", res.data.data);
                    },
                    fail: function (err) {
                      console.log(err)
                    }
                  })
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})