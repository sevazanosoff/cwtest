const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://68.183.74.14:4005',
            changeOrigin: true,
        })
    );
};