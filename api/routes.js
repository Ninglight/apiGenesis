'use strict';
module.exports = function(app) {
  var element = require('./controllers/elementController');

  const versionApi = '/v1.0';

  // Elements Routes
  app.route(`${versionApi}/elements`)
    .get(element.getElements)
    .put(element.updateElement)
    .post(element.createElement);

  app.route(`${versionApi}/elements/:elementId`)
    .get(element.readElement)
    .delete(element.deleteElement);

    app.use((req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
    
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        error: {
          message: err.message
        }
      });
    });
};