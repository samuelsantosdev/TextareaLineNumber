module.exports = {
    entry:'./src/linesnumber.js',
    output : {
        path: __dirname + '/public',
        filename: "linesnumber.min.js"
    },
    devServer:{
        contentBase : __dirname + "/public"
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
            }
        ]
    }
}