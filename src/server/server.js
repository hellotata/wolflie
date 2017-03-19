// *** Dependencies *** //
const express = require('express');
const path = require('path');

// *** Express instance *** //
const app = express();

// *** Environment variables *** //
const PORT = process.env.PORT || 3000;

// *** Enable Webpack HMR in Development *** //
if (process.env.NODE_ENV === 'hotreload') {
  console.log('DEVELOPMENT ENVIRONMENT: Hot Reloading...');

  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const webpackHotConfig = require('../../webpack/hot.config');
  const compiler = webpack(webpackHotConfig);

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: webpackHotConfig.output.publicPath,
    noInfo: true
  }));

  app.use(webpackHotMiddleware(compiler, {
    reload: true
  }));
}

// *** Serve static assets *** //
app.use(express.static(path.join(__dirname, '../../dist/assets')));

// *** Send index.html by default *** //
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// *** Start Express server *** //
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
