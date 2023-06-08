// pages/lock/lock.ts
import { routing } from "../../utils/routing"
import { avatarUrlKey } from "../../utils/wxapi"
const defaultAvatarUrl = ''
const shareLocationKey = "share_location"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareLocation:false,
    avtarUrl: defaultAvatarUrl,
    successavatarUrl:defaultAvatarUrl,
  },
  onChooseAvatar(e:any) {
    const { avatarUrl } = e.detail
    
    this.setData({
      avatarUrl,
    })
    getApp<IAppOption>().globalData.avatarUrl 
    
    
    this.setData({ 
      successavatarUrl: '', 
      
    shareLocation:wx.getStorageSync(shareLocationKey) || false})
    
    wx.setStorageSync(avatarUrlKey, avatarUrl)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShareLocation(e:any) {
   const shareLocation:boolean = e.detail.value
   wx.setStorageSync(shareLocationKey, shareLocation)
  },

  async onLoad(opt : Record<'car_id',string> ) {
    const o : routing.LockOpts = opt
    console.log('unlocking car',o.car_id)
    //const userInfo = await getApp<IAppOption>().globalData.userInfo
    this.setData({
      //avatarUrl: userInfo.avatarUrl,
      shareLocation:wx.getStorageSync(shareLocationKey) || false,
      avatarUrl: wx.getStorageSync(avatarUrlKey) || defaultAvatarUrl,
    })
  } , 

  onUnlockTap(){
    wx.getLocation({
      type: 'gcj02',
      success:loc=>{
        console.log('starting a trip',{
          location:{
          latitude:loc.latitude,
          longtitue:loc.longitude,
          },
          avatarUrl:this.data.shareLocation ? this.data.avtarUrl : '',
          
        })

        const tripID = 'trip456'

        wx.showLoading({
          title: 'Locking',
          mask : true,
        })

        setTimeout(()=>{
          wx.redirectTo({

            //url:`/pages/driving/driving?trip_id=${tripID}`,
            url: routing.driving({
              trip_id: tripID,
            }),
            complete: () =>{
              wx.hideLoading()
            }
          })
        },2000)
      },
      fail: () =>{
        wx.showToast({
          icon:'none',
          title: '请前往页面设置授权位置信息',
        })
      }
    })

    
    
  },
  // onGetUserInfo(e:any) {
  //   const userInfo:WechatMiniprogram.UserInfo = e.detail.userInfo
  //   if(userInfo){
  //     getApp<IAppOption>().resolveUserInfo(userInfo)
  //     this.setData({
  //       shareLocation:true,
  //     })
  //     wx.setStorageSync(shareLocationKey,true)
  //   }
  // },
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