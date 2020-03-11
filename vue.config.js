const path = require('path');
const data = require("./data.json")
//__dirname 当前文件所在的目录 : layout
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports={
    // outputDir :'lzz'
    lintOnSave:false,
    //vue脚手架的配置
    devServer:{
        port:3001,
        // before(app){
        //     //app相当于express的app对象
        //     app.get("/api/sellers",(req,res)=>{
        //         res.json({
        //             errorno:0,
        //             data:data.sellers
        //         })
        //     })
        // }
    },
    //webpack的原生配置
    configureWebpack:{
        // webpack的devServer
        devServer:{
            open:true
        },
        resolve: {
            alias: {
                'components': resolve('src/components'),
                'pages': resolve('src/pages'),
            }
        }
    }
}












