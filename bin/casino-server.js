

var Server = require('../lib/login_server'),
	Casino = require('../lib/game_server'),
	conf = require('../conf/casino.conf.js');

var redis_url = require('url').parse("redis://redistogo:d0aecc63770576ffc8eea3e87127e9ac@porgy.redistogo.com:11811/")

var argv = require('minimist')(process.argv.slice(2));

if(argv.p) conf.server.port = argv.p;
if(argv.h) conf.server.host = argv.h;

conf.redis.host= redis_url.hostname;
conf.redis.port=redis_url.port;
conf.redis.auth=redis_url.auth;

if(argv.r) {
	var words = argv.r.split(':');
	if(words[0]) conf.redis.host = words[0];
	if(words[1]) conf.redis.port = parseInt(words[1]);
}

var server = new Server().startup( conf );
var casino = new Casino().startup( conf );
