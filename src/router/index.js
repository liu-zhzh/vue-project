import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/routes';
Vue.use(VueRouter)
export default new VueRouter({
    routes,
    //默认选中状态
    linkActiveClass:"active"
})







