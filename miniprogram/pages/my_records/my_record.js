// miniprogram/pages/records/my_record.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    
    //全局变量
    list: [1,2,3],
    //加载样式是否显示
    loading: true


  },
  switchNav: function (e) {
    var page = this;
    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    }
    else {
      page.setData({ currentTab: e.target.dataset.current });
    }
  },
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        page.setData({ winWidth: res.windowWidth });
        page.setData({ winHeight: res.windowHeight });
      },
    })

    var that = this       //很重要，一定要写
    wx.request({
      url: '',//和后台交互的地址，默认是json数据交互，由于我的就是json，这里就没有对header进行编写
      data: {},
      method: 'POST',
      success: function (res) {
        var datas=res.data;//res.data就是从后台接收到的值
        for(var i=0;i<datas.length;i++){//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
          datas[i]["consumption_date"] = time.formatTime(new Date(datas[i]["consumption_date"]))
        }
        that.setData({//循环完后，再对list进行赋值
          list: datas,
          loading: false
        })
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })


   
  }
  
})