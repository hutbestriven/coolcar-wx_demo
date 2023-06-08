// pages/login/loginuser.ts
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
import { avatarUrlKey } from "../../utils/wxapi"


Page({

  /**
   * 页面的初始数据
   */
   data: {
    avatarUrl: defaultAvatarUrl,
  },
  onChooseAvatar(e:any) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
    wx.setStorageSync(avatarUrlKey, avatarUrl)
  },

  submitUserInfo() {
    var pages = getCurrentPages();
    //var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.onLoad()
    wx.navigateBack({

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
    const avatarurl = wx.getStorageSync(avatarUrlKey)
    
      console.log(avatarurl)
      if(avatarurl !== defaultAvatarUrl && avatarurl !== '') {
        this.setData({
        
          avatarUrl: avatarurl,
        })
      }
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})