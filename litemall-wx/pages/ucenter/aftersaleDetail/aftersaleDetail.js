var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data: {
    orderId: 0,
    order: {},
    orderGoods: [],
    aftersale: {},
    
    fileList: []
  },
  onLoad: function (options) {
    //首次设置语言
    var that = this
    var app = getApp()
    this.setData({
      languageMap:app.globalData.languageMap
    })
    wx.setNavigationBarTitle({
      title:app.globalData.languageMap['售后详情']
      ,
    })
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.id,
      statusColumns: [this.data.languageMap['未申请'], this.data.languageMap['已申请，待审核'], this.data.languageMap['审核通过，待退款'], this.data.languageMap['退款成功'], this.data.languageMap['审核不通过，已拒绝']],
    typeColumns: [this.data.languageMap['未收货退款'], this.data.languageMap['不退货退款'], this.data.languageMap['退货退款']],
    });
    this.getAftersaleDetail();
  },
  getAftersaleDetail: function () {
    wx.showLoading({
      title: this.data.languageMap['加载中'],
    });

    setTimeout(function () {
      wx.hideLoading()
    }, 2000);

    let that = this;
    util.request(api.AftersaleDetail, {
      orderId: that.data.orderId
    }).then(function (res) {
      if (res.errno === 0) {
        let _fileList = []
        res.data.aftersale.pictures.forEach(function (v) {
          _fileList.push({
            url: v
          })
        });

        that.setData({
          order: res.data.order,
          orderGoods: res.data.orderGoods,
          aftersale: res.data.aftersale,
          fileList: _fileList
        });
      }

      wx.hideLoading();
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})