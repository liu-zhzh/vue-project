<template>
    <div class="contorl">
        <transition name="contorlRemove">
            <i v-show="food.count" class="icon-remove_circle_outline" @click="removeCount" remove></i>        
        </transition>
        <transition name="contorlRemove">
            <span v-show="food.count > 0">{{food.count}}</span>
        </transition>
        <i class="icon-add_circle add" @click="addCount"></i>    
    </div>
</template>
<script>
export default {
    name:"ele-contorl",
    props:{
        food:{
            type:Object,
            repuire:true
        }
    },
    methods: {
        // 通过总线来将两个组件建立联系在已有的要添加的food属性中加一个count属性用来计数
        // 添加点击事件触发事件回调
        addCount(event){
            this.bus.$emit("addCount",this.food)
            // 点击添加时触发事件ballAmination
            this.bus.$emit("ballsAmination",event.target)
        },        
        removeCount(){
            this.bus.$emit("removeCount",this.food)
        }
    },
}
</script>
<style scoped lang="stylus">
    .contorl
        i
        // 内联元素不能使用动画属性加display inline-block
            display inline-block
            vertical-align middle
            font-size  24px
            color rgba(0,160,220,1)
            &.add
                position relative
                z-index 1
            &.remove
                opacity 1
                transform translate3d(0,0,0) rotate(-720deg)
        span 
            display inline-block
            width 24px
            text-align center
            color rgba(147,153,159,1)
            vertical-align middle
            font-size  10px      












</style>