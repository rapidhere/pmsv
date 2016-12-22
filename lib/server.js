/**
 * the pm serer
 * @author: rapidhere@gmail.com
 */
'use strict';

const http = require('http');
const logger = require('./logger');
const route = require('./route');
const exp = require('./exp');

module.exports = class Server {
  constructor(port) {
    this.port = port || 4040;
    this.app = null;
    this.handlers = new Map();
  }

  start() {
    this.app = http.createServer((req, res) => {
      logger.info(`[ ${req.method} ] request ${req.url}`);
      this.handleRequest(req).then(
        // success
        (result) => {
          res.statusCode = 200;
          res.end(JSON.stringify(result));

          logger.info(`[ ${req.method} ] ${req.url} 200\n${JSON.stringify(result)}`);
        },

        // failed
        (e) => {
          let errorMessage, statusCode;
          if(e instanceof exp.HttpError) {
            statusCode = e.statusCode;
            errorMessage = e.error;
          } else {
            statusCode = 500;
            errorMessage = '' + e;
          }

          // send error message, and end
          res.statusCode = statusCode;
          res.end(JSON.stringify({
            error: errorMessage
          }));

          logger.info(`[ ${req.method} ] ${req.url} ${statusCode} error:\n${errorMessage}`);
        }
      );
    });

    // discover handlers
    logger.info('discovering handlers ...');
    for(let handler of route.discoverHandlers()) {
      this.handlers.set(handler.url, handler.handler);
      logger.info(`  => ${handler.bindingUrl}`);
    }
    logger.info('handlers discovered');

    logger.info('server start on port: ' + this.port);
    this.app.listen(this.port);
  }

  async handleRequest(req) {
    if(this.handlers.has(req.url)) {
      let handler = this.handlers.get(req.url);
      return await new handler().invoke(req);
    } else {
      throw new exp.NotFound('no such view: ' + req.url);
    }
  }
};