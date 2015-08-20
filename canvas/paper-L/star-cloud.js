/**
 * Created by jtun02 on 15/1/27.
 */

var ca = new Path.Circle({
    center:[30, 80],
    radius:3,
    fillColor:'red'
});
var cb = new Path.Circle({
    center:[100, 70],
    radius:3,
    fillColor:'black'
});
var cc = new Path.Circle({
    center:[50, 180],
    radius:3,
    fillColor:'black'
});
var cd = new Path.Circle({
    center:[150, 100],
    radius:3,
    fillColor:'black'
});
var ce = new Path.Circle({
    center:[200, 160],
    radius:3,
    fillColor:'black'
});
var cf = new Path.Circle({
    center:[110, 40],
    radius:3,
    fillColor:'yellow'
});
var cg = new Path.Circle({
    center:[60, 150],
    radius:3,
    fillColor:'black'
});
var ch = new Path.Circle({
    center:[230, 120],
    radius:3,
    fillColor:'pink'
});

//x轴
//var xAxis = new Path.Line({
//    from:[0,125],
//    to:[300,125],
//    strokeColor:'black'
//});

//group

var group = new Group();
group.addChild(ca);
group.addChild(cb);
group.addChild(cc);
group.addChild(cd);
group.addChild(ce);
group.addChild(cf);
group.addChild(cg);
group.addChild(ch);

var cYs = [];
var lines = new Path();
lines.strokeColor = 'rgb(91,255,255)';
lines.strokewidth = 1;
for (var i=0; i<8; i++) {
    cYs.push(group.children[i].position.y);
    lines.add(group.children[i].position);
}
lines.closed = true;

group.addChild(lines);
lines.sendToBack();
//group.rotate(90);

//
//for (var i=0; i<8; i++) {
//    lines.segments[i].point = Point.random()*(new Point(220, 300))
//}


function onFrame(e) {
//    lines.remove();
    for (var i = 1 ; i< 9; i++) {
        var _c = group.children[i];
        var _p = _c.position;
        var _v = Math.cos(Math.PI/360 * e.count*i);
        var _py = (cYs[i-1] - 125)*_v;

        var _px = 0;
        if ( _v < 0) {
            _px = 1;
        }

        if (_v > 0) {
            _px = -1;
        }
        _c.position = new Point(_p.x, _py+125);


        lines.segments[i-1].point = group.children[i].position;
    }

//    for (var i=0; i<8; i++) {
//        lines.segments[i].point = group.children[i+1].position;
//    }

//    group.rotate(-1);
}

