// index.ts
// 获取应用实例
import { routing } from "../../utils/routing"
import { avatarUrlKey } from "../../utils/wxapi"

Page({
  isPageShowing :false,
  data:{
    avatarURL:'' ,
    userInfo: '' ,
    setting:{
    skew: 0,
    rotate: 0,
    showLocation: true,
    showScale: true,
    subKey: '',
    layerStyle: -1,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    showCompass: false,
    enable3D: false,
    enableOverlooking: false,
    enableSatellite: false,
    enableTraffic: false,
    },
    location:{
        latitude: 23.0999994,
        longitude: 113.324520,
  },
  scales:10,
  markers :[
    {
        iconPath:"/resources/car.png",
        id:0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50,
    },
    {
      iconPath:"/resources/car.png",
      id:1,
      latitude: 23.099994,
      longitude: 114.324520,
      width: 50,
      height: 50,
    }
  ],
  
    },
    
  async  onLoad(){
      const avatarurl = wx.getStorageSync(avatarUrlKey)
      console.log(avatarUrlKey)

      // wx.login({
        
      //  success:function(){
       
      //   wx.getUserInfo({
      //     success:function(res){
      //       userInfo.avatarUrl = res.avatarUrl
      //       var simpleUser = res.userInfo
      //       console.log(simpleUser.avatarUrl)
            
      //     },
          
      //   })
        
      //  },
       
      // })
      
      // this.setData({
      //   avatarURL : userInfo.avatarUrl
      // })
      this.setData({
        avatarURL : avatarurl,
        
      })
      
    },

    onMytripsTap(){
      const avatarURL = wx.getStorageSync(avatarUrlKey)
      if(avatarURL !== ''){
        wx.navigateTo({
          //url: '/pages/mytrips/mytrips'
          url:routing.mytrips()
        })
      }else{
        wx.navigateTo({
          url: '/pages/login/loginuser'
        })
      }
      
    },

    onMyLocationTap(){
      wx.getLocation({
        type: 'gcj02',
        success: res => {
          this.setData({
            location:{
              latitude: res.latitude,
              longitude: res.longitude,
            },
          })
        },
        fail :() =>{
          wx.showToast({
            title: '定位失败,请前往设置页授权',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },

    onScanClicked(){
      wx.scanCode({
        success: async  () => {
          await this.selectComponent('#licModal').showModal()
          this.setData({
            showModal: true,
          })
          
          const carID = 'car123'
          //const redirectURL = `/pages/lock/lock?car_id=${carID}`
          const redirectURL = routing.lock({
            car_id: carID,
          })
          wx.navigateTo({
            //url: `/pages/register/register?redirect=${encodeURIComponent(redirectURL) }`,
            url: routing.register({
              redirectURL: redirectURL
            })
          })
          //get car id from scan result
         
        },
        fail: console.error,
      })
    },
    

    onShow(){
      this.setData({
        isPageShowing: true,
      })
    },
    onHide(){
      this.setData({
        isPageShowing: false,
      })
    },
    moveCars(){
      const map = wx.createMapContext("map");
      const dest={
        latitude : 23.0999994,
        longitude : 113.324520,
      }

      const moveCar = () =>{
        dest.latitude += 0.1
        dest.longitude += 0.1
        map.translateMarker({
          destination: {
            latitude: dest.latitude ,
            longitude: dest.longitude ,
          },
          duration: 5000,
          autoRotate: false,
          markerId: 0,
          rotate: 0,
          animationEnd:() =>{
            if(this.isPageShowing){
              moveCar()
            }
          },
        })
      }
      moveCar()
    },

    
    
})
