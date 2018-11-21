'use strict';

/* global global, window, self */

var _asyncNextTick = (function (_global, _raf_prefixes) {

  if( 'nextTick' in _global ) return _global.nextTick

  for( var _prefix in _raf_prefixes ) {
    if( _global[_prefix + 'equestAnimationFrame'] instanceof Function )
      return _global[_prefix + 'equestAnimationFrame']
  }

  return setTimeout

})(
  typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {},
  'r, webkitR, mozR, oR, msR'.split(/ *, */)
);

var _syncNextTick = function (fn) { fn.apply(this, arguments); };

function _removeFromList ( list, item ) {
  for( var i = list.length - 1 ; i >= 0 ; i-- ) {
    if( item === list[i] ) list.splice(i, 1);
  }
}

function _normalizeEventName (fn, host, test_listener) {
  return function _fn (event_name, listener, use_capture) {
    if( test_listener !== false && !(listener instanceof Function ) ) throw new Error('listener should be a Function')

    if( event_name instanceof Array ) {
      event_name.forEach(function (_event_name) {
        _fn(_event_name, listener, use_capture);
      });
      return host
    }
    // runAsArray(fn, arguments, this, host );
    if( typeof event_name !== 'string' ) throw new Error('event_name should be a string')
    if( / /.test(event_name) ) return _fn(event_name.split(/ +/), listener, use_capture)

    fn.apply(this, arguments);

    return host
  }
}

function Azazel (host, options) {
  options = options || {};
  if( typeof options === 'string' ) options = {
    prefix: options
  };
  options.prefix = options.prefix || '';

  host = host || (this instanceof Azazel ? this : {});

  var listeners = {},
      listeners_once = {},
      events_emitted = {},
      _nextTick = options.async !== false ? _asyncNextTick : _syncNextTick;

  function _on (event_name, listener, use_capture) {
    listeners[event_name] = listeners[event_name] || [];
    if( use_capture ) listeners[event_name].unshift(listener);
    else listeners[event_name].push(listener);
  }

  var on = _normalizeEventName(_on, host);

  function _once (event_name, listener, use_capture) {
    listeners_once[event_name] = listeners_once[event_name] || [];
    if( use_capture ) listeners_once[event_name].unshift(listener);
    else listeners_once[event_name].push(listener);
  }

  var once = _normalizeEventName(_once, host);

  function watch (event_name, listener, use_capture) {
    if( !(listener instanceof Function ) ) throw new Error('listener should be a Function')
    var last_emitted = events_emitted[event_name];
    if( last_emitted ) listener.apply(last_emitted.this_arg, last_emitted.args);
    if( !last_emitted || use_capture !== 'once' ) _on(event_name, listener, use_capture);
    return host
  }

  function _emit (event_name, args, this_arg) {
    _nextTick(function () {
      events_emitted[event_name] = { args: args, this_arg: this_arg };

      if( listeners[event_name] ) listeners[event_name].forEach(function (listener) {
        listener.apply(this_arg, args || []);
      });

      if( listeners_once[event_name] ) {
        _emitOnce(listeners_once[event_name], args, this_arg);
        delete listeners_once[event_name];
      }
    });
  }

  function _emitOnce (listeners_list, args, this_arg) {
    listeners_list.forEach(function (listener) {
      listener.apply(this_arg, args || []);
    });

    for( var event_name in listeners_once ) {
      if( listeners_once[event_name] !== listeners_list ) listeners_list.forEach(function (_listener) {
        if( listeners_once[event_name] ) _removeFromList(listeners_once[event_name], _listener );
      });
    }
  }

  var emit = _normalizeEventName(_emit, host, false);

  function off (event_name, listener) {
    if( listeners[event_name] ) _removeFromList(listeners[event_name], listener );
    if( listeners_once[event_name] ) _removeFromList(listeners_once[event_name], listener );
  }

  host[options.prefix + 'on'] = on;
  host[options.prefix + 'once'] = once;
  host[options.prefix + 'watch'] = watch; // like watch but triggering

  host[options.prefix + 'emit'] = emit;
  host[options.prefix + 'off'] = _normalizeEventName(off);

  return host
}

Azazel.nextTick = _asyncNextTick;

module.exports = Azazel;
