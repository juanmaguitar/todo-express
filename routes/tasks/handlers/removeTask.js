var ObjectID = require('mongodb').ObjectID;

function addTask(db, req, res) {

	var idTask = req.params.id;

	console.log("removing... " + idTask)
	db.collection('tasks')
		.remove( { _id: ObjectID(idTask) }, function(err, result) {
			if (err) throw err;
			res.status(204).send();
		});

}

module.exports = addTask;