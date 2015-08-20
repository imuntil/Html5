/*******************************************************************************
 *
 * Copyright 2011 Zack Grossbart
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 ******************************************************************************/

/*
 * These are all the colors for our dandelion
 */
var seedBulbColor = '#d0aa7b';
var stemColor = '#567e37';
var wispColor = '#fff3c9';

/**
 * This script uses a lot of random numbers to make everything
 * look more natural.  This function is just an easy way to
 * generate random numbers between two numbers.
 *
 * @param from the minimum number
 * @param to the maximum number
 */
function random(/*int*/ from, /*int*/ to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

/**
 * This function acts like an object in paperscript.  It
 * represents each seed on the dandelion and handles drawing and
 * moving the seed.
 */
function Seed() {
    /**
     * This function creates the seed and draws it at the specified
     * point.
     *
     * @param p the point to draw the seed at
     * @param shortStem true if this seed should have a short stem
     *                  and false otherwise
     */
    this.create = function (/*Point*/ p, /*boolean*/ shortStem) {
        var height = 2;

        if (!shortStem) {
            /*
             * If this seed doesn't have a short stem then it has a
             * stem which is a random height between 10 and 50.
             */
            height = random(10, 50);
        }

        //p.y += height;

        /*
         * Our group gives us a single container to draw, rotate, and
         * move all the parts of our seed at the same time.
         */
        var group = new Group();

        /*
         * Now we're ready to draw our seed.  Each seed starts with a
         * small oval at the bottom of the see.
         */
        var size = new Size(4, 10);
        var rectangle = new Rectangle(p, size);
        var bottom = new Path.Oval(rectangle);
        bottom.fillColor = seedBulbColor;
        bottom.opacity = 0.5;
        group.addChild(bottom);

        if (shortStem) {
            p.y -= height;
            p.x -= 5;
        }

        /*
         * The stem of the seed is a gentle arc which pulls to one direction
         * or the other randomly.
         */
        var stem = new Path();
        stem.strokeColor = stemColor;
        stem.strokeWidth = 1;
        stem.add(new Point(p.x + 2, p.y));

        var throughPoint = new Point(p.x + 4, p.y - height / 2);
        var toPoint = new Point(p.x + 3, p.y - height);
        stem.arcTo(throughPoint, toPoint);
        group.addChild(stem);

        /*
         * At the top of the stem are the fluttery parts that stick out of the
         * top and catch the wind.  We draw a random number of flutters between
         * four and ten.
         * 
         * Each flutter is an arc with a circle on top;
         */
        p = toPoint;
        for (var i = 0; i < random(4, 10); i++) {
            path = new Path();
            path.strokeColor = wispColor;
            path.strokeWidth = 1;

            var p1 = new Point(p.x, p.y);
            path.add(new Point(p1.x + 2, p1.y + 2));

            /*
             * Each flutter extends a random amount up in the air
             */
            var y = random(1, 5);

            /*
             * We draw every other stem on the right or the left so they're
             * spaced out in the seed.
             */
            if (i % 2 == 0) {
                throughPoint = new Point(p1.x + random(1, 3), p1.y - y);
                toPoint = new Point(p1.x + random(5, 35), p1.y - 20 - y);
            } else {
                throughPoint = new Point(p1.x - random(1, 3), p1.y - y);
                toPoint = new Point(p1.x - random(5, 35), p1.y - 20 - y);
            }

            path.arcTo(throughPoint, toPoint);
            group.addChild(path);

            /*
             * Now we put the circle at the tip of the flutter.
             */
            circle = new Path.Circle(toPoint, 2);
            circle.fillColor = wispColor;
            group.addChild(circle);
        }

        /*
         * This group contains all of the pieces of our seed so we can work with
         * them as one unit.
         */
        this.group = group;
        this.position = new Point(this.group.position.x, this.group.position.y + 15);

        this.dest = new  Point(1800, random(-300, 1100));

    }

    /**
     * This function rotates the seed around its center by the
     * specified angle.
     *
     * @param angle the amount of rotation for this seed
     */
    this.rotate = function(/*int*/ angle) {
        this.group.rotate(angle, this.position);
    }

    /**
     * This function rotates the seed a certain amount around the
     * center point of our canvas.  This is what makes the seeds
     * move across the screen in an arcing pattern that looks like
     * they are floating.
     */
    this.rotateMove = function(/*int*/ angle) {
        if (this.group.position.x < 850 && this.group.position.y < 650) {
            var vector = this.dest - this.group.position;
            this.group.position += vector / 150;

            this.angle += angle;
            this.group.rotate(angle);
        } else {
            /*
             * Then it is off the screen
             */
            this.isOffScreen = true
        }
    }

    /**
     * This function tells us if the seed is off the screen since
     * there's no reason to keep animating the seed once it's off
     * the screen.
     */
    this.isOffscreen = function() {
        return this.isOffScreen;
    }
}

var seeds = [];
var seedCount = 0;
var started = false;

/**
 * This function initializes our script.
 */
function init() {

    /*
     We're saving our paperscope object so we can use it
     later for the in place code editing.
     */
    PaperScope.each(function(/*PaperScope*/ scope) {
        if (scope.project) {
            codeMgr.scope = scope;
        }
    });

    $('#edit').click(function(evt) {
        started = false;
    });

    /*
     * Now we draw the stem of our dandelion with a thick
     * green arcing line.
     */
    var path = new Path();
    path.strokeColor = stemColor;
    path.strokeWidth = 5;

    var firstPoint = new Point(0, 550);
    path.add(firstPoint);

    var throughPoint = new Point(75, 400);
    var toPoint = new Point(100, 250);
    path.arcTo(throughPoint, toPoint);

    /*
     * The bulb of the flower is a green circle.
     */
    var bulb = new Path.Circle(toPoint, 10);
    bulb.fillColor = stemColor;

    var angle = 360 / bulb.length;

    /*
     * The first set of seeds go around the circle of the bulb.
     * They rotate based on their location in the circle so they
     * always point out from the flower.
     */
    for (var i = 0; i < bulb.length; i++) {
        var seed = new Seed();
        seed.create(bulb.getPointAt(i));
        seed.rotate(i * angle);
        seeds.push(seed);
    }

    /*
     * Then we add another set of seeds to the middle of the flower
     * so it covers the green in the middle and makes the dandelion
     * look extra fluffy.
     */
    for (var i = 0; i < 18; i++) {
        var seed = new Seed();
        var point = new Point(toPoint.x + random(-3, 3),
            toPoint.y + random(-3, 3));
        seed.create(new Point(point), true);
        seed.rotate(random(0, 360));
        seeds.push(seed);
    }

    /*
     * We start the seeds blowing after three seconds.
     */
    setTimeout(start, 1000);
}

/**
 * This function starts the animation.  We use another timer so
 * we can let the seeds drift off one second apart instead of
 * all of them falling off at once.
 */
function start() {
    started = true;

    var id = setInterval(function() {
        seedCount++;
        if (seedCount === seeds.length) {
            clearInterval(id);
        }
    }, 1000);
}

/**
 * This function helps us with debugging.  We can stop and start
 * the animation whenever the user clicks the mouse.
 */
function onMouseUp(event) {
    started = !started;
}

/**
 * This function is called with each frame of the animation.
 */
function onFrame(event) {
    if (started && seedCount > 0) {
        var stillRunning = false;

        /*
         * We only animate the seeds below the current seed count
         */
        for (var i = 0; i < seedCount; i++) {
            if (!seeds[i].isOffscreen()) {
                stillRunning = true;
                seeds[i].rotateMove(random(2, 4));
            }
        }

        if (!stillRunning) {
            started = false;
        }
    }
}

init();
