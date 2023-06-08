import { routing } from "../../utils/routing"
import { avatarUrlKey } from "../../utils/wxapi"

interface Trip{
  id: string
  start: string
  end: string
  duration: string
  fee: string
  distance: string
  status: string
}

interface MainItem {
  id: string
  navId: string
  navScrollId: string
  data: Trip
}

interface NavItem {
  id: string
  mainId: string
  label: string
}

interface MainItemQueryResult {
  id: string
  top: number
  dataset: {
      navId: string
      navScrollId: string
  }
}

// pages/mytrips/mytrips.ts
Page({
  scrollStates:{
    mainItems: [] as MainItemQueryResult[],
  },

  /**
   * 页面的初始数据
   */
  data: {

    current:0,
    avatarURL:'',
    mainItems:[] as MainItem[],
    mainScroll:'',
    navItems:[] as NavItem[],
    tripsHeight:0,
    navSel:'',
    navScroll:'',

    promotionItem : [
      {
        img:'https://www.yuewen.com/css/images/ip2/book/zhuxian.jpg',
        promotionID:1,
      },
      {
        img:'https://www.yuewen.com/css/images/ip2/book/zhuixu1.jpeg',
        promotionID:2,
      },
      {
        img:'https://www.yuewen.com/css/images/ip2/book/xingchenbian.png',
        promotionID:3,
      },
      {
        img:'https://www.yuewen.com/css/images/ip2/book/wudongqiankun-min.jpg',
        promotionID:4,
      },
      {
        img:'https://www.yuewen.com/css/images/ip2/book/wudongqiankun-min.jpg',
        promotionID:5,
      },
      
    ]

  },

  onSwiperChange(){
    
  },

  onPromotionItemTap(e:any){
    console.log(e)
    const promotionId = e.currentTarget.dataset.promotionID
    if(promotionId){
      //claim this promotion
      
    }
  },

  onRegisterTap(){
    wx.navigateTo({
      //url:'/pages/register/register'
      url:routing.register(),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      avatarURL:wx.getStorageSync(avatarUrlKey), 
    })
    this.populateTrips()
  },

  populateTrips() {
    const mainItems: MainItem[] = []
    const navItems: NavItem[] = []
    let navSel = ''
    let prevNav=''
    for(let i = 0; i < 100; i++){
      const mainId = 'main-' + i
      const navId = 'nav-' + i
      const tripId = (10001 + i).toString()
      if(!prevNav){
        prevNav = navId
      }

      mainItems.push({
        id:mainId,
        navId: navId,
        navScrollId: prevNav,
        data:{
          id : tripId,
          start: '五一广场',
          end: '德思勤',
          distance: '15mile',
          duration:'0时44分',
          fee:'98.34元',
          status:'Completed',
        }
       
      })

      navItems.push({
        id:navId,
        mainId: mainId,
        label : tripId,
      })
      if(i === 0){
        navSel = navId
      }

      prevNav=navId
    }
    this.setData({
      mainItems,
      navItems,
      navSel,
    })

    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.createSelectorQuery().select('#heading')
    .boundingClientRect(rect =>{
      
      const height = wx.getSystemInfoSync().windowHeight - rect.height
      this.setData({
        tripsHeight:height,
        navCount:Math.round(height / 50)
      })
    }).exec()
  },

  onNavItemTap(e:any) {
    const mainId :string = e.currentTarget?.dataset?.mainId
    const navId:string = e.currentTarget?.id
    if(mainId && navId) {
      this.setData({
        mainScroll:mainId,
        navSel:navId,
      }, 
      ()=>{
        this.prepareScrollStates()
      } )
    }
  },

  prepareScrollStates(){
    wx.createSelectorQuery().selectAll('.main-item').fields({
      id: true,
      dataset: true,
      rect: true,
    }).exec(res =>{
      this.scrollStates.mainItems = res[0]
      console.log(res)
    })
  },

  onMainScroll(e:any){
    
    const top :number = e.currentTarget?.offsetTop + e.detail?.scrollTop
    if(top === undefined){
      return
    }

  const selItem =   this.scrollStates.mainItems.find(v => v.top>= top)
  if(!selItem){
    return
  }
  this.setData({
    navSel:selItem.dataset.navId,
    navScroll:selItem.dataset.navScrollId,
  })

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