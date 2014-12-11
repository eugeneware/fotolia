var request = require('request'),
    qs = require('qs');

var baseUrl = 'api.fotolia.com/Rest/1/';
module.exports = Fotolia;

function Fotolia(apiKey) {
  if (!(this instanceof Fotolia)) {
    return new Fotolia(apiKey);
  }

  this.apiKey = apiKey;
}

Fotolia.prototype.getSearchResults = function (params, cb) {
  return this.exec('search/getSearchResults', params, cb);
}

Fotolia.prototype.getMediaData = function (params, cb) {
  return this.exec('media/getMediaData', params, cb);
}

Fotolia.prototype.exec = function (method, params, cb) {
  var apiUrl = 'http://' + this.apiKey + '@' + baseUrl + method +
    '?' + qs.stringify(params);
  request({ url: apiUrl, json: true }, function (err, res, body) {
    if (err) return cb(err);
    return cb(null, body);
  })
};
