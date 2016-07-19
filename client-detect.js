/**
 * APP:
 * COMPANY:
 *
 * MODULE:    Client Device Detection Module
 *
 * DEVELOPER: Oladotun Sobande
 * DATE:      18th July 2016
 */

var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var MobileDetect = require('mobile-detect');

var app = express();

var lf = fs.createWriteStream(path.join('logs/logger.log'), { flag : 'a' });
app.use(logger('common', {stream : lf}));

function UserClient(req){
    var self = this;
    this.status = false;
    this.isMobile(req);
}

UserClient.prototype.isMobile = function(req){
    var self = this;
    self.md = new MobileDetect(req.headers['user-agent']);
    self.os = self.md.os();

    switch(self.os) {
        case "AndroidOS":
            this.status = true;
            break;
        case "iOS":
            this.status = true;
            break;
        case "WindowsPhoneOS":
            this.status = true;
            break;
        case null:
            this.status = false;
            break;
    }
    return this.status;
};

exports.checkDevice = function(req){
    var isMobile = new UserClient(req);
};
