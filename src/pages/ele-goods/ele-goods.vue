<template>
    <div class="goods">
      <div class="typeWrap" ref="typeWrap">
        <ul class="typeList" ref="typeList" >
           <li class="typeItem" @click="handTypeItem(index)"
                        v-for="(item,index) in goods" :key="index" :class="{active:currentIndex===index}">
                    <ele-icon class="icon"  v-if="item.type >=0"
                              :size="3" :type="item.type"></ele-icon>
                    <span class="text">{{item.name}}</span>
                </li>
        </ul>
      </div>
      <div class="foodsWrap" ref="foodWrap">
        <ul class="foodsList" ref="foodsList">
          <li class="foodsItem" v-for="(good, index) in goods" :key="index">
            <h2 class="title">{{good.name}}</h2>
            <ul class="foodList">
              <li class="foodItem" v-for="(food, index) in good.foods" :key="index">
                <ele-food :food="food">
                </ele-food>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ele-cart :seller="seller" @clear="clear" :selectedFoods="selectedFoods"></ele-cart>
    </div>
</template>
<script>
const OK = 0
import icon from 'components/ele-icon/ele-icon'
import food from 'components/ele-food/ele-food'
import cart from 'components/ele-cart/ele-cart'
import BScroll from "better-scroll";
export default {
  //滑屏对应在列表每一项上
  // 生成每一个li的高度位置信息的数组
  name: 'ele-goods',
  props:{
    seller:Object
  },
  components:{
    "ele-icon":icon,
    "ele-food":food,
    "ele-cart":cart,
  },
  data() {
    return {
      goods:[],
      scrollY:0,
      //每一项li的位置信息数组
      tops:[]
    }
  },
  computed: {
    selectedFoods(){
      let selectedFoods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if(food.count > 0){
              selectedFoods.push(food)
            }
          });
        });
      return selectedFoods
    },
    //根据tops与scrollY判断滑动时左侧每一项li对应的index
    currentIndex(){
      //获取tops与scrollY
      let {tops,scrollY} = this
      // findIndex得到数组的index，return返回值为true则返回数组index
      let index = tops.findIndex((item,index)=>{
        // scrollY大于等于意向的位置并且小于等于下一项的位置是返回true方法生成新的index
        // 赋值给let index
        return scrollY >= item && scrollY < tops[index + 1] 
      })
                // if(this.oldIndex !== index){
                //     this.oldIndex = index;
                //     //说明 index产生了改变
                //     let targetLi = this.$refs.typeList.children[index];
                //     this.typeScroll && this.typeScroll.scrollToElement(targetLi,300)
                // }
      if(this.oldindex !== index ){
        //index产生改变因滑动li的index不是上一个oldindex
          this.oldindex = index
          // 拿到当前li这个节点
          let targetLi = this.$refs.typeList.children[index]
          // 当这个方法存在是在去调用时
          this.typeScroll && this.typeScroll.scrollToElement(targetLi,300)
      }
        // this.$nextTick(()=>{
        //     this._initScroll()
        //     this._initTops()在这个this.$nextTick中下一次dom被渲染后去执行这两个函数所以找不到
        // 这两个方法里赋的值，所以判断一下是否存在this.typeScroll&&this.typeScroll.scrollToElement(targetLi,300)
        //   })

      // 最后返回根据滑动信息计算得到的index实现滑动对应左侧列表li每项变化
      return index
    }
  },
  methods: {
    clear(){
      this.selectedFoods.forEach((selectedFood)=>{
        selectedFood.count = 0
      })
    },
    handTypeItem(index){
      const top = this.tops[index]
      this.foodsScroll.scrollTo(0,-top,300)
    },
  // 定义一个方法在mounted中执行
    _initTops(){
      //拿到每一向li节点通过ref标记，$refs拿到
      // 初始化数组中的数据top为0
      let foodsItems = this.$refs.foodsList.children;
      let top = 0
      let tops = [top]
      //foodsItems是一个伪数组Array.from（）是方法可以转化为数组
      Array.from(foodsItems).forEach((foodsItem)=>{
      // 在遍历每一项获取每一项的高度相加在赋值给每一个top添加金属组tops生成新数组
        top += foodsItem.offsetHeight
        tops.push(top)
      })
      // 将新生成的数组添加到data中tops[]
      this.tops = tops
    },
    _initScroll(){
    //左侧产生滑屏
        this.typeScroll = new BScroll(this.$refs.typeWrap,{
          click:true
        }) 
    //右侧产生滑屏       
    //better-scroll加上这个配置才能 实时被派发事件
        this.foodsScroll = new BScroll(this.$refs.foodWrap,{
          click:true,
          probeType:3
        })
     //获取滑动位置信息,这是个钩子scroll在默认状态下是不会被执行的
        this.foodsScroll.on("scroll",({x,y})=>{
          this.scrollY = Math.abs(y)
        })
    },
  },
  
  async mounted() {
        const {errno,data:goods} = await this.axios.get("/api/goods");
            if(errno === OK){
                this.goods = goods
            }
            // 让方法在vue节点在刚挂载的时候执行
          //渲染时需要$nextTick（）方法将毁掉延迟到下一次dom更新后执行
          this.$nextTick(()=>{
            this._initScroll()
            this._initTops()
          })
          //添加购物车的注册事件，这是被触发的事件回调
          this.bus.$on("addCount",(food)=>{
            //为对应的count添加响应式属性
            if(food.count){
              // food中有count属性计数加一
              food.count++
              // 没有则，添加响应式属性
            } else {
              this.$set(food,"count",1)
            }
          })
          this.bus.$on("removeCount",(food)=>{
            //为对应的count添加响应式属性
            if(food.count > 0){
              food.count--
            }
          })
  },
}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    // @import "../../common/stylus/extend.styl"
.goods
  display flex
  position absolute
  top 174px
  left 0
  right 0
  bottom 46px
  overflow hidden
  .typeWrap
    flex 0 0 80px

          
    .typeList
      .typeItem
        one-px(rgba(7,17,27,1))
        display flex
        align-items center
        justify-content center
        height 54px
        background #f3f5f7
        &:after
          left 0
          right 0
          margin auto
          width 56px
        &.active
          background skyblue  
        .icon
          vertical-align top
        .text
          vertical-align top
          font-weight 200
          font-size 12px
          line-height 14px
  .foodsWrap
    flex 1 1 0%
    .foodsList
      .foodsItem
        .title
          height 26px
          background #f3f5f7
          border-left 3px soild #d9ddd1
          font-size 12px
          line-height 26px
          color rgba(143,153,159,1)
        .foodList
          .foodItem           
            padding 18px
            .food
              one-px(rgba(7,17,27,0.1))
              &:last-child
                .food
  
                  border-none()
  
              
</style>



