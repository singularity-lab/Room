// miniprogram/pages/index/index.js
var app = getApp()
Page({
  data: {
    motto: '会议室预约',

    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toLoginView:function(){
     wx.navigateTo({
      url: '../fill_info/fill_info'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})