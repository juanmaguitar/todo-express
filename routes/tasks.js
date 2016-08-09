var _tasks = [];
var counter = 0;

exports.list = function(req, res, next){
  var pendingTasks = _tasks.filter(function(item, i){
    return !item.completed;
  })
  res.render('tasks', {
    title: 'Todo List',
    currentUrl: '/tasks',
    tasks: pendingTasks || []
  });
};

exports.add = function(req, res, next){
  if (!req.body || !req.body.name) return next(new Error('No data provided.'));
  var task = {
    _id: ++counter,
    name: req.body.name,
    createTime: new Date(),
    completed: false
  }
  _tasks.push(task);
  console.info('Added %s with id=%s', task.name, task._id);
  res.redirect('/tasks');
};

exports.markAllCompleted = function(req, res, next) {
  if (!req.body.all_done || req.body.all_done !== 'true') return next();
  var count = 0;
  _tasks = _tasks.map(function(item, i) {
    if (!item.completed) {
      item.completeTime = new Date();
      item.completed = true;
      count++;
    }
    return item;
  });
  console.info('Marked %s task(s) completed.', count);
  res.redirect('/tasks');
};

exports.completed = function(req, res, next) {
  var completedTasks = _tasks.filter(function(item,i){ return item.completed; })
  res.render('tasks_completed', {
    title: 'Completed',
    currentUrl: '/tasks/completed',
    tasks: completedTasks || []
  });
};

exports.markCompleted = function(req, res, next) {

  if (!req.body.completed) return next(new Error('Param is missing.'));
  var completed = req.body.completed === 'true';
  var idTask = req.taskId;
  var completedName = "";
  _tasks.map(function(item, i) {
    if (item._id == idTask) {
      item.completed = true;
      completedName = item.name;
    }
  })

  console.info('Marked task %s with id=%s completed.', completedName, idTask);
  res.redirect('/tasks');

};

exports.del = function(req, res, next) {

  var idTask = req.taskId;
  var removedName = ""

  _tasks = _tasks.filter(function(item, i) {
    var idRemove = parseInt(idTask,10)
    if (item._id === idRemove) {
      removedName = item.name;
    }
    return item._id !== idRemove;
  });

  console.info('Deleted task %s with id=%s completed.', removedName, idTask);
  res.status(204).send();
};
