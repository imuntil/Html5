/**
 * Created by jtun02 on 14-8-8.
 */
    
var LuckyWheel = function() {
    this.defaults = {
        colors : ["#B8D430", "#3AB745", "#029990", "#3501CB",
            "#2E2C75", "#673A7E", "#CC0071", "#F80120",
            "#F35B20", "#FB9A00", "#FFCC00", "#FEF200"],
        rewards : ["X2", "X4", "X5", "继续努力","双色球一注","5000元现金","iphone6一台","苹果笔记本一台","未来人类一台"],
        canvasId:'',
        OUTSIDE_RADIUS : null,
        TEXT_RADIUS : null,
        INSIDE_RADIUS : null,

        lineColor :'#CFCFCF',
        fontStyle : 'bold 16px sans-serif',
        backColor : '#fff',
        fontColor : '#fff',
        arrowColor: '#fff',

        callbackFunction:undefined
    };

    this.canvas = undefined;
    this.context = undefined;
    this.wheelSize = undefined;
    this.OUTSIDE_RADIUS = undefined;
    this.TEXT_RADIUS = undefined;
    this.INSIDE_RADIUS = undefined;

    this.spinAngle = 10;
    this.remainStartAngle = 0;
    this.spinAngleStart = 0;
    this.rewardAngle = undefined;
    this.remain = false;
    this.rewardIndex = 0;
    this.spinTimeTotal = 0;

    this.rotating = false;
    this.ARC = undefined;

    this.callbackFunction = undefined;
};

LuckyWheel.prototype.init = function(options) {
    if (options) {
        this.defaults = $.extend(this.defaults, options);
        this.canvas = document.getElementById(this.defaults.canvasId);
        this.wheelSize = (this.canvas.width >= this.canvas.height ? this.canvas.height : this.canvas.width);
        this.context = this.canvas.getContext('2d');

        this.OUTSIDE_RADIUS = this.defaults.OUTSIDE_RADIUS || this.wheelSize*0.8/2;
        this.TEXT_RADIUS = this.defaults.TEXT_RADIUS || this.wheelSize*0.6/2;
        this.INSIDE_RADIUS = this.defaults.INSIDE_RADIUS || this.wheelSize*0.1/2;
        this.ARC = 2*Math.PI/this.defaults.rewards.length;

        this.callbackFunction = this.defaults.callbackFunction;
    }

    this.reset();
    this.drawRouletteWheel();
};

LuckyWheel.prototype.drawRouletteWheel = function() {

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//    this.context.save();
    this.context.strokeStyle = this.defaults.lineColor;
    this.context.lineWidth = 2;

    this.context.font = this.defaults.fontStyle;
    this.context.fillStyle = this.defaults.backColor;
    this.context.arc(this.wheelSize/2, this.wheelSize/2, this.OUTSIDE_RADIUS+15, 0, 2*Math.PI, true);
    this.context.stroke();
    this.context.fill();
//    this.context.save();
    for(var i = 0; i < this.defaults.rewards.length; i++) {
        var angle = this.startAngle + i*this.ARC - Math.PI/2;

        this.context.fillStyle = this.defaults.colors[i];
        this.context.beginPath();
        this.context.arc(this.wheelSize/2, this.wheelSize/2, this.OUTSIDE_RADIUS, angle, angle + this.ARC, false);
        this.context.arc(this.wheelSize/2, this.wheelSize/2, this.INSIDE_RADIUS, angle + this.ARC, angle, true);
        this.context.stroke();
        this.context.fill();
        this.context.save();

        this.context.fillStyle = this.defaults.fontColor;
        this.context.translate(this.wheelSize/2 + Math.cos(angle + this.ARC/2) * this.TEXT_RADIUS,
            this.wheelSize/2 + Math.sin(angle + this.ARC/2) * this.TEXT_RADIUS);
        this.context.rotate(angle + this.ARC/2 + Math.PI/2);
        var text = this.defaults.rewards[i];
        this.context.fillText(text, -this.context.measureText(text).width/2, 0);
        this.context.restore();
    }

    this.context.fillStyle = this.defaults.arrowColor;
    this.context.beginPath();
    this.context.moveTo(this.wheelSize/2 - 4, this.wheelSize/2 - (this.OUTSIDE_RADIUS + 5));
    this.context.lineTo(this.wheelSize/2 + 4, this.wheelSize/2 - (this.OUTSIDE_RADIUS + 5));
    this.context.lineTo(this.wheelSize/2 + 4, this.wheelSize/2 - (this.OUTSIDE_RADIUS - 5));
    this.context.lineTo(this.wheelSize/2 + 9, this.wheelSize/2 - (this.OUTSIDE_RADIUS - 5));
    this.context.lineTo(this.wheelSize/2 + 0, this.wheelSize/2 - (this.OUTSIDE_RADIUS - 23));
    this.context.lineTo(this.wheelSize/2 - 9, this.wheelSize/2 - (this.OUTSIDE_RADIUS - 5));
    this.context.lineTo(this.wheelSize/2 - 4, this.wheelSize/2 - (this.OUTSIDE_RADIUS - 5));
    this.context.lineTo(this.wheelSize/2 - 4, this.wheelSize/2 - (this.OUTSIDE_RADIUS + 5));
    this.context.fill();
};

LuckyWheel.prototype.spin = function(index) {
    if (this.rotating) {
        return;
    }

    this.rotating = true;
    this.spinAngleStart = 50;
    this.spinTimeTotal = 5000;
    this.rewardIndex = index;

    this.reset();
    this.checkReward();
    this.rotateWheel();
};

LuckyWheel.prototype.reset = function() {
    this.spinTime = 0;
    this.startAngle = 0;
    this.spinAngle = 10;
    this.remainStartAngle = 0;
    this.rewardAngle = 0;
    this.remain = false;
}

LuckyWheel.prototype.checkReward = function() {
    var len = this.defaults.rewards.length,
        id = len - (this.rewardIndex - 1),
        r = Math.random()*(len-2)+ 1,
        rs = id/len * 2 * Math.PI;
    this.rewardAngle = rs - Math.PI*2*r/(len*len);
};

LuckyWheel.prototype.rotateWheel = function() {
    this.spinTime += 20;

    if (this.spinAngle > 1.5) {
        this.spinAngle = this.spinAngleStart - this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
        this.startAngle += (this.spinAngle * Math.PI / 180);
    } else {
        if (! this.remain) {
            this.remainStartAngle = this.startAngle % (Math.PI * 2);
            this.rewardAngle = this.rewardAngle > this.remainStartAngle ? this.rewardAngle : (this.rewardAngle + Math.PI * 2);
            this.remain = true;
        }

        this.remainStartAngle += (this.spinAngle * Math.PI / 180);
        this.startAngle = this.remainStartAngle;

        if (this.startAngle >= this.rewardAngle) {
            this.stopRotateWheel();
            return;
        }
    }

    this.drawRouletteWheel();
    var that = this;
    that.spinTimeout = setTimeout(function() {
        that.rotateWheel();
    }, 20);
};

LuckyWheel.prototype.stopRotateWheel = function() {
    clearTimeout(this.spinTimeout);
    this.rotating = false;

    if (Object.prototype.toString.call(this.callbackFunction).slice(8, -1) == 'Function') {
        this.callbackFunction();
    }
};

LuckyWheel.prototype.easeOut = function(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
};

