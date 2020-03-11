<template>
    <div class="food">
        <div class="left">
            <img :src="food.image" alt="">
        </div>
        <div class="right">
            <span class="name">
                {{food.name}}
            </span>
            <span class="description">
                {{food.description}}
            </span>
            <span class="info">
                <span class="sellCount">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
            </span>
            <span class="prices">
                <span class="price">{{food.price}}</span>
                <span class="oldPrice">{{food.oldPrice}}</span>

            </span>
        </div>
        <ele-contorl :food="food" class="contorl"></ele-contorl>
    </div>
</template>
<script>
import contorl from 'components/ele-contorl/ele-contorl'
export default {
    name:"ele-food",
    props:{
        food:Object
    },
    components:{
        "ele-contorl":contorl
    }
}
</script>
<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"

    .food
        display flex
        font-size 0
        .left
            flex 0 0 59px
            img 
                width 100%auto
                height 59px
        .right   
            margin-left 10px 
            flex 1
            display flex
            flex-flow column
            font-size 16px
            color rgba(147,153,159,1)
            .name
                margin-top 2px
                margin-bottom 8px
                font-size 14px
                line-height 14px
                color rgba(7,17,27,1)
            .description
                margin-bottom 8px
            .info
                margin-bottom 8px
                .sellCount
                    margin-left 12px
                .rating
                    zoom 1
            .prices
                .price
                    font-size 14px
                    font-weight 800
                    line-height 24px
                    color red
                    margin-right 8px
                .oldPrice
                    font-weight 800
                    line-height 24px
                    text-decoration line-through
        .contorl
            flex 0 0 0
            position absolute
            bottom 3px
            right 0





</style>