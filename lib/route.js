/**
 * a handler route
 * @author rapidhere@gmail.com
 */
'use strict';

const exp = require('./exp');
const logger = require('./logger');
const path = require('path');
const fs = require('fs');

// a view handler
exports.Handler = class Handler {
  constructor(bindingUrl) {
    this.bindingUrl = bindingUrl;
    this.logger = logger;
  }

  async invoke(req) {
    let args;
    try {
      let body = await this.readRequestBody(req);
      args = JSON.parse(body);
    } catch (e) {
      throw new exp.BadRequest('reading error: ' + e.message);
    }

    switch(req.method) {
      case 'GET': return this.get(args);
      case 'PUT': return this.put(args);
      case 'POST': return this.post(args);
      case 'DELETE': return this.delete(args);
      default:
        throw new exp.MethodNotAllowed(req.method);
    }
  }

  // ~ view routers

  get(arg) {
    throw new exp.MethodNotAllowed('GET');
  }

  put(arg) {
    throw new exp.MethodNotAllowed('PUT');
  }

  post(arg) {
    throw new exp.MethodNotAllowed('POST');
  }

  delete(arg) {
    throw new exp.MethodNotAllowed('DELETE');
  }

  // ~ error helpers
  badRequest(msg) {
    throw new exp.BadRequest(msg);
  }

  notFound(msg) {
    throw new exp.NotFound(msg);
  }

  forbidden(msg) {
    throw new exp.Forbidden(msg);
  }

  // read up request async
  static readRequestBody(req) {
    return new Promise((resolve, reject) => {
      let buf = '';
      req.on('data', (chunk)=> buf += chunk);
      req.on('end', ()=> resolve(buf));
      req.on('error', (e)=> reject(e));
    });
  }
};

// discover handlers under 'views'
exports.discoverHandlers = function*() {
  for(let file of fs.readdirSync(path.join(__dirname, 'views'))) {
    let handlerClass = require(path.join(__dirname, 'views', file));
    yield new handlerClass();
  }
};