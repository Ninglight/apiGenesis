const PORT = 3000;
var assert = require('assert'),
    app = require('../app'),
    element = {
        "id": "1",
        "name": "Heading1",
        "html": "<h1>Title</h1>",
        "createdAt": "2017-12-05T01:20:32.000Z",
        "updatedAt": "2017-12-05T01:20:32.000Z"
    },
    expected_id = 1
 
// Configure REST API host & URL
require('api-easy')
.describe('elements-rest')
.use('localhost', PORT)
.root('/elements')
.setHeader('Content-Type', 'application/json')
.setHeader('Accept', 'application/json')
 
// Initially: start server
.expect('Start server', function () {
  app.db.configure({namespace: 'elements-test-rest'});
  app.listen(PORT);
}).next()
 
// 1. Empty database
.del()
.expect(200)
.next()
 
// 2. Add a new element
.post(element)
.expect('Has ID', function (err, res, body) {
  var obj;
  assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
  assert.isObject(obj);
  assert.include(obj, 'id');
  assert.equal(expected_id, obj.id);
  element.id = obj.id;
})
.undiscuss().next()
 
// 3.1. Check that the freshly created element appears
.get()
.expect('Collection', function (err, res, body) {
  var obj;
  assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
  assert.isArray(obj);
  assert.include(obj, '/elements/element/' + expected_id);
})
 
// 3.2. Get the freshly created element
.get('/element/' + expected_id)
.expect('Found element', function (err, res, body) {
  var obj;
  assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
  assert.deepEqual(obj, element);
})
.next()
 
// 4. Update element
.put('/element/' + expected_id, {"title": "Google.com"})
.expect('Updated element', function (err, res, body) {
  var obj;
  assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
  element.title = "Google.com";
  assert.deepEqual(obj, element);
})
.next()
 
// 5. Delete element
.del('/element/' + expected_id)
.expect(200)
.next()
 
// 6. Check deletion
.get('/element/' + expected_id)
.expect(404)
.next()
 
// 7. Check all elements are gone
.get()
.expect('Empty database', function (err, res, body) {
  var obj;
  assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
  assert.isArray(obj);
  assert.equal(obj.length, 0);
})
 
// 8. Test unallowed methods
.post('/element/' + expected_id).expect(405)
.put().expect(405)
 
// Finally: clean, and stop server
.expect('Clean & exit', function () {
  app.db.deleteAll(function () { app.close() });
})
 
// Export tests for Vows
.export(module)