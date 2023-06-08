import { routing } from "../../utils/routing"

// pages/register/register.ts
Page({
  redirectURL:'',
  data: {
    gendersIndex: 0,
    licNo:'',
    name:'',
    birthDate :'1990-01-01',
    genders:['未知','男','女','其他人'],
    licImgURL:undefined as string | undefined | WechatMiniprogram.MediaFile,
    verifyImgURL:undefined as string | undefined | WechatMiniprogram.MediaFile,
    state:'UNSUBMITTED' as 'UNSUBMITTED' | 'PENDING' | 'VERIFIED',
  },

  onLoad(opt:Record<'redirect',string> ){
    const o : routing.RegisterOpts = opt
    if(o.redirect){
      this.redirectURL = decodeURIComponent(o.redirect) 
    }
  },

  onUploadLic(){
    wx.chooseMedia({
      success: res =>{
        if(res.tempFiles.length > 0){
          this.setData({
            licImgURL:res.tempFiles[0].tempFilePath as string,
            
          })
          //TODO:upload image
        setTimeout(() =>{
          this.setData({
            licNo:'32141324124',
            name:'zhangsan',
            gendersIndex:1,
            birthDate:'1999-12-12',
          })
        },1000)
        }
        
      }
    })
  },
  onGenderChange(e :any){
    this.setData({
      gendersIndex:e.detail.value,
    })
  },

  onBirthDateChange(e :any){
    this.setData({
      birthDate:e.detail.value,
    })
  },

  onSubmit(){
    this.setData({
          state:'PENDING',
        })
      setTimeout(() => {
        this.onLicVerified()
      },3000)
  },
  ReSubmit(){
    this.setData({
              state:'UNSUBMITTED',
              licImgURL:undefined,
            })
  },

  onLicVerified(){
    this.setData({
                 state:'VERIFIED',
             })

             if(this.redirectURL)
             {
              wx.redirectTo({
                url:this.redirectURL,
              })
             }
    
  }
})