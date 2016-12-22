/**
 * a handler route
 * @author rapidhere@gmail.com
 */
'use strict';

const exp = require('./exp');
const logger = require('./logger');
const path = require('path');
const fs = require('fs');
const userStore = require('./storage/user-store');

// a view handler
exports.Handler = class Handler {
  constructor() {
    this.logger = logger;
    this.req = null;
    this.arg = null;
  }

  async invoke(req) {
    // set request
    this.req = req;

    // parse args
    let args;
    try {
      let body = await Handler.readRequestBody(req);
      args = JSON.parse(body);
    } catch (e) {
      throw new exp.BadRequest('reading error: ' + e.message);
    }
    this.info("request args:\n" + JSON.stringify(args));
    // set arg
    this.arg = args;

    // route
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

  // logger helpers
  debug(msg) {
    this.logger.debug(this.generateLoggingMessage(msg));
  }

  info(msg) {
    this.logger.info(this.generateLoggingMessage(msg));
  }

  warn(msg) {
    this.logger.warn(this.generateLoggingMessage(msg));
  }

  error(msg) {
    this.logger.error(this.generateLoggingMessage(msg));
  }

  generateLoggingMessage(msg) {
    return `[ ${this.req.method} ${this.req.url} ] ${msg}`;
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

  // ~ login helper
  loginUser(arg) {
    if(! arg.token) {
      this.forbidden('invalid user token');
    }

    let user = userStore.findUserByToken(arg.token);
    if(! user) {
      this.forbidden('invalid user token');
    }

    return user;
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
    yield require(path.join(__dirname, 'views', file));
  }
};