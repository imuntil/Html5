/**
 * Created by jtun02 on 15/4/15.
 */
//横竖屏
var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, function() {
    orientationf();
}, false);

function orientationf() {
    if (Math.abs(window.orientation) == 90) {

    } else {

    }
}