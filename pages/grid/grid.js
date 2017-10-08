
var USER = {}; //pass to back end to login
var JS_CODE = ''; //store user login js_code
Page({
  getOpenIdTap: function () {
    var that = this;
    wx.login({
      success: function (res) {
        JS_CODE=res.code;
        wx.getUserInfo({
          success: function (response) {
            USER = response.userInfo;
            USER.jsCode = JS_CODE;
            wx.request({
              url: "http://localhost:8080/user/login",
              data: JSON.stringify(USER),
              method: "POST",
              success: function (res) {
              },
              fail: function (err) {
                console.log(err)
              }
            })
          }
        })
      }
    })
  }
})