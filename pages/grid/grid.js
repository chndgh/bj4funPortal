const APP_ID = 'wxbec75afd45b1fd25';//输入小程序appid
const APP_SECRET = 'a7e4376757ee65533ed536d0ba176d8d';//输入小程序app_secret
var OPEN_ID = ''//储存获取到openid
var SESSION_KEY = ''//储存获取到session_key
var user = {};
var CODE = '';
Page({
  getOpenIdTap: function () {
    var that = this;
    wx.login({
      success: function (res) {
        console.log("11111");
        console.log(res);
        that.CODE=res.code;
        console.log(that.CODE);
        wx.getUserInfo({
          success: function (response) {
            that.user = res.userInfo;
            console.log("22222");
            that.user.code = that.CODE;
            console.log(that.user);
            wx.request({
              //获取openid接口
              url: 'http://localhost:8080/user/login',
              data: {
                user: that.user
              },
              method: 'POST',
              success: function (res) {
                console.log(res);
                console.log(res.data)
                OPEN_ID = res.data.openid;//获取到的openid
                SESSION_KEY = res.data.session_key;//获取到session_key
                console.log(OPEN_ID.length)
                console.log(SESSION_KEY.length)
                that.setData({
                  openid: res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length),
                  session_key: res.data.session_key.substr(0, 8) + '********' + res.data.session_key.substr(res.data.session_key.length - 6, res.data.session_key.length)
                })
              }
            })
          }
        })
      }
    })
  }
})