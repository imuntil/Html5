/**
 * Created by jtun02 on 14-3-4.
 */

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),

    fontSelect = document.getElementById('fontSelect'),
    sizeSelect = document.getElementById('sizeSelect'),
    fillStyleSelect = document.getElementById('fillStyleSelect'),
    strokeStyleSelect = document.getElementById('strokeStyleSelect'),
    cursorWidthStyleSelect = document.getElementById('cursorWidthStyleSelect'),

    cursor = new TextCursor(),

    blinkingInterval,

    line;


function windowToCanvas(e) {
    var x = e.x || e.clientX,
        y = e.y || e.clientY,
        bbox = canvas.getBoundingClientRect();

    return { x:x - bbox.left * (canvas.width / bbox.width),
             y:y - bbox.top * (canvas.height / bbox.height)
            };
}

function saveDrawingSurface() {
    drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

function setFont() {
    context.font = sizeSelect.value + 'px ' + fontSelect.value;
//    alert(sizeSelect.value + 'px' + fontSelect.value);
//    alert(context.font);
}

function blinkCursor(loc) {
    clearInterval(blinkingInterval);
    blinkingInterval = setInterval(function(e) {
        cursor.erase(context, drawingSurfaceImageData);

        setTimeout(function(e) {
            if (cursor.left == loc.x &&
                cursor.top + cursor.getHeight(context) == loc.y) {
                cursor.draw(context, loc.x, loc.y);
            }
        }, 500);
    }, 1000);
}

function moveCursor(loc) {
    cursor.erase(context, drawingSurfaceImageData);
    saveDrawingSurface();
    context.putImageData(drawingSurfaceImageData, 0 , 0);
    cursor.draw(context, loc.x, loc.y);
    blinkCursor(loc);
}


canvas.onmousedown = function(e) {
    var loc = windowToCanvas(e);

    line = new TextLine(loc.x, loc.y);
    moveCursor(loc);
}

fillStyleSelect.onchange = function(e) {
    cursor.fillStyle = fillStyleSelect.value;
    context.fillStyle = fillStyleSelect.value;
}

strokeStyleSelect.onchange = function(e) {
    cursor.strokeStyle = strokeStyleSelect.value;
    context.strokeStyle = strokeStyleSelect.value;
}

fontSelect.onchange = setFont;
sizeSelect.onchange = setFont;

cursor.fillStyle = fillStyleSelect.value;
cursor.strokeStyle = strokeStyleSelect.value;

context.fillStyle = fillStyleSelect.value;
context.strokeStyle = strokeStyleSelect.value;

//cursor.width = 2;

context.lineWidth = 2.0;


function drawBackground() {
    var STEP_Y = 12,
        i = context.canvas.height;

    context.strokeStyle = 'rgba(0, 0, 200, 0.225)';
    context.lineWidth = 0.5;

    while(i > STEP_Y*4) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
        i -= STEP_Y;
    }

    context.save();

    context.strokeStyle = 'rgba(100, 0, 0, 0.3)';
    context.lineWidth = 1;

    context.beginPath();
    context.moveTo(35, 0);
    context.lineTo(35, context.canvas.height);
    context.stroke();

    context.restore();
}



document.onkeydown = function(e) {
    if (e.keyCode === 8 || e.keyCode === 13) {
        e.preventDefault();
    }

    if (e.keyCode === 8) {
        context.save();

        line.erase(context, drawingSurfaceImageData);
        line.removeCharacterBeforeCaret();

        moveCursor(line.left + line.getWidth(context), line.bottom);

        line.draw(context);

        context.restore();
    }
}

document.onkeypress = function(e) {
    var key = String.fromCharCode(e.which);

    if (e.keyCode !== 8 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();

        context.save();

        line.erase(context, drawingSurfaceImageData);
        line.insert(key);

        moveCursor(line.left + line.getWidth(context), line.bottom);

        context.shadowColor = 'rgba(0, 0, 0, 0.5)';
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowBlur = 2;

        line.draw(context);
        context.restore();
    }
}

setFont();
drawBackground();
saveDrawingSurface();