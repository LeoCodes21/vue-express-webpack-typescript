import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import {renderFile} from 'ejs';

const webpack = require('webpack'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware');

class App {
  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.express.set('views', path.join(__dirname, '..', 'client'));
    this.express.engine('html', renderFile);
    this.express.set('view engine', 'html');

    this.express.use('/css', express.static(path.join(__dirname, '..', 'client', 'css')));

    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));

    if (process.env.NODE_ENV === 'development') {
      const config = require(path.resolve(__dirname, '..', '..', 'webpack.config.js'));
      const compiler = webpack(config);

      this.express.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: { colors: true }
      }));

      this.express.use(webpackHotMiddleware(compiler, {
        log: console.log
      }));
    }
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.render('index');
    });

    this.express.use('/', router);
  }
}

export default new App().express;
