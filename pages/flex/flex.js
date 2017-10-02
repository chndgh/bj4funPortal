Page({
  data:{

  },
  bindToActivity: function () {
    wx.navigateTo({
      url: '../createActivity/createActivity'
    })
  },
  bindToInformation:function(){
    wx.navigateTo({
      url: '',
    })
  }
});