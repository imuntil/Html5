/**
 * Created by jtun02 on 14-3-14.
 */

var ImagePainter = function(imageURL) {
    this.image = new Image();
    this.image.src = imageURL;
};

ImagePainter.prototype = {
    image: undefined,

    paint: function(sprite, context) {
        if (this.image !== undefined) {
            if (!this.image.complete) {
                this.image.onload = function(e) {
                    sprite.width = this.width;
                    sprite.height = this.height;

                    context.drawImage(
                        this,
                        sprite.left, sprite.top,
                        sprite.width, sprite.height
                    );
                };
            }
            else {
                context.drawImage(
                    this.image,
                    sprite.left, sprite.top,
                    sprite.width, sprite.height
                );
            }
        }
    }
};


var Sprite = function (name, painter, behaviors) {
    if (name !== undefined)  this.name = name;
    if (painter !== undefined)  this.painter = painter;
    if (behaviors !== undefined)  this.behaviors = behaviors;

    return this;
};

Sprite.prototype = {
    left: 0,
    top: 0,
    width: 10,
    height: 10,
    velocityX: 0,
    velocityY: 0,
    visible: true,
    animating: false,
    painter: undefined,
    behaviors: [],

    paint: function(context) {
        if (this.painter !== undefined && this.visible) {
            this.painter.paint(this, context);
        }
    },

    update: function(context, time) {
        for (var i = this.behaviors.length; i > 0; --i) {
            this.behaviors[i-1].execute(this, context, time);
        }
    }
};


var SpriteSheetPainter = function(cells, spriteSheet) {
    this.cells = cells;
    this.spritesheet = spriteSheet;
};

SpriteSheetPainter.prototype = {
    cells: [],
    cellIndex: 0,

    advance: function() {
        if (this.cellIndex == this.cells.length - 1) {
            this.cellIndex = 0;
        } else {
            this.cellIndex++;
        }
    },

    paint: function (sprite, context) {
        var cell = this.cells[this.cellIndex];
        context.drawImage(this.spritesheet,
            cell.left, cell.top, cell.width, cell.height,
            sprite.left, sprite.top, cell.width, cell.height);
    }
};

