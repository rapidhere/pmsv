/**
 * some exceptions
 * @author rapidhere@gmail.com
 */
'use strict';

exports.HttpError = class HttpError extends Error {
  constructor(statusCode, error) {
    super('http error: ' + statusCode + ': ' + error);
    this.statusCode = statusCode;
    this.error = error;
  }
};

// 400 bad request
exports.BadRequest = class BadRequest extends exports.HttpError {
  constructor(error) {
    super(400, error);
  }
};

// 403 forbidden
exports.Forbidden = class Forbidden extends exports.HttpError {
  constructor(error) {
    super(403, error);
  }
};

// 404 not found
exports.NotFound = class NotFound extends exports.HttpError {
  constructor(error) {
    super(404, error);
  }
};

// 405 method not allowed
exports.MethodNotAllowed = class MethodNotAllowed extends exports.HttpError {
  constructor(error) {
    super(405, error);
  }
}