var utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activity:{},
    userInfo:{},
    avatarUrl:"../../icons/theme.png",
    isPresent:true,
    notPresent:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      userInfo: wx.getStorageSync("userInfo")
    });
    that.getActivityDetail(options.activityId);
  },
  getActivityDetail:function(id){
      var that = this;
      console.log(that.data.userInfo);
      wx.request({
        url: utils.BASE_URL +"/activity/" + id+"/detail",
        data:{},
        method: "GET",
        header: {
          "Content-Type": "application/json",
          "userId": that.data.userInfo.subOpenId
        },
        success: function (res) {
          var act = res.data.data;
          var nowTime = new Date().getTime();
          if (act.startTime < nowTime){
            that.setData({
              notPresent : true
            })
          };
          var voterList = res.data.data.voters;
          act.startTime = utils.formatTime(new Date(act.startTime));
          act.endTime = utils.formatTime(new Date(act.endTime));
          that.setData({
            activity: act,
            avatarUrl: act.ownerUser.avatarUrl
          });
          for (var i in voterList){
            if (voterList[i].subOpenId === that.data.userInfo.subOpenId){
              that.setData({
                isPresent :false
              }); 
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
    if(that.data.activity.voters){
      for (var item in that.data.activity.voters) {
        if (that.data.activity.voters[item].subOpenId === that.data.userInfo.subOpenId) {
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
      url: utils.BASE_URL + "/activity/vote",
      data:  that.data.activity.id,
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "userId": that.data.userInfo.subOpenId
      },
      success: function (res) {
        if (res.data.status == 0 && res.data.data != null) {
          wx.navigateTo({
            url: "detail?activityId="+ that.data.activity.id
          })
        }
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