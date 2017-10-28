var utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    activityList: [],
    delStyle:"",
    status:"",
    startX:0,
    delBtnWidth:150,
    sendStatus:new Array,
    activitylogo: { '100': 'health', '101': 'eat', '102': 'relax', '103': 'reset', '104': 'meeting', '105': 'study', '106': 'category_default' },
    activityStatus: { '1001': '未发布', '1002': '投票中', '1003': '待开始', '1004': '进行中', '1005': '已结束' }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      status: options.status
    });
    that.getActivities();
  },
  getActivities:function(){
    var that = this;
    if (that.data.status == "history") {
      var list = new Array();
      list.push(1005);
      that.data.sendStatus = list;
      that.getHistoryOrCurrentActivities();
    } else if (that.data.status == "current") {
      var list = new Array();
      list.push(1001);
      list.push(1002);
      list.push(1003);
      list.push(1004);
      that.data.sendStatus = list;
      that.getHistoryOrCurrentActivities();
    } else if (that.data.status == "own") {
      that.getOwnActivities();
    }
  },
  touchStart: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置  
        startX: e.touches[0].clientX
      });
    }
  },
  touchMove: function (e) {

    var that = this
    //initdata(that)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置  
      var moveX = e.touches[0].clientX;
   
      //手指起始点位置与移动期间的差值  
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变  
        txtStyle = "margin-left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离  
        txtStyle = "margin-left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度  
          txtStyle = "margin-left:-" + delBtnWidth + "px";
        }
      }

      //获取手指触摸的是哪一项  
      var index = e.currentTarget.id;
      console.log("33333333333333333333")
      console.log(e)
      var list = this.data.activityList;
      list[index].txtStyle = txtStyle;
      //更新列表的状态  
      this.setData({
        activityList: list
      });
    }
  },
  touchEnd: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置  
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离  
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮  
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";

      //获取手指触摸的是哪一项  
      var index = e.currentTarget.id;
      var list = this.data.activityList;
      list[index].txtStyle = txtStyle;
      //更新列表的状态  
      this.setData({
        activityList: list
      });
      
    }
  },
  deletActivity: function(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        //获取列表中要删除项的下标  
        var index = e.currentTarget.id;
        console.log(e)
        var list = that.data.activityList;
        console.log(list)
        console.log(index);
        var deleteId = list[index].id;
        if (res.confirm) {
          wx.request({
            url: utils.BASE_URL + "/activity/" + deleteId+"/delete",
            method: "DELETE",
            header: {
              "Content-Type": "application/json",
              "userId": that.data.userInfo.subOpenId
            },
            success: function (res) {
              console.log("删除成功");
              //移除列表中下标为index的项 
              list.splice(index, 1);
            },
            fail: function (err) {
              list[index].txtStyle = "";
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: '无法连接服务器，请重试',
                success: function (res) {
                  console.log(err)
                }
              })
            }
          })
        } else {
          list[index].txtStyle = "";
        }
        //更新列表的状态  
        that.setData({
          activityList: list
        });
      }
    }) 
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    this.getActivities();
  },
  getOwnActivities:function(){
    var that = this;
    wx.request({
      url: utils.BASE_URL + "/activity/own",
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "userId": that.data.userInfo.subOpenId
      },
      success: function (res) {
        var actList = res.data.data;
        for (var item in actList) {
          actList[item].startTime = utils.formatTime(new Date(actList[item].startTime));
        }
        console.log(actList);
        that.setData({
          activityList: actList
        });
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  getHistoryOrCurrentActivities: function () {
    var that = this;
    wx.request({
      url: utils.BASE_URL + "/activity/status",
      data: JSON.stringify(that.data.sendStatus),
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "userId": that.data.userInfo.subOpenId
      },
      success: function (res) {
        var actList = res.data.data;
        for (var item in actList) {
          actList[item].startTime = utils.formatTime(new Date(actList[item].startTime));
        }
        that.setData({
          activityList: res.data.data
        });
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})