//logs.js
const util = require('../../utils/util.js')
const app =getApp();

Page({
  data: {
    
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
      // 调用云函数获取openid
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
          app.globalData.openid = res.result.openid
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      })
      
  },

  getUser(e) { 
    // console.log(e)
    wx.getUserInfo({
        success: (res) => {
            console.log(res)
            app.globalData.userInfo=res.userInfo
            wx.showToast({
              title: '授权成功请登陆'
            })
        }
    })
},
  check:function(){
    wx.navigateTo({
      url: '../check/check',
    })
  },
  gotoLogin:function(){
    wx.navigateTo({
      url: '../check2/check2',
    })
  },
  onGotUserInfo: function (e) {
    console.log("nickname=" + e.detail.userInfo.nickName);
  },
})
