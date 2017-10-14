// pages/selfInfo/selfInfo.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    year:'',
    month:'',
    day:'',
    actStTime:'',
    startDate:'',
    startTime:'',
    endDate:'',
    endTime:'',
    address:'',
    cost:'',
    peoplenumner:'',
    activitytypeIndex:'',
    array:['体育活动','聚餐','休闲娱乐','旅游','学习','会议'],
    publicity: '',
    description: '',
    activityItem: {}
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      activitytypeIndex: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindThemeInput:function(e){
    this.setData({
      title: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindStartDateChange: function (e) {
    this.setData({
      startDate: e.detail.value,
      actStTime: e.detail.value
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
  bindActivityAddressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindCostChange: function (e) {
    this.setData({
      cost: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindPeopleNumberChange: function (e) {
    this.setData({
      peoplenumber: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindActivityPublicity: function (e) {
    this.setData({
      Publicity: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindActivityDescInput: function (e) {
    this.setData({
      description: e.detail.value
    })
    console.log(e.detail.value)
  },
  formSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    console.log(e.detail.value.startDate + " " + e.detail.value.startTime);
    var startTime = e.detail.value.startDate + " " + e.detail.value.startTime;
    var endTime = e.detail.value.endDate + " " + e.detail.value.endTime;

    /* tile, time, address must not empty */
    if (e.detail.value.title == "" ||
                  e.detail.value.address == "" ||
                  e.detail.value.startDate == "" ||
                  e.detail.value.startTime == "" ||
                  e.detail.value.endDate == "" ||
                  e.detail.value.endTime == "") {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写完整信息',
        success: function (res) {
          if (res.confirm) {

          }
        }
      })
      return;
    }
    /* End time must bigger than start time */
    if (endTime < startTime) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '活动结束时间需要晚于开始时间',
        success: function (res) {
          if (res.confirm) {

          }
        }
      })
      return;
    }


    this.activityItem = { id: 1, title: e.detail.value.title, startTime: startTime, endTime: endTime, address: e.detail.value.address, cost: e.detail.value.cost, people: e.detail.value.peoplenumber, activitytype: that.data.array[e.detail.value.activitytype], publicity:e.detail.value.publicity, description: e.detail.value.description }
    console.log(this.activityItem);

    wx.request({
      url: "http://localhost:8080/activity/create",
      data: { id: 1, title: e.detail.value.title, startTime: startTime, endTime: endTime, address: e.detail.value.address, cost: e.detail.value.cost, people: e.detail.value.peoplenumber, activitytype: that.data.array[e.detail.value.activitytype], publicity: e.detail.value.publicity, description: e.detail.value.description },
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
 
    // 通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      year: date.getFullYear(),
      month : date.getMonth() + 1,
      day : date.getDate(),
      actStTime:year+month+day
    });  
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
  
  },
})