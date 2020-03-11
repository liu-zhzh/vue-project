<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
      <div class="navs">
        <div class="item">
          <router-link to="/goods">商品</router-link>
        </div>
        <div class="item">
          <router-link to="/ratings">评价</router-link>
        </div>
        <div class="item">
          <router-link to="/sellers">商家</router-link>
        </div>
      </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from 'components/ele-header/ele-header.vue'
const OK = 0
export default {
  name: 'App',
  data(){
    return{
      seller:{}
    }
  },
  components:{
    "v-header":header
  },
  async mounted() {
    const body = await this.axios.get("/api/seller")
    console.log(body);
      if(body.errno === OK){
        this.seller = body.data;
      }


  },
}
</script>

<style scoped lang="stylus">
@import "./common/stylus/mixin.styl"
#app
  position relative
  width 100%
  height 100%
  .navs
    one-px(rgba(7,17,28,.1))
    display flex
    height 40px
    .item
      flex 1
      text-align center
      height 40px
      line-height 40px
      font-size 14px
      a
        display inline
        width 100%
        height 100%
        font-size 14px
        color rgb(77,85,93)
        &.active
          color rgb(240,20,20)
      
</style>
