var request = require('request'),
    qs = require('qs');

var baseUrl = 'api.fotolia.com/Rest/1/';
module.exports = Fotolia;

var apis = {
  search: {
    getSearchResults: true,
    getCategories1: true,
    getCategories2: true,
    getTags: true,
    getGalleries: true,
    getSeasonalGalleries: true,
    getCountries: true,
  },
  media: {
    getMediaData: true,
    getBulkMediaData: true,
    getMediaGalleries: true,
    getMedia: true,
    getMediaComp: true,
    getHomePageImages: true,
    getLicense: true,
  },
  user: {
    createUser: { method: 'POST' },
    loginUser: { method: 'POST' },
    refreshToken: { method: 'POST' },
    userSignUp: true,
    userEditProfile: true,
    getUserData: true,
    getSalesData: true,
    getUserStats: true,
    getUserGalleries: true,
    getUserGalleryMedias: true,
    deleteUserGallery: { method: 'POST' },
    createUserGallery: { method: 'POST' },
    renameUserGallery: { method: 'POST' },
    addToUserGallery: { method: 'POST' },
    removeFromUserGallery: { method: 'POST' },
    moveUpMediaInUserGallery: { method: 'POST' },
    moveDownMediaInUserGallery: { method: 'POST' },
    moveMediaToTopInUserGallery: { method: 'POST' },
    getUserAdvancedStats: true,
    getLastOnlineContents: true,
    getUploadFolders: true,
    getUploadFolderFileIds: true,
    uploadIdCard: true,
    upload: true,
    getLastUploadedMedia: true,
    /*
    subaccount.getIds: true,
    subaccount.create: { method: 'POST' },
    subaccount.delete: { method: 'POST' },
    subaccount.edit: { method: 'POST' },
    subaccount.get: true,
    subaccount.getPurchasedContents: true,
    */
  },
  shoppingcart: {
    getList: true,
    add: { method: 'POST' },
    update: { method: 'POST' },
    remove: { method: 'POST' },
    transferToLightbox: { method: 'POST' },
    clear: { method: 'POST' },
  },
  main: {
    getData: true,
    test: true,
  }
};

function Fotolia(apiKey) {
  if (!(this instanceof Fotolia)) {
    return new Fotolia(apiKey);
  }

  this.apiKey = apiKey;

  var self = this;
  var defaultApiDetails = {
    method: 'GET'
  };
  Object.keys(apis).forEach(function (group) {
    self[group] = {};
    var methods = apis[group];
    Object.keys(methods).forEach(function (method) {
      var methodName = group + '/' + method;
      var apiDetails = defaultApiDetails;
      if (methods[method] !== true) {
        apiDetails = methods[method];
      }
      self[group][method] = self.exec.bind(self, methodName, apiDetails);
    });
  });
}

Fotolia.prototype.exec = function (methodName, apiDetails, params, cb) {
  var apiUrl = 'http://' + this.apiKey + '@' + baseUrl + methodName +
    '?' + qs.stringify(params);
  request({ method: apiDetails.method, url: apiUrl, json: true },
    function (err, res, body) {
      if (err) return cb(err);
      return cb(null, body);
  })
};
