/**
 * Created by jtun02 on 15/1/14.
 */
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
originPath.fillColor = 'yellow';
originPath.strokeWidth = 4;


var scoreText = new PointText({
    point:[200,50],
    fillColor:'black',
    fontSize:20,
    fontWeight:'bold'
});


var Drawed = null,
    canDraw = false;//mouseDown
var DrawEnd = false;
//function onMouseDown(e) {
//    if (!Drawed && canDraw) {
//        Drawed = new Path();
//        Drawed.strokeColor = 'red';
//
//        Drawed.add(e.point);
//    }
//}
//
//function onMouseDrag(e) {
//    if (canDraw) {
//        Drawed.add(e.point);
//    }
//}
//
////var _tem = false;
//function onMouseUp(e) {
//    canDraw = false;
////    Drawed.add(Drawed.firstPoint());
//    Drawed.closed = true;
////    Drawed.smooth();
//
////    _tem = !_tem;
//
//    var _unite = Drawed.unite(originPath);
//    var _intersect = Drawed.intersect(originPath);
//    _unite.strokeColor = null;
//    _intersect.strokeColor = null;
//
////    if (_tem) {
//        _intersect.fillColor = 'rgba(199,23,67,0.7)';
////        _unite.fillColor = null;
////    } else {
//        _unite.fillColor = 'rgba(48,123,67,0.7)';
////        _intersect.fillColor = null;
////    }
//
//    scoreText.content = (_intersect.area/_unite.area*100).toFixed(2)+'%';
//}

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.strokeStyle = 'rgba(255,0,0,0.5)';
context.strokeWidth = 4;
var points = [];


function getLocalCoords(elem, ev) {
    var ox = 0, oy = 0;
    var first;
    var pageX, pageY;
    while (elem != null) {
        ox += elem.offsetLeft;
        oy += elem.offsetTop;
        elem = elem.offsetParent;
    }
    if (ev.hasOwnProperty('changedTouches')) {
        first = ev.changedTouches[0];
        pageX = first.pageX;
        pageY = first.pageY;
    } else {
        pageX = ev.pageX;
        pageY = ev.pageY;
    }
    return { 'x': pageX - ox, 'y': pageY - oy };
}

function touchBeginHandle(e) {
    if (DrawEnd) return;
    canDraw = true;
    e.preventDefault();

    var local = getLocalCoords(canvas, e);
    points.push(local);

    drawCurve(local, true);
}

function touchMoveHandle(e) {
    if (DrawEnd || !canDraw) return;
    e.preventDefault();

    var local = getLocalCoords(canvas, e);
    points.push(local);
    drawCurve(local, false);
}

function touchEndHandle(e) {
    if (DrawEnd) return;

    canDraw = false;
    e.preventDefault();

    var local = getLocalCoords(canvas, e);
    points.push(local);

    drawCurve(local, false);
    DrawEnd = true;

    if (!canDraw) {
        Drawed = new Path();
        Drawed.strokeColor = 'rgba(255,0,0,0.5)';
//        points.forEach(function(item,index,array) {
//
//            Drawed.add(new Point(item.x, item.y));
//            Drawed.closed = true;
//        });

        for (var i = 0; i < points.length; i ++) {
            var item = points[i];

            Drawed.add(new Point(item.x, item.y));
            Drawed.closed = true;
        }

        comparePath();
    }
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

    _intersect.fillColor = 'rgba(199,23,67,0.7)';
    _unite.fillColor = 'rgba(48,123,67,0.7)';

    scoreText.content = (_intersect.area/_unite.area*100).toFixed(2)+'%';
}

window.addEventListener('mousedown', touchBeginHandle, false);
window.addEventListener('touchstart', touchBeginHandle, false);
window.addEventListener('mousemove', touchMoveHandle, false);
window.addEventListener('touchmove', touchMoveHandle, false);
window.addEventListener('mouseup', touchEndHandle, false);
window.addEventListener('touchend', touchEndHandle);

//document.getElementById('restart').addEventListener('click', function() {
//    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
//},false);