(function (root, factory) {

  if( root.angular ) {
    root.angular.module('eventsWrapper', []).provider('Events', function () {
      var Events = factory();

      this.escapeMethods = function () {
        ['on', 'once', 'off', 'trigger'].forEach(function (method) {
          Events.prototype['$$' + method] = Events.prototype[method];
          delete Events.prototype[method];
        });
      };

      this.$get = function () {
        return Events;
      };
    });
  } else if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.Events = factory();
  }

})(this, function () {
	'use strict';

  function extend (dest, src) {
    for( var key in src ) {
      dest[key] = src[key];
    }
    return dest;
  }

  function Event (name) {
    this.name = name;
  }

  Event.prototype.preventDefault = function () {
    this.defaultPrevented = true;
  };

  function addHandler (listeners, eventName, handler, useCapture) {
    if( !listeners[eventName] ) {
      listeners[eventName] = [];
    }

    if( useCapture ) {
      listeners[eventName].unshift(handler);
    } else {
      listeners[eventName].push(handler);
    }
  }

  function removeHandler (listeners, handler) {
    var found = listeners.indexOf(handler);
    if( found >= 0 ) listeners.splice(found, 1);
  }

  function removeOnce( listeners, handler ) {
    for( var key in listeners ) {
      removeHandler(listeners[key], handler);
    }
    delete handler.__run_once;
  }

  function Events () {
    this.listeners = {};
  }

  extend(Events.prototype, {
    on: function (eventName, handler, useCapture) {
      var listeners = this.listeners;
      ( eventName instanceof Array ? eventName : eventName.split(/ +/) ).forEach(function (eventName) {
        addHandler(listeners, eventName, handler, useCapture);
      });
    },
    once: function (eventName, handler, useCapture) {
      handler.__run_once = true;
      var listeners = this.listeners;
      ( eventName instanceof Array ? eventName : eventName.split(/ +/) ).forEach(function (eventName) {
        addHandler(listeners, eventName, handler, useCapture);
      });
    },
    trigger: function (eventName, params, thisArg) {
      var listeners = this.listeners;
      ( eventName instanceof Array ? eventName : eventName.split(/ +/) ).forEach(function (eventName) {
        if( !listeners[eventName] ) return;

        var event = new Event(eventName),
            args = [event].concat(params),
            _listeners = listeners[eventName];

        for( var i = 0, n = _listeners.length; i < n; i++ ) {
          _listeners[i].apply(thisArg, args);
          if( _listeners[i].__run_once ) {
            removeOnce(listeners, _listeners[i]);
            i--;
            n--;
          }
          if( event.defaultPrevented ) return;
        }
      });
    },
    off: function (eventName, handler) {
      var listeners = this.listeners;
      ( eventName instanceof Array ? eventName : eventName.split(/ +/) ).forEach(function (eventName) {
        if( !listeners[eventName] ) return;
        removeHandler(listeners[eventName], handler );
      });
    }
  });

  return Events;
});
