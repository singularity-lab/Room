// pages/check.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  studentNumberInput:function(e){
    console.log(e.detail.value)
    this.setData({
      studentNumber:parseInt(e.detail.value)
    })
  },
  check:function(e){
    var studentNumber = this.data.studentNumber
    console.log(studentNumber)
    console.log(typeof(studentNumber))
    db.collection('studentInfo').where({
      studentNumber:studentNumber
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        if(res.data.length!=0){
          wx.redirectTo({
            url: '../fill_info/fill_info',            
          })
        }else if(res.data.length==0){
          console.log(1)
          wx.showModal({
          content:"不存在该用户",
          cancelText:"完善信息",
          confirmText:"重写输入",
          success (res) {
            if (res.confirm) {
            } else if (res.cancel) {
              wx.redirectTo({
                url: '../fill_info/fill_info',            
              })
            }
          }        
        })
      }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      studentNumber:""
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
    this.setData({
      studentNumber:""
    })
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