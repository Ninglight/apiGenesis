'use strict';
module.exports = function(app) {
  var element = require('./controllers/elementController');
  var user = require('./controllers/userController');

  const versionApi = '/v1.0';

  // Elements Routes
  app.route(`${versionApi}/elements`)
    .get(element.getElements)
    .put(element.updateElement)
    .post(element.createElement);

  app.route(`${versionApi}/elements/:elementId`)
    .get(element.readElement)
    .delete(element.deleteElement);

  // Elements Routes
  app.route(`${versionApi}/users`)
    .get(user.getUsers)
    .put(user.updateUser)
    .post(user.createUser);

  app.route(`${versionApi}/users/:userLogin`)
    .get(user.readUser)
    .delete(user.deleteUser);

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