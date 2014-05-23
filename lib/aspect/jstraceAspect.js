/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat-jstrace JstraceAspect
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat-jstrace', 'JstraceAspect');
var Utils = require('../util/utils');
var trace = require('jstrace');

var JstraceAspect = function() {
	this.traceRecord = {};
}

module.exports = JstraceAspect;

JstraceAspect.prototype.doJstrace = function() {
	var self = this;
	arguments = Array.prototype.slice.apply(arguments);

	var target = arguments.shift();
	var method = arguments.shift();
	var next = arguments.pop();
	var args = arguments;

	var key = this.getTraceKey(target, method);
	var id = this.getTraceId(key);

	var traceObj = {
		id: id,
		method: method
	};

	if (target['traceName']) {
		traceObj['target'] = target['traceName'];
	}

	// logger.info("bearcat:method:start %j", traceObj);
	trace("bearcat:method:start", traceObj);

	var invokeCb = function() {
		arguments = Array.prototype.slice.apply(arguments);
		// logger.info("bearcat:method:end %j", traceObj);
		trace("bearcat:method:end", traceObj);
		next.apply(null, arguments);
	}

	args.push(invokeCb);
	target[method].apply(target, args);
}

JstraceAspect.prototype.getTraceId = function(key) {
	if (!this.traceRecord[key]) {
		this.traceRecord[key] = 0;
	}

	return ++this.traceRecord[key];
}

JstraceAspect.prototype.getTraceKey = function(target, method) {
	if (target['traceName']) {
		return target['traceName'] + '.' + method;
	}

	return method;
}