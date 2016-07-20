/**
 * APP:
 * COMPANY:
 *
 * MODULE:    REST Web Service Endpoint Module
 *
 * DEVELOPER: Oladotun Sobande
 * DATE:      15th July 2016
 */

var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');

var datetime = require('../date-time');


var app = express();

var lf = fs.createWriteStream(path.join('logs/data-channel-logger.log'), { flag : 'a' });
app.use(logger('common', {stream : lf}));



