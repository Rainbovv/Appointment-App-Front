const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const SERVER_PORT = 3000;

if (process.env.NODE_ENV === "development") {
	app.use(
		webpackDevMiddleware(compiler, {
			publicPath: config.output.publicPath,
		})
	);

	app.use(webpackHotMiddleware(compiler));
}

app.use('/build', express.static(path.join(__dirname, 'build')));

app.get("/", (req, res) => {
	res.sendFile(__dirname + '/build/index.html')
});

app.listen(SERVER_PORT, (error) => {
	if (error) {
		console.error(error)
	} else {
		console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", SERVER_PORT, SERVER_PORT)
	}
});