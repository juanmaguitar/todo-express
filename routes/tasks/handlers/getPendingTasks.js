function getPendingTasks (db, req, res) {
  db.collection('tasks')
    .find({ completed: false })
    .toArray(function (err, pendingTasks) {
      if (err) throw err
      res.render('tasks', {
        title: 'Todo List',
        currentUrl: '/tasks',
        tasks: pendingTasks
      })
    })
}

module.exports = getPendingTasks
