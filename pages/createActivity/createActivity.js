// pages/selfInfo/selfInfo.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputActivityTitle:'',
    startDate:'',
    startTime:'',
    endDate:'',
    endTime:'',
    description:'',
    activityItem:{}
  },
  bindTitleChange:function(e){
    this.setData({
      inputActivityTitle: e.detail.value
    })
  },
  bindStartDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  bindDescChange: function (e) {
    this.setData({
      description: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    console.log(e.detail.value.startDate + " " + e.detail.value.startTime);
    var startTime = e.detail.value.startDate + " " + e.detail.value.startTime;
    var endTime = e.detail.value.endDate + " " + e.detail.value.endTime;
    this.activityItem = { id: 1, title: e.detail.value.title, startTime: startTime, endTime: endTime, description: e.detail.value.description }
    console.log(this.activityItem);
    wx.request({
      url: "http://localhost:8080/activity/create",
      data: { id: 1, title: e.detail.value.title, startTime: startTime, endTime: endTime, description: e.detail.value.description },
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "userId": this.userInfo.subOpenId
      },
      success: function (res) {
        console.log(res.data)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  successdeliver: function () {
    wx.navigateTo({
      url: "../success_deliver/success_deliver"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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