var assert = require('assert');
var essai = require('../javascripts/functionToTest');

describe('Testing format of api', function() {
    it('Should return String', function() {
      assert.equal(typeof(essai.httpGet("http://local.test:7001/listeElevesApi")),"string");
  });
});
