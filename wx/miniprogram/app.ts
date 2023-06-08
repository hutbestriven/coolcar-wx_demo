// app.ts



import {coolcar} from "./service/proto_gen/trip_pb";
import camelcaseKeys from "camelcase-keys";


App<IAppOption>({
  
  // globalData: {
  //   userInfo :new Promise((resolve, reject) =>{
  //     getSetting().then(res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         return getUserInfo()
  //       }
  //       return undefined
  //     }).then(res => {
  //       if(!res){
  //         return
  //       }
  //      resolve(res.userInfo)
  //   }).catch(reject)
  //   })
  // },
  // onLaunch() {
  //   // 展示本地存储能力
  //   const logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

    // 登录


    
  
  // },
  globalData:{
    avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
   
    
  },
  async onLaunch() {
    // 登录

    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
    wx.request({
      url:'http://localhost:8080/trip/trip123',
      method:"GET",
      success:result => {
        const getTripRes = coolcar.GetTripResponse.fromObject(camelcaseKeys(result.data as object,{
          deep:true,
        }))
        console.log(getTripRes)
      },
      fail:console.error
    })
    // 获取用户信息
    
}
})