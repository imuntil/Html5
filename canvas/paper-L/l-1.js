/**
 * Created by jtun02 on 15/1/12.
 */


var raster = new Raster({
    source:'../abcd.jpg',
    position:view.center
});

var rec = new Path.Rectangle(0, 0, 20, 20);
//rec.fillColor = 'rgba(100,30,201,0.3)';

var handleIn = new Point(-300, 100);
var handleOut = new Point(300, -100);

var firstPoint = new Point(100, 50);
var firstSegment = new Segment(firstPoint, null, handleOut);

var secondPoint = new Point(300, 50);
var secondSegment = new Segment(secondPoint, handleIn, null);

var path = new Path(firstSegment, secondSegment);
path.strokeColor = 'black';
path.selected = true;
path.selectedColor = 'red';

var c_1 = new Path.Circle(handleOut, 5);
c_1.strokeColor = 'blue';

var _t = false;
//function onFrame(event) {
//    if (event.count < 30) {
//        //console.log(event.delta);
//        console.log(event);
//    }
//
//    path.rotate(3);
//}

var drawed;

var myPath = new Path();
myPath.strokeColor = 'black';
myPath.add(new Point(50, 75));
myPath.add(new Point(100, 25));
myPath.add(new Point(150, 75));

// Close the path:
myPath.closed = true;
myPath.smooth();
myPath.selected = true;


var otherPath = new Path({
    segments:[[100,100],[140,170],[120, 200],[80,150]],
    closed:true,
    strokeColor:'green',
    selected:true
});


var _x = (view.viewSize.width - raster.width)/2;
var _y = (view.viewSize.height - raster.height)/2

function onMouseDown(event) {
//    drawed = new Path({
//        segments: [event.point],
//        strokeColor: 'black',
//    });
    rec.fillColor = raster.getPixel(event.point - new Point(_x, _y));

//    var _c = new Path.Circle({
//        center:event.point-new Point(2,1),
//        radius:3,
//        fillColor:'black'
//    });
}

function onMouseDrag(event) {
//    drawed.add(event.point);

//    rec.fillColor = raster.getPixel(event.point);

    myPath.position = event.point;

    myPath.fillColor = null;
    otherPath.fillColor = null;

    if (otherPath.intersects(myPath)) {
        myPath.fillColor = 'yellow';
        otherPath.fillColor = 'pink';

//        var _unite = myPath.unite(otherPath);
//        _unite.fillColor = 'white';

//        var _intersect = myPath.intersect(otherPath);
//        _intersect.fillColor = 'black';
//        console.log(_intersect.area);
    } else {
        myPath.fillColor = null;
        otherPath.fillColor = null;
    }

//    var _p = myPath.subtract(otherPath);
//    _p.fillColor = 'yellow';
}

var _rect = new Path.Rectangle(new Point(200,200), new Size(100,20));
_rect.strokeColor = 'black';

console.log(myPath.area);
console.log(otherPath.area);
console.log(_rect.area);

function onMouseUp(event) {
//    if (status === 1) {
//        if (drawed) {
//            status = 2;
//        }
//    }

    console.log('...');
}

var lenPoint = new Point(10, 20);
console.log('len:'+lenPoint.length);

var curvePath = new Path({
    segments:[[300,300],[350,300]],
    strokeColor:'black'
});
curvePath.quadraticCurveTo(new Point(400,300), new Point(400, 350));
curvePath.quadraticCurveTo(new Point(400,390), new Point(350, 390));