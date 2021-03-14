// pages/check.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  jobNumberInput:function(e){
    console.log(e.detail.value)
    this.setData({
      jobNumber:parseInt(e.detail.value)
    })
  },
  check:function(e){
    var jobNumber = this.data.jobNumber
    console.log(jobNumber)
    console.log(typeof(jobNumber))
    db.collection('teacherInfo').where({
      jobNumber:jobNumber
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
          content:"不存在该用户，请重新输入！",
          cancelText:"返回",
          confirmText:"重写输入",
          success (res) {
            if (res.confirm) {
            } else if (res.cancel) {
              wx.navigateBack({
                delta: 0,
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
      jobNumber:""
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
      jobNumber:""
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