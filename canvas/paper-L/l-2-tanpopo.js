/**
 * Created by jtun02 on 15/1/12.
 */

var path = new Path();
path.strokeColor = '#567e37';
path.strokewidth = 5;
var firstPoint = new Point(0, 550);
path.add(firstPoint);

var throughPoint = new Point(75, 400);
var toPoint = new Point(100, 250);

path.arcTo(throughPoint, toPoint);

path.fullyselected = true;

var circle = new Path.Circle(throughPoint, 5);

circle.fillColor = '#cc0000';


var bulb = new Path.Circle(toPoint, 10);
bulb.fillColor = '#567e37';
