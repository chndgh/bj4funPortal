// pages/activity/voterList/voterList.js
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityId:'',
    voterList:[],
    userInfo:{},
    activity:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    });
    this.data.activityId = options.activityId;
    this.getActivityById(options.activityId);
  },

  getActivityById:function(activityId){
    var that = this;
    wx.request({
      url: utils.BASE_URL + "/activity/" + activityId + "/detail",
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "userId": that.data.userInfo.subOpenId
      },
      success: function (res) {
        that.setData({
          voterList: res.data.data.voters,
          activity:res.data.data
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