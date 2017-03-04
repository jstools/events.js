
(function (root, factory) {
  if( typeof exports === 'object' && typeof module !== 'undefined' ) {
    // CommonJS
    module.exports = factory(root);
  } else if( typeof define === 'function' && define.amd ) {
    // AMD. Register as an anonymous module.
    define([], function () { return factory(root); });
  } else {
    // Browser globals
    root.Azazel = factory(root);
  }
})(this, function (root) {

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

  function extendMethods (evt, target, prefix) {
    target[prefix + 'on'] = evt.on.bind(evt);
    target[prefix + 'once'] = evt.once.bind(evt);
    target[prefix + 'off'] = evt.off.bind(evt);
    target[prefix + 'emit'] = evt.emit.bind(evt);
  }

  function Azazel (target, prefix) {
    if( this === root ) {
      new Azazel(target);
      return target;
    }
    this.listeners = {};
    if( target ) {
      extendMethods(this, target, prefix || '');
    }
  }

  Azazel.prototype.on = function (eventName, handler, useCapture) {
    var listeners = this.listeners;
    ( eventName instanceof Array ? eventName : eventName.split(/ +/) ).forEach(function (eventName) {
      addHandler(listeners, eventName, handler, useCapture);
    });
  };

  Azazel.prototype.once = function (eventName, handler, useCapture) {
    handler.__run_once = true;
    var listeners = this.listeners;
    ( eventName instanceof Array ? eventName : eventName.split(/ +/) ).forEach(function (eventName) {
      addHandler(listeners, eventName, handler, useCapture);
    });
  };

  Azazel.prototype.emit = function (eventName, params, thisArg) {
    var listeners = this.listeners;
    ( eventName instanceof Array ? eventName : eventName.split(/ +/) ).forEach(function (eventName) {
      if( !listeners[eventName] ) return;

      var _listeners = listeners[eventName];

      for( var i = 0, n = _listeners.length; i < n; i++ ) {
        _listeners[i].apply(thisArg, params);
        if( _listeners[i].__run_once ) {
          removeOnce(listeners, _listeners[i]);
          i--;
          n--;
        }
      }
    });
  };

  Azazel.prototype.off = function (eventName, handler) {
    var listeners = this.listeners;
    ( eventName instanceof Array ? eventName : eventName.split(/ +/) ).forEach(function (eventName) {
      if( !listeners[eventName] ) return;
      removeHandler(listeners[eventName], handler );
    });
  };

  return Azazel;

});
