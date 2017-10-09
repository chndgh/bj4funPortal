// pages/activity/detailActivity/detailActivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity:{},
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.activityId);
    this.userInfo = wx.getStorageSync("userInfo");
    this.getActivityDetail(options.activityId);
  },
  getActivityDetail:function(id){
      var that = this;
      wx.request({
        url: "http://localhost:8080/activity/135101213/detail",
        data:{},
        method: "GET",
        header: {
          "Content-Type": "application/json",
          "userId": that.userInfo.subOpenId
        },
        success: function (res) {
          console.log(res);
          console.log(that.userInfo);
          that.setData({
            activity: res.data.data,
            userInfo:that.userInfo
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