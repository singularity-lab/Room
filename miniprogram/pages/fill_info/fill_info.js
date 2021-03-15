// miniprogram/pages/fill_info/fill_info.js
var util = require("../../utils/util.js");

Page({
  data:{
    loginBtnTxt:"确认修改",
    loginBtnBgBgColor:"rgb(1,83,139,1)",
    btnLoading:false,
    disabled:false,
    fillInfo:'请您完善或修改身份信息',
    inputUserName: '',
    inputPassword: '',
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  },
  // formSubmit:function(e){
  //   var param = e.detail.value;
  //   this.mysubmit(param);
  // },
  // mysubmit:function (param){
  //   var flag = this.checkUserName(param)&&this.checkPassword(param)
  //   if(flag){
  //       this.setLoginData1();
  //       this.checkUserInfo(param);
  //   } 
  // },
  // setLoginData1:function(){
  //   this.setData({
  //     loginBtnTxt:"修改中",
  //     disabled: !this.data.disabled,
  //     loginBtnBgBgColor:"rgba(1,83,139,1)",
  //     btnLoading:!this.data.btnLoading
  //   });
  // },
  // setLoginData2:function(){
  //   this.setData({
  //     loginBtnTxt:"确认修改",
  //     disabled: !this.data.disabled,
  //     loginBtnBgBgColor:"rgba(1,83,139,1)",
  //     btnLoading:!this.data.btnLoading
  //   });
  // },
  // checkUserName:function(param){
  //   var email = util.regexConfig().email; 
  //   var phone = util.regexConfig().phone;
  //   var inputUserName = param.username.trim();
  //   if(email.test(inputUserName)||phone.test(inputUserName)){
  //     return true;
  //   }else{
  //     wx.showModal({
  //       title: '提示',
  //       showCancel:false,
  //       content: '请输入正确的学号/工号或者手机号码'
  //     });
  //     return false;
  //   }
  // },
  // checkPassword:function(param){
  //   var userName = param.username.trim();
  //   var password = param.password.trim();
  //   if(password.length<=0){
  //     wx.showModal({
  //       title: '提示',
  //       showCancel:false,
  //       content: '请输入手机号码'
  //     });
  //     return false;
  //   }else{
  //     return true;
  //   }
  // },
  //添加
  radioChange:function(e){
       console.log(e.detail.value); 
 },
  formSubmit: function(e) {
    const db = wx.cloud.database()
    console.log(e.detail.value); 
    if(e.detail.value.type=="学生"){
   db.collection('studentInfo').add({
      data: {
        name: e.detail.value.name,
        phone: e.detail.value.phoneNumber,
        studentNumber: e.detail.value.IdNumber
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          name: e.detail.value.name,
          phone: e.detail.value.phoneNumber,
          studentNumber: e.detail.value.IdNumber
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }
  else{
    db.collection('teacherInfo').add({
      data: {
        name: e.detail.value.name,
        phone: e.detail.value.phoneNumber,
        teacherNumber: e.detail.value.IdNumber
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          name: e.detail.value.name,
          phone: e.detail.value.phoneNumber,
          teacherNumber: e.detail.value.IdNumber
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  
 
  }
    
  },
  checkUserInfo:function(param){
    var username = param.username.trim();
    var password = param.password.trim();
    var that = this;
    if((username=='admin@163.com'||username=='18500334462')&&password=='000000'){
        setTimeout(function(){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1500
          });
          that.setLoginData2();
          that.redirectTo(param);
        },2000);
    }else{
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '用户名或密码有误，请重新输入'
      });
      this.setLoginData2();
    }
  },
  redirectTo:function(param){
    //需要将param转换为字符串
    param = JSON.stringify(param);
    wx.redirectTo({
      url: '../main/index?param='+ param//参数只能是字符串形式，不能为json对象
    })
  }

})