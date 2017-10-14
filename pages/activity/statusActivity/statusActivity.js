var utils = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    activityList: [],
    status,
    sendStatus:new Array,
    activitylogo: { '100': 'health', '101': 'eat', '102': 'relax', '103': 'reset', '104': 'meeting', '105': 'study', '106': 'category_default' },
    activityStatus: { '1001': '未发布', '1002': '投票中', '1003': '待开始', '1004': '进行中', '1005': '已结束' }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.status = options.status;
    var that = this;
    console.log(this.status);
    this.userInfo = wx.getStorageSync('userInfo');
    if(this.status=="history"){
      var list = new Array();
      list.push(1005);
      that.sendStatus = list;
      that.getActivities();
    }else if(this.status=="current"){
      var list = new Array();
      list.push(1001);
      list.push(1002);
      list.push(1003);
      list.push(1004);
      that.sendStatus=list;
      that.getActivities();
    }else if(this.status=="own"){
      that.getOwnActivities();
    }
    console.log(that.data.activityList)
   
  },
  getOwnActivities:function(){
    var that = this;
    console.log(that.sendStatus);
    wx.request({
      url: "http://localhost:8080/activity/own",
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "userId": this.userInfo.subOpenId
      },
      success: function (res) {
        console.log("111111111");
        console.log(res.data.data);
        var actList = res.data.data;
        for (var item in actList) {
          console.log(actList[item]);
          actList[item].startTime = utils.formatTime(new Date(actList[item].startTime));
          console.log(actList[item].startTime);
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
    console.log(that.sendStatus);
    wx.request({
      url: "http://localhost:8080/activity/status",
      data: JSON.stringify(that.sendStatus),
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "userId": this.userInfo.subOpenId
      },
      success: function (res) {
        for(item in res.data.data){
          item.startTime = utils.formatTime(item.startTime);
          console.log("2222222");
          console.log(item.startTime);
        }
        that.setData({
          activityList: res.data.data
        });
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})