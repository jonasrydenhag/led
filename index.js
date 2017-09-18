#!/usr/bin/env node

'use strict';

var debug = require('debug')('led');
var gpio = require('rpi-gpio');
var Promise = require('promise');

var delay = 15000;
var pin = 13;

var setupPromise = new Promise(function (resolve, reject) {
  gpio.setup(pin, gpio.DIR_OUT, function (err) {
    if (err !== undefined) {
      debug(err);
      reject(err);
    } else {
      debug('Setup done');
      resolve();
    }
  });
});

function on() {
  setupPromise.then(function () {
    debug('On');

    gpio.write(pin, 1);

    setTimeout(function() {
      off();
    }, delay);
  });
}

function off() {
  setupPromise.then(function () {
    debug('Off');

    gpio.write(pin, 0);
  });
}

process.on('SIGINT', function () {
  gpio.destroy(function() {
    debug("All pins unexported");

    process.exit();
  });
});

(function(){
  module.exports.on = on;
  module.exports.off = off;

  if (module.parent === null) {
    var state = process.argv[2];

    if (state === "on") {
      on();
    } else {
      off();
    }
  }
})();
