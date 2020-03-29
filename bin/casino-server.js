#!/usr/bin/env node

'use strict';

var Server = require('../lib/login_server'),
	Casino = require('../lib/game_server'),
	conf = require('../conf/casino.conf.js');

var argv = require('minimist')(process.argv.slice(2));

if(argv.p) conf.server.port = argv.p;
if(argv.h) conf.server.host = argv.h;


conf.redis.host = 'h:p4a0ccca5c529159eb6068ab5ea76bad8c04f67969ea86d3bc93c355d01abb34d@ec2-52-50-101-139.eu-west-1.compute.amazonaws.com';
conf.redis.port = 24249;

var server = new Server().startup( conf );
var casino = new Casino().startup( conf );

