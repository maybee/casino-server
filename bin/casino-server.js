

var Server = require('../lib/login_server'),
	Casino = require('../lib/game_server'),
	conf = require('../conf/casino.conf.js');

var url = require('url');

var argv = require('minimist')(process.argv.slice(2));

if(argv.p) conf.server.port = argv.p;
if(argv.h) conf.server.host = argv.h;

conf.redis.host= 'redis-13992.c226.eu-west-1-3.ec2.cloud.redislabs.com';
//url.parse(process.env.REDISCLOUD_URL).host; 
conf.redis.port=13992;
//url.parse(process.env.REDISCLOUD_URL).port; 
conf.redis.passwd= '7Gdn1fP68wUEGVIin5kGapPzGrp6Ua5m';
//url.parse(process.env.REDISCLOUD_URL).auth.split(“:”)[1]; 


if(argv.r) {
	var words = argv.r.split(':');
	if(words[0]) conf.redis.host = words[0];
	if(words[1]) conf.redis.port = parseInt(words[1]);
}

var server = new Server().startup( conf );
var casino = new Casino().startup( conf );
