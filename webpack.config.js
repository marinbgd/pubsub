const path = require('path')
const isProduction = !(process.env.NODE_ENV === 'dev')
const mode = isProduction ? 'production' : 'development'
const devtool = isProduction ? false : 'source-map'

module.exports = {
    target: 'web',
    mode,
    entry: './src/index.js',
    devtool,
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build'),
        library: 'pubsub',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
}
