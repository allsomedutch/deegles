/**
 * APP:
 * COMPANY:
 *
 * MODULE:    Client Device Detection Module
 *
 * DEVELOPER: Oladotun Sobande
 * DATE:      18th July 2016
 */

var MobileDetect = require('mobile-detect');

//Add code for counting mobile and web users

function UserClient(req){
    this.req = req;
    this.status = false;
}

UserClient.prototype.isMobile = function(){
    var self = this;
    self.md = new MobileDetect(this.req.headers['user-agent']);
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

exports.checkDevice = function(rq){
    var usc = new UserClient(rq);
    return usc.isMobile();
};
