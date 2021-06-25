const { createProxyMiddleware } = require('http-proxy-middleware');  //注意写法，这是1.0以后的版本，最好按抄

module.exports = function (app) {
 app.use(createProxyMiddleware('/api',
  {
   target: 'http://localhost:4000',
   pathRewrite: {
    '^/api': '',
   },
   changeOrigin: true,
   secure: false, // 是否验证证书
   ws: true, // 启用websocket
  }
 ));
};

// const proxy = require("http-proxy-middleware")

// module.exports = function (app) {
//   app.use(
//    proxy('/api1',{
//     target:"http://localhost:4000",
//     changeOrigin:true, //控制服务器请求的Host
//     pathRewrite:{'^/api1':''}  //重写请求路径
//    }),
//    proxy('/api2',{
//     target:"http://localhost:5001",
//     changeOrigin:true,
//     pathRewrite:{'^/api2':''}
//    }),
//   )
// }