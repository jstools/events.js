
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
})(this, function () {

  function removeFromList ( list, iteratee ) {
    if( !list ) return;
    for( var i = list.length - 1 ; i >= 0 ; i-- ) {
      if( iteratee.call(null, list[i], i) ) list.splice(i, 1);
    }
  }

  function runAsArray( fn, args, this_arg, return_value ) {
    var event_names = [].shift.call(args);
    args = [].slice.call(args); // args should be Array type
    if( typeof event_names === 'string' ) event_names = event_names.split(/\s+/);

    event_names.forEach(function (_event_name) {
      fn.apply(this_arg, [_event_name].concat(args) );
    });
    return return_value;
  }

  function Azazel (host, prefix) {

    host = host || this;
    prefix = prefix || '';

    var listeners = {};

    function on (event_name, listener, use_capture) {
      if( !(listener instanceof Function ) ) throw new Error('listener should be a Function');

      if( event_name instanceof Array ) return runAsArray(on, arguments, this, host );
      if( typeof event_name !== 'string' ) throw new Error('event_name should be a string');
      if( / /.test(event_name) ) return runAsArray(on, arguments, this, host );

      listeners[event_name] = listeners[event_name] || [];
      if( use_capture ) listeners[event_name].unshift(listener);
      else listeners[event_name].push(listener);

      return host;
    }

    function once (event_name, listener, use_capture) {
      var once_fn = function () {
        off(event_name, once_fn);
        listener.apply(this, arguments);
      };
      once_fn.__once__ = listener;

      return on(event_name, once_fn, use_capture);
    }

    function emit (event_name, args, this_arg) {
      if( event_name instanceof Array ) return runAsArray(emit, arguments, this, host );
      if( typeof event_name !== 'string' ) throw new Error('event_name should be a string');
      if( / /.test(event_name) ) return runAsArray(emit, arguments, this, host );

      if( !listeners[event_name] ) return host;

      listeners[event_name].forEach(function (listener) {
        listener.apply(this_arg, args || []);
      });
      return host;
    }

    function off (event_name, listener) {
      if( event_name instanceof Array ) return runAsArray(off, arguments, this, host );
      if( typeof event_name !== 'string' ) throw new Error('event_name should be a string');
      if( / /.test(event_name) ) return runAsArray(off, arguments, this, host );

      removeFromList(listeners[event_name], function (_listener) {
        return _listener === listener || _listener.__once__ === listener;
      });
      return host;
    }

    host[prefix + 'on'] = on;
    host[prefix + 'once'] = once;
    host[prefix + 'emit'] = emit;
    host[prefix + 'off'] = off;
  }

  return Azazel;

});
