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


var app = express();

var lf = fs.createWriteStream(path.join('logs/logger.log'), { flag : 'a' });
app.use(logger('common', {stream : lf}));



function crtm(){
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();

    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

    // Choose either "AM" or "PM" as appropriate
    var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

    // Convert the hours component to 12-hour format if needed
    currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

    // Convert an hours component of "0" to "12"
    currentHours = ( currentHours === 0 ) ? 12 : currentHours;

    // Compose the string for display
    var currentTimeString = currentHours +":"+ currentMinutes +":"+ currentSeconds +" "+ timeOfDay;

    return String(currentTimeString);
}