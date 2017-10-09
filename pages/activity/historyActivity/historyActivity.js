// pages/activity/historyActivity/historyActivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    activityList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("222222");
    console.log(options.status);
    this.userInfo = wx.getStorageSync('userInfo');
    this.getAvaliableActivities();
  },
  openConfirm:function(){
    wx.showModal({
      title: '弹窗标题',
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      confirmText: "主操作",
      cancelText: "辅助操作",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  getAvaliableActivities: function () {
    var that = this;
    wx.request({
      url: "http://localhost:8080/activity/availableActivity",
      data: {},
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