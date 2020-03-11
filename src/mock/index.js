import Mock from 'mockjs'
import data from './data'
//     Mock.mock( rurl, template ) 
//只能拦截ajax请求
Mock.mock("/api/seller",{errno:0,data:data.seller})
Mock.mock("/api/goods",{errno:0,data:data.goods})
Mock.mock("/api/ratings",{errno:0,data:data.ratings})


