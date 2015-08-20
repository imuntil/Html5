/**
 * Created by jtun02 on 14-3-20.
 */

Stopwatch = function() {

};

Stopwatch.prototype = {
    startTime: 0,
    running: false,
    elapsed: undefined,

    start: function() {
        this.startTime = +new Date();
        this.elapsed = undefined;
        this.running = true;
    },

    stop: function() {
        this.elapsed = (+new Date()) - this.startTime;
        this.running = false;
    },

    getElapsedTime: function() {
        if (this.running) {
            return (+new Date()) - this.startTime;
        } else {
            return this.elapsed;
        }
    },

    isRunning: function() {
        return this.running;
    },

    reset: function() {
        this.elapsed = 0;
    }
}