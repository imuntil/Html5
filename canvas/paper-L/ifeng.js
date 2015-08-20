/**
 * Created by jtun02 on 15/1/13.
 */

var back = Path.Rectangle({
    point:[0, 0],
    size:[800,600],
    fillColor:'rgba(100,150,80,0.3)'
});

var path = new Path({
    strokeColor:'black',
    segments: [[200,200],[300,200],[310,160],[390,160],[400,200],[500,200],[500,350],[200,350]]
});
path.closed = true

var circle = new Path.Circle({
    center:path.position,
    radius:3,
    fillColor:'black'
});


var perfectText = new PointText({
    point:[400, 50],
    justification:'center',
    fillColor:'black',
    fontSize:20
});

var drawed = null,
    status = 1;
function onMouseDown(e) {
    if (status == 1) {
        if (!drawed) {
            drawed = new Path({
                segments:[e.point],
                strokeColor:'red'
            });

            path.visible = false;
        }
    }

}

function onMouseDrag(e) {
    if (status == 1) {
        drawed.add(e.point);

    }
}

function onMouseUp(e) {
    if (status == 1) {
        drawed.add(e.point);
        status = 2;

//        drawed.closed = true;
//        drawed.smooth();
    }
}


var hintLineRotate = 0;
var rotation = 0;
var hintLongLine = new Path.Line(path.position, new Point(path.position.x, path.position.y-500));
var simplified = null;
var intersections = [];
var perfection = 1;
function onFrame(e) {
    if (status == 2) {

        if (!path.visible) {
            path.visible = true;
        }

        if (hintLineRotate < 359.9) {
            rotation = e.delta * 200;
            hintLineRotate += rotation;

            if (hintLineRotate > 360) {
                rotation = 360 - hintLineRotate + rotation;
                hintLineRotate = 360;
            }

            hintLongLine.rotate(rotation, path.position);

            var intersectionDraw = hintLongLine.getIntersections(drawed);
            var intersectionOrigin = hintLongLine.getIntersections(path);

            var inter1 = path.position;
            if (intersectionDraw.length) {
                inter1 = intersectionDraw[0].point;
            }

            var inter2 = inter1;
            if (intersectionOrigin.length) {
                inter2 = intersectionOrigin[0].point;
            }

            if (!simplified) {
                simplified = new Path();
                simplified.visible = false;
            }

            simplified.add(inter1);
            var intersectionLine = new Path.Line(inter1, inter2);
            intersections.push(intersectionLine);
            intersectionLine.strokewidth = 3;
            intersectionLine.strokeColor = 'blue';

            var distance1 = inter1.getDistance(inter2);
            var distance2 = path.position.getDistance(inter1);

            perfection -= distance1 / distance2 * rotation / 360;

            if (perfection < 0) {
                perfection = 0;
            }

            perfectText.content = (perfection * 100).toFixed(2) + '%';
        } else {
            if (!simplified.visible) {
                simplified.closed = true;
                simplified.smooth();
                simplified.strokeColor = 'orange';
                simplified.strokewidth = 2;
                simplified.opacity = 0;
                simplified.visible = true;
            } else if (simplified.opacity < 0.8) {
                opacity = simplified.opacity + e.delta;
                if (opacity > 1) {
                    opacity = 1;
                }

                simplified.opacity = opacity;
                drawed.opacity = 1 - opacity;
            } else {

            }
        }


    }
}