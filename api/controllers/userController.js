var User = require('./../models/userModel.js');

const userController = {
  getUsers: function(req, res){

      var user = new User('', '', '', '', '', '');

      userPromise = user.getUsers(); 

      userPromise
      .then(function(results){
          res.json(results);
      })
      .catch(function(reason){
          res.send(reason);
      })
  },
  readUser: function(req, res){

    console.log(req.params.userLogin + " : req.body.name");

      let userLogin = req.params.userLogin;

      var user = new User('', '', '', userLogin, '', '');

      userPromise = user.readUser(); 

      userPromise
      .then(function(results){
          res.json(results);
      })
      .catch(function(reason){
          res.send(reason);
      })
  },
  createUser: function(req, res){

    let user = new User('', req.body.firstName, req.body.lastName, req.body.email, req.body.password, '');

    userPromise = user.createUser(); 

    userPromise
    .then(function(results){
        res.json(results);
    })
    .catch(function(reason){
        res.send(reason);
    })
  },
  updateUser: function(req, res){

    let user = new User(req.body.id, req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.createdAt);

    userPromise = user.updateUser(); 

    userPromise
    .then(function(results){
        res.json(results);
    })
    .catch(function(reason){
        res.send(reason);
    })
  },
  deleteUser: function(req, res){
    
        let userId = req.params.userId;

        var user = new User(userId, '', '', '', '');
    
        userPromise = user.deleteUser(); 
    
        userPromise
        .then(function(results){
            res.json(results);
        })
        .catch(function(reason){
            res.send(reason);
        })
      }
}

module.exports = userController;


/*
exports.createUser = function(req, res) {
var new_task = new Task(req.body);
new_task.save(function(err, task) {
  if (err)
    res.send(err);
  res.json(task);
});
};


exports.readUser = function(req, res) {
Task.findById(req.params.taskId, function(err, task) {
  if (err)
    res.send(err);
  res.json(task);
});
};


exports.update_a_task = function(req, res) {
Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
  if (err)
    res.send(err);
  res.json(task);
});
};


exports.delete_a_task = function(req, res) {
Task.remove({
  _id: req.params.taskId
}, function(err, task) {
  if (err)
    res.send(err);
  res.json({ message: 'Task successfully deleted' });
});
};
*/