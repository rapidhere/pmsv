/**
 * the logging system
 * @author: rapidhere@gmail.com
 */
'use strict';

exports.debug = async function debug(msg) {
  return await _logAsync('debug', msg);
};

exports.info = async function info(msg) {
  return await _logAsync('info', msg);
};

exports.warn = async function warn(msg) {
  return await _logAsync('warn', msg);
};

exports.error = async function error(msg) {
  return await _logAsync('error', msg);
};


function _logAsync(level, message) {
  let logFunc;
  switch(level) {
    case 'debug': logFunc = console.debug; break;
    case 'info': logFunc = console.info; break;
    case 'warn': logFunc = console.warn; break;
    case 'error': logFunc = console.error; break;
    default:
      logFunc = console.info;
  }

  return new Promise((resolve) => {
    let timeString = new Date().toISOString();
    resolve(logFunc(`[ ${timeString} ] ${message}`));
  });
}