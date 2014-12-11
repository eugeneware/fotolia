var expect = require('expect.js'),
    request = require('request'),
    Fotolia = require('..');

var apiKey = process.env.FOTOLIA_KEY;

describe('fotolia', function() {
  it('should be able to get search results', function(done) {
    var fotolia = Fotolia(apiKey);
    var params = {
      search_parameters: {
        words: 'test',
        language_id: 2,
        limit: 2
      }
    };
    fotolia.search.getSearchResults(params, function (err, results) {
      if (err) return done(err);
      console.log(results);
      done();
    });
  });

  it('should be able to request media data', function(done) {
    var fotolia = Fotolia(apiKey);
    fotolia.media.getMediaData({ id: 20 }, function (err, results) {
      if (err) return done(err);
      console.log(results);
      done();
    });
  });
});
