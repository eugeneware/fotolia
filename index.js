var request = require('request'),
    qs = require('qs');

var baseUrl = 'api.fotolia.com/Rest/1/';
module.exports = Fotolia;

var apis = {
  search: [
    'getSearchResults',
    'getCategories1',
    'getCategories2',
    'getTags',
    'getGalleries',
    'getSeasonalGalleries',
    'getCountries',
  ],
  media: [
    'getMediaData',
    'getBulkMediaData',
    'getMediaGalleries',
    'getMedia',
    'getMediaComp',
    'getHomePageImages',
    'getLicense',
  ],
  user: [
    'loginUser',
    'refreshToken',
    'userSignUp',
    'userEditProfile',
    'getUserData',
    'getSalesData',
    'getUserStats',
    'getUserGalleries',
    'getUserGalleryMedias',
    'deleteUserGallery',
    'createUserGallery',
    'addToUserGallery',
    'removeFromUserGallery',
    'moveUpMediaInUserGallery',
    'moveDownMediaInUserGallery',
    'moveMediaToTopInUserGallery',
    'getUserAdvancedStats',
    'getLastOnlineContents',
    'getUploadFolders',
    'getUploadFolderFileIds',
    'uploadIdCard',
    'upload',
    'getLastUploadedMedia',
    /*
    'subaccount.getIds',
    'subaccount.create',
    'subaccount.delete',
    'subaccount.edit',
    'subaccount.get',
    'subaccount.getPurchasedContents',
    */
  ],
  shoppingcart: [
    'getList',
    'add',
    'update',
    'remove',
    'transferToLightbox',
    'clear',
  ],
  main: [
    'getData',
    'test',
  ]
};

function Fotolia(apiKey) {
  if (!(this instanceof Fotolia)) {
    return new Fotolia(apiKey);
  }

  this.apiKey = apiKey;

  var self = this;
  Object.keys(apis).forEach(function (group) {
    self[group] = {};
    var methods = apis[group];
    methods.forEach(function (method) {
      var methodName = group + '/' + method;
      self[group][method] = self.exec.bind(self, methodName);
    });
  });
}

Fotolia.prototype.exec = function (method, params, cb) {
  var apiUrl = 'http://' + this.apiKey + '@' + baseUrl + method +
    '?' + qs.stringify(params);
  request({ url: apiUrl, json: true }, function (err, res, body) {
    if (err) return cb(err);
    return cb(null, body);
  })
};
