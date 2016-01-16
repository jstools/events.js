'use strict';

require('nitro')(function (nitro) {

  nitro.task('build', function () {

    nitro.load('events.js').process('uglify').writeFile('events.min.js');

  });

  var pkgActions = {
    increaseVersion: function () {
      nitro.package('bower').setVersion( nitro.package('npm').increaseVersion().version() );
    }
  };

  nitro.task('pkg', function (target) {
    if( pkgActions[target] ) {
      return pkgActions[target]();
    }

    var pkg = require('./package');
    process.stdout.write(pkg[target]);
    process.exit(0);
  });

}).run();
