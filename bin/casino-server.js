#!/usr/bin/env node

'use strict';

var Server = require('../lib/login_server'),
	Casino = require('../lib/game_server'),
	conf = require('../conf/casino.conf.js');

var argv = require('minimist')(process.argv.slice(2));

if(argv.p) conf.server.port = argv.p;
if(argv.h) conf.server.host = argv.h;
//if(argv.r) {
//	var words = argv.r.split(':');
//	if(words[0]) conf.redis.host = words[0];
//	if(words[1]) conf.redis.port = parseInt(words[1]);
//}

if (process.env.REDISCLOUD_URL) {
  // use production (Heroku) redis configuration
  // overwrite config to keep it simple
  var rtg = require(‘url’).parse(process.env.REDISCLOUD_URL);
  conf.redis.port = rtg.port;
  conf.redis.host = rtg.hostname;
  conf.redis.password = rtg.auth.split(“:”)[1];
}

var server = new Server().startup( conf );
var casino = new Casino().startup( conf );

