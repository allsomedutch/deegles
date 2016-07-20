/**
 * APP:
 * COMPANY:
 *
 * MODULE:    User Authentication Module
 *
 * DEVELOPER: Oladotun Sobande
 * DATE:      20th July 2016
 */

var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var redis = require('redis');
var crypto = require('crypto');
var db = require('../data/db');

var app = express();

var lf = fs.createWriteStream(path.join('logs/auth-logger.log'), { flag : 'a' });
app.use(logger('common', {stream : lf}));

function UserAuthentication(user, pwd){
    this.user = user;
    this.pwd = pwd;
    this.getSalt = function(){
        return crypto.randomBytes(64).toString('hex');
    }
    this.getHash = function() {
        return crypto.createHmac('SHA256', this.getSalt()).update(this.pwd).digest('base64');
    };
}

UserAuthentication.prototype.isUser = function(){
    //Get password of user whose username is equal to <user>

};

