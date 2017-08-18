var ObjectID = require('mongodb').ObjectID

function completeTask (db, req, res) {
  if (!req.body || !req.body._id) {
    throw new Error('No data provided.')
  }

  var idTask = req.body._id

  db.collection('tasks')
    .update(
      { _id: ObjectID(idTask) },
    { $set:
    {
      'completed': true,
      'completeTime': new Date()
    }
    },
      function (err, result) {
        if (err) throw err
        res.status(200).send()
      }
    )
}

module.exports = completeTask
