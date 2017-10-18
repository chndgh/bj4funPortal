var utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    activityList: [],
    status:"",
    sendStatus:new Array,
    activitylogo: { '100': 'health', '101': 'eat', '102': 'relax', '103': 'reset', '104': 'meeting', '105': 'study', '106': 'category_default' },
    activityStatus: { '1001': '未发布', '1002': '投票中', '1003': '待开始', '1004': '进行中', '1005': '已结束' }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.status = options.status;
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    });
    if (that.data.status=="history"){
      var list = new Array();
      list.push(1005);
      that.data.sendStatus = list;
      that.getActivities();
    } else if (that.data.status=="current"){
      var list = new Array();
      list.push(1001);
      list.push(1002);
      list.push(1003);
      list.push(1004);
      that.data.sendStatus=list;
      that.getActivities();
    }else if(that.data.status=="own"){
      that.getOwnActivities();
    }
  },
  getOwnActivities:function(){
    var that = this;
    wx.request({
      url: utils.BASE_URL + "/activity/own",
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "userId": that.data.userInfo.subOpenId
      },
      success: function (res) {
        var actList = res.data.data;
        for (var item in actList) {
          actList[item].startTime = utils.formatTime(new Date(actList[item].startTime));
        }
        that.setData({
          activityList: actList
        });
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  getActivities: function () {
    var that = this;
    console.log(that.data.userInfo);
    wx.request({
      url: utils.BASE_URL + "/activity/status",
      data: JSON.stringify(that.data.sendStatus),
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "userId": that.data.userInfo.subOpenId
      },
      success: function (res) {
        that.setData({
          activityList: res.data.data
        });
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})