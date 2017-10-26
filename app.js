//app.js
const utils = require('utils/util.js');
var USER = {}; //pass to back end to login
var JS_CODE = ''; //store user login js_code
App({
  onLaunch: function () {},
  globalData: {
    userInfo: null
  }
})