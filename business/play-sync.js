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
var crypto = require('crypto');

var datetime = require('../date-time'); //Import the DateTime Module

var app = express();

var lff = fs.createWriteStream(path.join('logs/play-sync-logger.log'), { flag : 'a' });
app.use(logger('common', {stream : lff}));

//Retrieve Hash Key name for Connected Users
var obj = JSON.parse(fs.readFileSync('../defaults.json'));
var wschash = obj.connUsersRedis; //Set Connected users Hash name

function AccessSync(){
    this.init = function(){
        var self = this;

        self.client = redis.createClient(); //Connect to Redis Server

        //Log successful connection to Redis
        self.client.on('connect', function() {
            lff.write('['+datetime.currentDateTime()+'] - Redis Server: CONNECTED\r\n');
            console.log('['+datetime.currentDateTime()+'] - Redis Server: CONNECTED');
        });

        //Log unsuccessful connection to Redis
        self.client.on('error', function(){
            lff.write('['+datetime.currentDateTime()+'] - Redis Server: UNABLE TO CONNECT\r\n');
            console.log('['+datetime.currentDateTime()+'] - Redis Server: UNABLE TO CONNECT');
        });
        return self.client;
    };
}

AccessSync.prototype.genToken = function(){
    var self = this;

    self.cd = Math.floor((Math.random() * 15) + 10);
    self.tkn = crypto.randomBytes(self.cd).toString('hex');

    return self.tkn;
}

AccessSync.prototype.updateUser = function(uid, tkn){
    var self = this;
    self.stt = 0;

    self.usr = this.init(); //Get RedisClient Connection Instance
    self.usr.hkeys(wschash, function(err, rep){
        //Check whether user exist
        for(var i in rep){
            if(rep[i] === uid){
                self.usr.hset(wschash, rep[i], tkn, function(err, rep){
                    if(rep === 1){
                        self.stt = 1;
                        console.log('['+datetime.currentDateTime()+'] - Redis Server: User ['+uid+'] Updated');
                    }
                });
                self.usr.quit();
                break;
            }
        }
    });

    return self.stt;
};

AccessSync.prototype.addUser = function(uid, tkn){
    var self = this;
    self.stt = 0;

    self.usr = this.init(); //Get RedisClient Connection Instance
    self.usr.hset(wschash, uid, tkn, function(err, rep){
        if(rep === 1){
            self.stt = 1;
            console.log('['+datetime.currentDateTime()+'] - Redis Server: User ['+uid+'] Added');
        }
    });
    self.usr.quit();

    return self.stt;
};

AccessSync.prototype.removeUser = function(uid){
    var self = this;
    self.stt = 0;

    self.usr = this.init(); //Get RedisClient Connection Instance
    self.usr.hkeys(wschash, function(err, rep){
        //Check whether user exist
        for(var i in rep){
            if(rep[i] === uid){
                self.usr.hdel(wschash, rep[i], function(err, rep){
                    if(rep === 1){
                        self.stt = 1;
                        console.log('['+datetime.currentDateTime()+'] - Redis Server: User ['+uid+'] Deleted');
                    }
                });
                self.usr.quit();
                break;
            }
        }
    });

    return self.stt;
};

exports.connectUser = function(uid, actn){
    var prc = new AccessSync();
    var pkg = null;

    switch(actn){
        case "ADD":
            pkg = prc.addUser(uid, prc.genToken());
            break;
        case "UPD":
            pkg = prc.updateUser(uid, prc.genToken());
            break;
        case "REM":
            pkg = prc.removeUser(uid);
            break;
    }
    return pkg;
};