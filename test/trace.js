/**
 * This example illustrates the same end-result as
 * http-durations-patterns, however using separate
 * event handlers.
 */

var m = {};

exports.local = function(traces) {
	traces.on('bearcat:method:start', function(trace) {
		console.log(JSON.stringify(trace));
	});

	traces.on('bearcat:method:end', function(trace) {
		console.log(JSON.stringify(trace));
	});
};