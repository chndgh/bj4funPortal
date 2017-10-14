// pages/activity/historyActivity/historyActivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    activityList: [],
    status,
    sendStatus:new Array,

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
        that.setData({
          activityList: res.data.data
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