var express = require('express');

var getPendingTasks = require('./handlers/getPendingTasks');
var getCompletedTasks = require('./handlers/getCompletedTasks');
var addTask = require('./handlers/addTask');
var removeTask = require('./handlers/removeTask');
var completeTask = require('./handlers/completeTask');
var completeAllTasks = require('./handlers/completeAllTasks');

var router = express.Router();

function getRouter(db) {

	router.route('/tasks')
		.get( getPendingTasks.bind(null, db) )
		.put( completeAllTasks.bind(null, db) )

	router.route('/task')
		.post( addTask.bind(null, db) )
		.put( completeTask.bind(null, db) )

	router.get('/tasks/completed', getCompletedTasks.bind(null, db) )
	router.delete('/task/:id', removeTask.bind(null, db) )

	return router;

}

module.exports = getRouter;