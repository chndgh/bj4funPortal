var utils = require('../../utils/util.js');
var USER = {}; //pass to back end to login
var JS_CODE = ''; //store user login js_code
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();
Page({
  data: {
    tabs: ["所有活动", "创建活动"],
    current:"current",
    history:"history",
    own:"own",
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    activityList:[],
    userInfo:{},
    title: '',
    year: '',
    month: '',
    day: '',
    actStTime: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    address: '',
    cost: '',
    peoplenumner: '',
    activitytypeIndex: '',
    array: ['运动', '聚餐', '休闲娱乐', '旅游', '学习', '会议'],
    isOpen: 1,
    description: '',
    activityStatus: {'1001':'未发布', '1002':'投票中', '1003':'待开始', '1004':'进行中', '1005':'已结束'},
    activitylogo: { '100': 'health', '101': 'eat', '102': 'relax', '103': 'reset', '104': 'meeting', '105': 'study' , '106':'category_default'},
    activityItem: {}
  },
  onLoad: function () {
    var that = this;
    console.log("activity on Load");
    // that.data.userInfo = wx.getStorageSync('userInfo');
    // console.log(that.data.userInfo);


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        JS_CODE = res.code;
        // 获取用户信息
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            USER = res.userInfo;
            USER.jsCode = JS_CODE;
            wx.request({
              url: utils.BASE_URL+"/user/login",
              data: JSON.stringify(USER),
              method: "POST",
              success: function (res) {
                wx.setStorageSync("userInfo", res.data.data);
                that.data.userInfo = wx.getStorageSync('userInfo');
                that.getAvaliableActivities();
              }
            })
            
          }
        })
      }
    })










    // this.getAvaliableActivities();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    // 通过setData更改Page()里面的data，动态更新页面的数据  
    var date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 2;
    this.day = date.getDate();
    this.actStTime = this.year + this.month + this.day
     
  },
  getAvaliableActivities: function () {
    var that = this;
    console.log("7777777777777777")
    console.log(that.data.userInfo);
    console.log(that.data.userInfo.subOpenId);
    wx.request({
      url: utils.BASE_URL+"/activity/available",
      data: {},
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "userId": that.data.userInfo.subOpenId
      },
      success: function (res) {
        console.log("activity getavailableactivity")
        console.log(res);
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
  },

  bindPickerChange: function (e) {
    this.setData({
      activitytypeIndex: e.detail.value
    })
  },
  bindThemeInput: function (e) {
    this.setData({
      title: e.detail.value
    })
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
  },
  bindCostChange: function (e) {
    this.setData({
      cost: e.detail.value
    })
  },
  bindPeopleNumberChange: function (e) {
    this.setData({
      peoplenumber: e.detail.value
    })
  },
  bindActivityDescInput: function (e) {
    this.setData({
      description: e.detail.value
    })
  },
  
  formSubmit: function (e) {
    var that = this;
    var startTime = new Date(e.detail.value.startDate + " " + e.detail.value.startTime).getTime();
    var endTime = new Date(e.detail.value.endDate + " " + e.detail.value.endTime).getTime();
    console.log("111");
    console.log(new Date(e.detail.value.startDate + " " + e.detail.value.startTime));
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
    that.isOpen = e.detail.value.isOpen?1:0;
    that.category = 100+parseInt(e.detail.value.category);
    console.log(that.category);
    that.activityItem = { title: e.detail.value.title, startTime: startTime, endTime: endTime, address: e.detail.value.address, cost: e.detail.value.cost, maxCount: e.detail.value.peoplenumber, category: that.category, isOpen: that.isOpen, description: e.detail.value.description }
    wx.request({
      url: utils.BASE_URL+"/activity/create",
      data: JSON.stringify(that.activityItem),
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "userId": that.data.userInfo.subOpenId
      },
      success: function (res) {
        console.log(res);
        if(res.data.status==0&&res.data.data!=null){
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '发布成功',
            success: function (res) {
              console.log(res);
              if (res.confirm) {
                wx.navigateTo({
                  url: "../status/status?status=own"
                })
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
  formReset: function () {
    console.log('form发生了reset事件')
  }
  
});

