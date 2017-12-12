var Element = require('./../models/elementModel.js');

const elementController = {
  getElements: function(req, res){

      var element = new Element('', '', '', '', '');

      elementPromise = element.getElements(); 

      elementPromise
      .then(function(results){
          res.json(results);
      })
      .catch(function(reason){
          res.send(reason);
      })
  },
  readElement: function(req, res){

    console.log(req.params.elementId + " : req.body.name");

      let elementId = req.params.elementId;

      var element = new Element(elementId, '', '', '', '');

      elementPromise = element.readElement(); 

      elementPromise
      .then(function(results){
          console.log("Ca marche");
          res.json(results);
      })
      .catch(function(reason){
          console.log("Ca marchepas");
          res.send(reason);
      })
  },
  createElement: function(req, res){

    console.log(req.body.name + " : req.body.name");

    let element = new Element('', req.body.name, req.body.html, '', '');

    elementPromise = element.createElement(); 

    elementPromise
    .then(function(results){
        res.json(results);
    })
    .catch(function(reason){
        res.send(reason);
    })
  },
  updateElement: function(req, res){

    let element = new Element(req.body);

    elementPromise = element.updatedElement(); 

    elementPromise
    .then(function(results){
        res.json(results);
    })
    .catch(function(reason){
        res.send(reason);
    })
  },
  deleteElement: function(req, res){
    
        let elementId = req.params.elementId;

        var element = new Element(elementId, '', '', '', '');
    
        elementPromise = element.deleteElement(); 
    
        elementPromise
        .then(function(results){
            res.json(results);
        })
        .catch(function(reason){
            res.send(reason);
        })
      }
}

module.exports = elementController;


/*
exports.createElement = function(req, res) {
var new_task = new Task(req.body);
new_task.save(function(err, task) {
  if (err)
    res.send(err);
  res.json(task);
});
};


exports.readElement = function(req, res) {
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