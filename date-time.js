/**
 * APP:
 * COMPANY:
 *
 * MODULE:    DateTime Module
 *
 * DEVELOPER: Oladotun Sobande
 * DATE:      20th July 2016
 */

function DateTime(dt){
    this.dt = dt;

    this.day = this.dt.getDate();
    this.month = this.dt.getMonth();
    this.year = this.dt.getFullYear();
    this.hrs = this.dt.getHours();
    this.min = this.dt.getMinutes();
    this.sec = this.dt.getSeconds();

    this.ampm = ( this.hrs < 12 ) ? "AM" : "PM";
}

DateTime.prototype.parseMonth = function(){
    var self = this;
    self.mon = null;

    //Convert numeric month values to string equivalent
    switch(this.month){
        case 0:
            self.mon = "JAN";
            break;
        case 1:
            self.mon = "FEB";
            break;
        case 2:
            self.mon = "MAR";
            break;
        case 3:
            self.mon = "APR";
            break;
        case 4:
            self.mon = "MAY";
            break;
        case 5:
            self.mon = "JUN";
            break;
        case 6:
            self.mon = "JUL";
            break;
        case 7:
            self.mon = "AUG";
            break;
        case 8:
            self.mon = "SEP";
            break;
        case 9:
            self.mon = "OCT";
            break;
        case 10:
            self.mon = "NOV";
            break;
        case 11:
            self.mon = "DEC";
            break;
    }
    return self.mon;
}

DateTime.prototype.getDate = function(){
    var self = this;

    //Generate the date string
    self.date = this.day.concat(' '+this.parseMonth()+' '+this.year);

    return self.date;
};

DateTime.prototype.getTime = function(){
    var self = this;

    //Convert Hours to 12-hour format
    if(this.hrs > 12){
        this.hrs = this.hrs - 12;
    }
    else if(this.hrs === 0){
        this.hrs = 12;
    }

    // Pad the minutes and seconds with leading zeros, if required
    this.min = ( this.min < 10 ? "0" : "" ) + this.min;
    this.sec = ( this.sec < 10 ? "0" : "" ) + this.sec;

    //Generate the time string
    self.time = this.hrs.concat(':'+this.min+':'+this.sec+' '+this.ampm);

    return self.time;
};

//Generate the Current Date and Time for export
exports.currentDateTime = function(){
    var dt = new DateTime(new Date());
    var d = dt.getDate();
    var t = dt.getTime();

    return d.concat(' '+t);
};


