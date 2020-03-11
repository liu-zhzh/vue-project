<template>
    <div class="header">
        <div class="top">
          <div class="avatar">
            <img :src="seller.avatar" alt="">
          </div>
          <div class="info">
            <div class="title">
              <i class="brand"></i>
              <span class="name">{{seller.name}}</span>
            </div>
            <div class="dsc">
              <span class="dscInfo">{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
            </div>
            <div class="support" v-if="seller.supports">
              <!-- <i class="icon"></i> -->
              <ele-icon :size="1" :type="seller.supports[0].type"></ele-icon>
              <span class="text">{{seller.supports[0].content}}</span>
            </div>
          </div>
          <div class="btn" @click="maskShow = true" v-if="seller.supports">
            <span class="num">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
        <div class="bulletin" @click="maskShow = true">
          <div class="left">
            <i class="icon">

            </i>
            <span class="text">
             {{seller.bulletin}}
            </span>
          </div>
          <i class="icon-keyboard_arrow_right right"></i>
        </div>
        <div class="bg">
            <img  src="seller.bgImg" alt="">
        </div>
        <transition name="mask">
          <div class="mask" v-show="maskShow">
            <div class="mask_wrap">
              <div class="mask_main">
                <div class="title">
                  嘉禾一品（温都水城）
                </div>
                <div class="starsWrap">
                  <ele-start  class="stars" :size="36" :score="seller.score">
                  </ele-start>
                </div>              
                <ele-line class="line">
                  <span>优惠信息</span>
                </ele-line>
                <ele-list class="list" :supports="seller.supports">
                </ele-list>
                <ele-line class="line">
                  <span>商家公告</span>
                </ele-line>
                <p class="bulletin">
                  {{seller.bulletin}}
                </p>
              </div>
            </div>
            <div class="mask_footer" @click="maskShow = false">
              <i class="icon-close close"></i>
            </div>
          
          </div>
        </transition>
    </div>
</template>
<script>
import icon from 'components/ele-icon/ele-icon.vue'
import line from 'components/ele-line/ele-line.vue'
import list from 'components/ele-list/ele-list.vue'
import stars from 'components/ele-stars/ele-stars.vue'



export default {
  name: 'ele-header',
  props:{
    seller:Object
  },
  data() {
    return {
      maskShow:false
    }
  },
  // methods: {
  //   maskShow(){
  //     this.maskShow = true
  //   },
  //   closeMask(){
  //     this.closeMask = false

  //   }
  // },
  components:{
    "ele-icon":icon,
    "ele-line":line,
    "ele-list":list,
    "ele-start":stars,
  }
}
</script>

<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl"
.header
  background gray
  position relative
  background rgba(7,17,27,.5)
  overflow hidden
  & > .top
    position relative
    padding 24px 0 18px 24px
    .avatar
      display inline-block
      vertical-align top
      width 64px
      height 64px
      border-radius 2px
      overflow hidden
      margin-right 16px
      img 
        width 100%
        height 100%
    .info
      vertical-align top
      display inline-block
      margin-top 4px
      margin-left 16px
      color rgba(255,255,255,1)
      max-width 200px   
      .dsc
        font-size 12px
      .support
        font-size 10px
        margin-top 10px
        margin-bottom 2px 
        white-space nowrap
        overflow hidden
        text-overflow ellipsis          
        .text
          vertical-align top
      .title   
        font-size 16px
        margin-top 2px
        margin-bottom 8px
        .brand
          vertical-align top
          display inline-block
          width 30px
          height 18px
          margin-right 3px
          bg-image(brand)
          background-size 100%
        .name
          vertical-align top
          font-weight 800
    .btn
      width 48px
      height 24px
      font-size 10px
      line-height 24px
      background rgba(0,0,0,.2)
      border-radius 14px
      text-align center
      position absolute
      right 12px
      bottom 36px
      color rgba(255,255,255,1)

  & > .bulletin
    position relative
    font-size 10px
    width 100%
    height 28px
    line-height 28px
    color rgba(255,255,255,1)
    font-weight 200 
    background rgba(7,17,27,.2)
    .left
     overflow hidden
     text-overflow ellipsis
     white-space nowrap 
     height 100%
     margin-right 26px
     .icon
       bg-image(bulletin)
       background-size 100%
       background-repeat no-repeat
       display inline-block
       width 22px
       height 12px
       margin-left 12px
       margin-right 4px
       position relative
       top 1px 
    .right
      position absolute
      right 12px
      bottom 8px
  & > .bg
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background pink 
    filter blur(3px)
    z-index -1
    img 
      width 100%
      height 100%
  & > .mask
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    background rgba(7,17,27,.8)
    z-index 6  
    padding-top 64px
    backdrop-filter blur(6px)
    .mask_wrap
      min-height 100%
    .mask_main
      padding-bottom 96px

      .title
        font-size 16px
        line-height 16px
        font-weight 700
        color rgba(255,255,255,1)
        text-align center
      .starsWrap
        text-align center
        margin-top 16px  
        margin-bottom 28px 
      .line
        width 80%   
        margin 0 auto
      .list
        width 80%   
        margin 0 auto
        margin-top 24px
        margin-bottom 28px
      .bulletin
        width 80%
        margin 0 auto
        font-size 12px
        line-height 24px
        color white
        font-weight 200
        padding 0 12px
    .mask_footer
      margin-top -96px
      padding 32px 0
      text-align center
      .close
        font-size 32px
        color rgba(255,255,255,1)

















































</style>



