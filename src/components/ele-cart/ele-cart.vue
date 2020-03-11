<template>
<div>
    <div class="cart">
      <div class="left" @click="foldFn" style="color:white">
          <div class="icon">
              <div class="logo" :class="{active:totalCount > 0}">
                  <i class="icon-shopping_cart"></i>                   
              </div>
              <span class="bubble" v-show="totalCount > 0">{{totalCount}}</span>
          </div>
          <div class="totalPrice" :class="{active:totalPrice > 0}">
              <span>¥{{totalPrice}}元</span>
          </div>
          <div class="deliveryPrice">
              <span>另需配送费¥{{seller.deliveryPrice}}元</span>
          </div>
      </div>
      <div class="right" :class="{active:totalPrice > this.seller.minPrice}">
          <span v-if="rightText">{{rightText}}</span>
      </div>
      <div class="balls">
            <transition v-for="(ball, index) in balls" :key="index" 
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter">
            <i class="ball" v-show="ball.show"></i>
            </transition>
      </div>
    </div>
    <div class="list" v-show="listshow" >
        <div class="header">
            <span class="cartText">购物车</span>
            <span class="clear" @click="clear">清空</span>
        </div>
        <div class="content" ref="listContent">
            <ul>
                <li class="item" v-for="(selectedFood, index) in selectedFoods" :key="index">
                    <span class="left">
                        {{selectedFood.name}}
                    </span>
                    <div class="right">
                        <span class="price">
                            ¥{{selectedFood.price * selectedFood.count}}
                        </span>
                        <ele-contorl class="contorl" :food="selectedFood"></ele-contorl>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="mask" v-show="false">

    </div>
</div>

</template>
<script>
import contorl from 'components/ele-contorl/ele-contorl.vue'
import BScroll from 'better-scroll'
import {transform} from '../../util/transform'
export default {
    nameL:"elecart",
    components:{
        "ele-contorl":contorl
    },
    props:{
        selectedFoods:Array,
        seller:Object
    },
    data() {
        return {
            // 定义数组里面是小球要显示与否的状态
            balls:[
                {show:false},
                {show:false},
                {show:false},
                {show:false},
                {show:false}
            ],
            dropBalls:[],
            // 是否折叠
            flod:true
        }
    },                                                                          
    methods: {
        clear(){
            // 触发清除事件
            this.$emit("clear")
        },   
        // 判断控制折叠的切换状态
        foldFn(){
            if(this.totalCount <= 0){
                // 如果list没有添加数据则不执行以下代码，对折叠的状态不进行切换
                return
            }
            this.flod = !this.flod
        } ,
        dropBall(target){
            // console.log(target);
            //找出不在运动中的小球开始运动
            for (let i = 0; i < this.balls.length; i++) {
                const ball = this.balls[i];
                // 如果不是在运动的小球
                if(!ball.show){
                    // 状态改为true让他开始运动
                    ball.show = true
                    // 获取传递过来的节点，为了让beforeEnter读取到target的信息将其绑给ball对象
                    ball.target = target
                    // console.log(event.target);
                    // 添加到一个新的空数组,这个数组用来存放正在运动的小球状态为true
                    this.dropBalls.push(ball)
                    return
                }

            }
        },
        // 小球状态发送改变的时候触发动画的三个钩子，第一帧，开始动画，动画结尾
        beforeEnter(el){
            // 确定小球的位置
            // 小球的数量
            // console.log(el);
            let count = this.balls.length
            // 如果小球是要开始运动的就计算小球的位置开始动画 
            while (count--) {
                // 从数组后面的小球开始找
                let ball = this.balls[count]
                if(ball.show){
                    // 视口的高度
                    let viewH = document.documentElement.clientHeight
                    // getBoundingClientRect()方法获取元素到视口的上左下右的距离
                    let targetRect = ball.target.getBoundingClientRect()
                    let X = targetRect.left - 28
                    let Y = viewH - targetRect.top - 45
                    transform(el,"translateX",X)
                    transform(el,"translateY",-Y)
                    break
                }

            }
        },
        enter(el){
            // 手动强制让浏览器渲染一遍通过dom的api获取元素的尺寸时为了让api返回最精确的值
            // 会强制刷新渲染队列，浏览器会重新提前渲染
            let hook = el.offsetHeight
            this.$nextTick(()=>{
                transform(el,"translateX",0)
                transform(el,"translateY",0)
            })
        },
        // 队列先进先出让底部最先开始运动的小球开始循环利用 
        afterEnter(el){
            // 拿到最先运动的小球让他
            //shift() 方法从数组中删除第一个元素，并返回该元素的值
            let ball = this.dropBalls.shift()
            // ball.show为true
            if(ball.show){
                ball.show = false
                // 通过原生api对i元素隐藏掉
                el.style.display = "none"
            }
        },
        
    },
    mounted() {
        // 绑定一个事件
        this.bus.$on("ballsAmination",(target)=>{
            this.dropBall(target)
            // console.log(target);
        })
    },
    computed: {
        // list是否显示隐藏要依赖于
        // 1.点击购物车
        // 2.是否购物车存在数据定义计算属性
        listshow(){
                if(this.totalCount <= 0){
                    // 当用户清空购物车时flod一定为true
                    this.flod = true//没有数据cart要折叠起来，返回false，list要隐藏
                    return false
                }
                // 滑屏操作$ref获取被ref标记的节点
                if(!this.scroll){
                    // 没有时创建实例实现滑屏
                    this.scroll = new BScroll(this.$refs.listContent,{
                        click:true
                    })
                }else{
                    // 有的时候要刷新 重新计算better-scroll
                    this.scroll.refresh()
                }

                return !this.flod
        },
        totalCount(){
            let totalCount = 0
            this.selectedFoods.forEach((selectedFood)=>{
                totalCount +=  selectedFood.count
            })
            return totalCount
        },
        totalPrice(){
            let totalPrice = 0
            this.selectedFoods.forEach((selectedFood)=>{
                totalPrice += selectedFood.price * selectedFood.count
            })
            return totalPrice
        },
        rightText(){
            if(this.totalPrice === 0){
                return `¥${this.seller.minPrice}起送`
            } else if(this.totalPrice < this.seller.minPrice){
                return `还差¥${this.seller.minPrice - this.totalPrice}起送`
            } else {
                return "去结算"
            }
        }    
    },
}
</script>
<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    .cart
        display flex
        flex 0 0 0
        position fixed
        z-index 3
        bottom 0
        left 0
        height 46px
        width 100%
        background #141d27  
        .left
            flex 1
            height 100%
            display flex
            .icon
                position relative
                bottom 15px
                width 56px
                height 56px
                border-radius 50%
                margin-left 12px
                margin-right 12px
                background #141d27
                display flex
                justify-content center
                align-items center             
                .logo
                    display flex
                    justify-content center
                    align-items center                   
                    width 44px
                    height 44px
                    border-radius 50%
                    background rgba(255,255,255,0.4)
                    &.active
                        background rgba(0,160,220,1)
                        i 
                            color white
                    i 
                        color rgba(255,255,255,0.4)
                .bubble
                    display inline-block
                    position absolute
                    right 0
                    top 3px
                    width 24px
                    height 18px
                    line-height 18px
                    text-align center
                    background red
                    border-radius 8px         
            .totalPrice
                font-size 16px
                display flex
                justify-content center
                align-items center
                margin-right 12px
                font-weight 700
                line-height 24px
                color rgba(255,255,255,.4)
                &.active
                    color white
            .deliveryPrice
                display flex
                justify-content center
                align-items center
                font-size 13px
                font-weight 700
                line-height 24px
                color rgba(255,255,255,.4)
                padding-left 12px
                border-left 1px soild rgba(255,255,255,0.1) 
        .right    
            flex 0 0 105px
            background rgba(255,255,255,.4)
            height 100%
            display flex
            align-items center
            justify-content center
            &.active
                background rgba(0,160,220,1)
            span 
                color rgba(255,255,255,.6)
        .balls
            .ball
                position absolute
                left 31px
                top 4px
                width 16px
                height 16px
                background-color skyblue 
                border-radius 50%
                transition .6s transform linear
    .list
        max-height 255px
        position fixed
        left 0
        bottom 45px
        z-index 2
        width 100%       
        background #f3f5f1
        padding-bottom 20px
        .header
            one-px(rgba(7,17,27,.1))
            height 40px
            display flex
            background gray
            align-items center
            justify-content space-between
            .cartText
                color rgba(7,17,27,1)
                margin-left 18px
                font-weight 200
                font-size 14px
            .clear
                margin-right 18px
                color rgba(0,160,220,1)
                font-weight 800
                font-size 14px
        .content
            max-height 195px
            overflow hidden
            .item
                one-px(rgba(7,17,27,.1))
                display flex
                height 48px
                align-items center
                justify-content space-between
                .left
                    padding-left 18px
                .right
                    display flex
                    align-items center
                    padding-right  22px
                    .price
                        margin-right 12px
                        color rgba(240,20,20,1)
                        font-size 10px
                        font-weight 700
    .mask
        position fixed
        z-index 1
        left 0
        right 0
        bottom 0
        top 0
        background rgba(7,17,27,.6)
        backdrop-filter blur(5px)








</style>