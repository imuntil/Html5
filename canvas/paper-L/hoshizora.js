/**
 * Created by jtun02 on 15/1/14.
 */
var path = new Path.Star(new Point(0,0), 6, 5, 13);
path.style = {
    fillColor: 'white',
    strokeColor:'black'
};

var symbol = new Symbol(path);
var group = new Group();

path.remove();


for (var i = 0; i < 100; i++) {

    var instance = symbol.place();

    instance.position = Point.random() * view.size;

    instance.rotate(Math.random() * 360);
//
    instance.scale(0.1 + Math.random() * 0.75);

//    var _r = Math.round(Math.random()*255),
//        _g = Math.round(Math.random()*255),
//        _b = Math.round(Math.random()*255);
//
//    instance.style = {
//        fillColor:'red',
//        strokeColor:'rgb('+_r+','+_g+','+_b+')'
//    };
//
//    group.addChild(instance);
}

//function onFrame(e) {
//    for (var j = 0; j < group.children.length; j++) {
//        var _r = Math.round(Math.random()*255),
//            _g = Math.round(Math.random()*255),
//            _b = Math.round(Math.random()*255);
//
////        group.children[j].currentstyle = 'rgb('+_r+','+_g+','+_b+')';
////        group.children[j].strokeColor = 'rgb('+_r+','+_g+','+_b+')';
//
//        group.children[j].currentStyle = {
//            fillColor:'rgb('+_r+','+_g+','+_b+')',
//            strokeColor:'rgb('+_r+','+_g+','+_b+')'
//        }
//    }
//}
