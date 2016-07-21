/**
 * APP:
 * COMPANY:
 *
 * MODULE:    WebSocket Endpoint Module
 *
 * DEVELOPER: Oladotun Sobande
 * DATE:      20th July 2016
 */

var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var redis = require('redis');
var WebSocket = require('ws').Server;

var datetime = require('../date-time'); //Import the DateTime Module

var app = express();
var ws = new WebSocket({port: '3001'}); //Set WebSocket Endpoint

var lff = fs.createWriteStream(path.join('logs/upd-sync-logger.log'), { flag : 'a' });
app.use(logger('common', {stream : lff}));

var hashnm = "connclients";

//Connect to Redis Server
var client = redis.createClient();
client.on('connect', function() {
    lff.write('['+datetime.currentDateTime()+'] : Connected to Redis\r\n');
    console.log(datetime.currentDateTime()+' - Connected to Redis');
});

//Connected Users Prototype
function ManageUsers(){
    this.client = null;
    this.init = function(){
        this.client = redis.createClient();
        this.client.on('connect', function() {
            lff.write('['+datetime.currentDateTime()+'] : Connected to Redis\r\n');
            console.log(datetime.currentDateTime()+' - Connected to Redis');
        });
        return this.client;
    };
}

ManageUsers.prototype.updateUser = function(){

};

ManageUsers.prototype.addUser = function(socket){
    var self = this;
    self.usr = this.init(); //Get RedisClient object
    self.usr.hset(hashnm, socket, socket.upgradeReq.url);
    self.usr.quit();
};

ManageUsers.prototype.removeUser = function(){

};

ws.on('connection', function connection(socket) {
    var cn = new ManagerUsers();
    cn.addUser(socket);

    socket.on('message', function (message) {

    });

    socket.on('close', function(){
        removeClient(socket);
    });
});



exports.connectUser = function(usr, process){
    var cn = new ManagerUsers();
}

