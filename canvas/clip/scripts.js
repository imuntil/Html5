/**
 * Created by jtun02 on 14-2-28.
 */
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');


function drawText() {
    context.save();
    context.shadowColor = 'rgba(100, 100, 150, 0.8)';
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;

    context.fillStyle = 'cornflowerblue';
    context.fillText('HTML5', 20, 250);
    context.strokeStyle = 'yellow';
    context.strokeText('HTML5', 20, 250);
    context.restore();
}

context.lineWidth = 0.5;
context.font = '128pt Comic-sans';
//setClippingRegion(100);
//fillCanvas('green');
drawText();

function setClippingRegion(radius) {
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, radius, 0, Math.PI*2, false);
    context.clip();
}

function fillCanvas(color) {
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawAnimationFrame(radius) {
    setClippingRegion(radius);
    fillCanvas('lightgray');
    drawText();
}

function animate() {
    var radius = canvas.width/2,
        temp = radius,
        smalling = true,
        loop;

    loop = window.setInterval(function() {
        if (smalling) {
            radius -= canvas.width/100;
            if (radius < 0) {
                smalling = false;
            }
        } else {
            radius += canvas.width/100;
            if (radius > temp) {
                smalling = true;
            }
        }

        fillCanvas('blue');

        context.save();
        drawAnimationFrame(radius);
        context.restore();
//        if (smalling) {
//            context.save();
//            drawAnimationFrame(radius);
//            context.restore();
//        } else {
//            clearInterval(loop);
//            context.clearRect(0, 0, canvas.width, canvas.height);
////            context.width = context.width;
//        }
    },16);
}

canvas.onmousedown = function(e) {
    animate();
}