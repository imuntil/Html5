/**
 * Created by jtun02 on 15/1/15.
 */


var Q = (function() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : '');

    var args = {};

    var items = qs.split('&');
    var item = null,
        key = null,
        value = null;

    for (var i = 0; i < items.length; i ++) {
        item = items[i].split('=');
        key = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        args[key] = value;
    }
    return args;
})();


var originPath = new Path();
originPath.strokeColor = 'rgba(0,0,0,0.5)';
originPath.add(new Point(130, 270));
originPath.add(new Point(130, 250));
originPath.arcTo(new Point(250, 250));
originPath.add(new Point(250, 270));
originPath.quadraticCurveTo(new Point(300,270), new Point(300,320));
originPath.add(new Point(300,400));
originPath.arcTo(new Point(270,400));
originPath.add(new Point(270,320));
originPath.arcTo(new Point(260,310),new Point(250, 320));
originPath.add(new Point(250, 550),new Point(200, 550), new Point(200, 400));
originPath.add(new Point(180, 400),new Point(180, 550), new Point(130, 550));
originPath.add(new Point(130,320));
originPath.arcTo(new Point(120,310),new Point(110, 320));
originPath.add(new Point(110,400));
originPath.arcTo(new Point(80,400));
originPath.add(new Point(80,320));
originPath.quadraticCurveTo(new Point(80,270), new Point(130,270));
originPath.closed = true;
//originPath.fillColor = 'yellow';
originPath.strokeWidth = 4;

var startArea = new Path.Circle({
    center:[130,250],
    radius:10,
    fillColor:'yellow'
});


var scoreText = new PointText({
    point:[200,50],
    fillColor:'black',
    fontSize:20,
    fontWeight:'bold'
});


var Drawed = null,
    canDraw = true;

var status = 0;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.strokeStyle = 'yellow';
context.lineWidth = 3;
var points = [];
var currentScore = 100,
    finallyScore = 0;
var startPoint;

function onMouseDown(e) {

    startPoint = e.point;
    if (!startArea.contains(startPoint)) return;
    if (canDraw) {
        points = [];
        points.push(e.point);
        drawCurve({x:e.point.x, y:e.point.y}, true);
    }
}

function onMouseDrag(e) {

    if (!startArea.contains(startPoint)) return;
    if (canDraw) {

        points.push(e.point);
        drawCurve({x:e.point.x, y:e.point.y}, false);
    }
}

//var _tem = false;
function onMouseUp(e) {
    if (!canDraw) return;

    if (!startArea.contains(startPoint)) return;

    canDraw = false;

    points.push(e.point);
    drawCurve({x:e.point.x, y:e.point.y}, false);

    Drawed = new Path();
    Drawed.strokeColor = 'yellow';
    Drawed.strokeWidth = 3;

    for (var i = 0; i < points.length; i ++) {
        var item = points[i];

        Drawed.add(new Point(item.x, item.y));
        Drawed.closed = true;
    }

    comparePath();
}


function onFrame(e) {
    if(status == 1) {
        if (currentScore > finallyScore) {
            var _d = e.delta > 0.05 ? 0.05 : e.delta;
            currentScore -= _d * (10 + Math.random()*30);
            if (currentScore < 0) {
                currentScore = 0;
            }
            scoreText.content = currentScore.toFixed(2)+'%';
        } else {
            showScore();
            status = 0;
        }
    }
}

function showScore() {
    var _c = currentScore.toFixed(2),
        _after = '';

    if (_c <= 10) {
        _after = '天生体质弱了点只能遥望星空';
    } else if (_c <= 20) {
        _after = '太顽皮把自己玩坏了';
    } else if (_c <= 30) {
        _after = '33333';
    } else if (_c <= 40) {
        _after = '444';
    } else if (_c <= 50) {
        _after = '555';
    } else if (_c <= 60) {
        _after = '666';
    } else if (_c <= 70) {
        _after = '7777';
    } else if (_c <= 80) {
        _after = '8888';
    } else if (_c <= 90) {
        _after = '9999';
    } else if (_c < 100) {
        _after = '0000';
    } else {
        _after = '1111';
    }

    alert('为成为宇航员，坚守度'+_c+','+_after);
}

function drawCurve(p, fresh) {

    if (fresh) {
        context.beginPath();
        context.moveTo(p.x, p.y);
    }
    context.lineTo(p.x, p.y);

    if (!canDraw) {
        context.closePath();
    }

    context.stroke();
}

function comparePath() {
    var _unite = Drawed.unite(originPath);
    var _intersect = Drawed.intersect(originPath);
    _unite.strokeColor = null;
    _intersect.strokeColor = null;

//    _intersect.fillColor = 'rgba(199,23,67,0.7)';
//    _unite.fillColor = 'rgba(48,123,67,0.7)';

    var _p = _intersect.area/_unite.area;
    var _percent = _p < 1 ? _p*100 :1/_p*100;

    finallyScore = _percent.toFixed(2);

//    scoreText.content = _percent.toFixed(2)+'%';

    status = 1;
    scoreText.visible = true;
}

function restartGame() {
    Drawed.remove();
    canDraw = true;
    status = 0;

    currentScore = 100;
    finallyScore = 0;

    scoreText.content = '100%';
    scoreText.visible = false;
}

document.getElementById('restart').addEventListener('click', function() {
//    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    restartGame();
},false);