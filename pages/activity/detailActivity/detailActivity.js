// pages/activity/detailActivity/detailActivity.js
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity:{},
    userInfo:{},
    isPresent:true,
    isEdit:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userInfo = wx.getStorageSync("userInfo");
    this.getActivityDetail(options.activityId);
  },
  getActivityDetail:function(id){
      var that = this;
      wx.request({
        url: "http://localhost:8080/activity/" + id+"/detail",
        data:{},
        method: "GET",
        header: {
          "Content-Type": "application/json",
          "userId": that.userInfo.subOpenId
        },
        success: function (res) {
          var act = res.data.data;
          var voterList = res.data.data.voters;
          act.startTime = utils.formatTime(new Date(act.startTime));
          act.endTime = utils.formatTime(new Date(act.endTime));
          that.setData({
            activity: act,
            userInfo:that.userInfo
          });
          console.log("2222222222");
          console.log(that.data.activity);
          if (that.userInfo.subOpenId === act.ownerUser._id){
            that.isEdit = true;
          }
          for (var i in voterList){
            if (voterList[i].id === that.data.userInfo.subOpenId){
              console.log("6666");
              that.isPresent = false; 
            }
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
  },

  bindVote:function(){
    var that = this;
    console.log("bindVote");
    console.log(that.data.activity);
    if(that.data.activity.voters){
      console.log("999999999999999");
      for (var item in that.data.activity.voters) {
        console.log("0000000000000");
        if (that.data.activity.voters[item]._id === that.data.userInfo._id) {
          console.log("8888888888888888")
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '您已经报过名了',
            success: function (res) {
              if (res.confirm) {

              }
            }
          })
          return
        }
      }
    }
    wx.request({
      url: "http://localhost:8080/activity/vote",
      data:  that.data.activity.id,
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "userId": that.data.userInfo.subOpenId
      },
      success: function (res) {
        if (res.data.status == 0 && res.data.data != null) {
          wx.navigateTo({
            url: "detailActivity/detailActivity?activityId="+ that.data.activity.id
          })
        }
        console.log(res);
        if (res.data.status == 1 && res.data.data == null) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.msg,
            success: function (res) {
              if (res.confirm) {

              }
            }
          })
        }
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