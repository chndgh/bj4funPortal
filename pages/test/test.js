
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["已参加活动", "创建活动","所有活动"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    inputActivityTitle: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    description: ''
  },
  bindTitleChange: function (e) {
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
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    console.log(e.detail.value.startDate + " " + e.detail.value.startTime);
    var startTime = e.detail.value.startDate + " " + e.detail.value.startTime;
    var endTime = e.detail.value.endDate + " " + e.detail.value.endTime;
    this.activityItem = { id: 1, title: e.detail.value.title, startTime: startTime, endTime: endTime, description: e.detail.value.description }
    console.log(this.activityItem);
    wx.request({
      url: "https://ec9aa434.ngrok.io/activity/create",
      data: { id: 1, title: e.detail.value.title, startTime: startTime, endTime: endTime, description: e.detail.value.description },
      method: "POST",
      header: {
        "Content-Type": "application/json"
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
  successdeliver: function (){
    wx.navigateTo({
      url: "../success_deliver/success_deliver"
    })
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  bindTitleChange: function (e) {
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
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
});

