/**
 * the server entry
 * @author: rapidhere@gmail.com
 */
'use strict';

const Server = require('./lib/server');

let server = new Server(4040);
server.start();