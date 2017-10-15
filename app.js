//app.js
var USER = {}; //pass to back end to login
var JS_CODE = ''; //store user login js_code
App({
  onLaunch: function () {
    console.log("onLaunch!!!")
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        JS_CODE = res.code;
        console.log("111");
        console.log(res);
        // 获取用户信息
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
      },
      fail: res =>  {
        console.log(res);
        console.log("fail.........");
      }
    });
  },
  globalData: {
    userInfo: null
  }
})