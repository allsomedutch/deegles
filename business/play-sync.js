/**
 * APP:
 * COMPANY:
 *
 * MODULE:    User Access Synchronization Module
 *
 * DEVELOPER: Oladotun Sobande
 * DATE:      20th July 2016
 */

var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var redis = require('redis');

var datetime = require('../date-time'); //Import the DateTime Module

var app = express();

var lff = fs.createWriteStream(path.join('logs/upd-sync-logger.log'), { flag : 'a' });
app.use(logger('common', {stream : lff}));

//Connect to Redis Server
var client = redis.createClient();
client.on('connect', function() {
    lff.write('['+datetime.currentDateTime()+'] : Connected to Redis\r\n');
    console.log(datetime.currentDateTime()+' - Connected to Redis');
});

function AccessSync(){

}