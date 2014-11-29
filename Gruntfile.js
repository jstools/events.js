'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    shell: {
      options: {
        stderr: false
      },
      'git-add-package': {
        command: 'git add package.json'
      },
      'git-add-bower': {
        command: 'git add bower.json'
      },
      'git-commit-version': {
        command: 'git commit -m "increasing version"'
      },
      'git-push': {
        command: 'git push origin master'
      },
      'npm-publish': {
        command: 'npm publish'
      }
    }
  });

  // Dev Build
  grunt.registerTask('files:increase-version', function () {
    var pkg = grunt.file.readJSON('package.json'),
        bower = grunt.file.readJSON('bower.json');

    var version = pkg.version.split('.');
    version[2]++;
    version = version.join('.');

    pkg.version = version;
    bower.version = version;

    grunt.file.write( 'package.json', JSON.stringify(pkg, null, 4) );
    grunt.file.write( 'bower.json', JSON.stringify(bower, null, 4) );
  });

  grunt.registerTask('git:increase-version', [ 'shell:git-add-package', 'shell:git-add-bower', 'shell:git-commit-version', 'shell:git-push' ]);

  grunt.registerTask('publish', [ 'files:increase-version', 'git:increase-version', 'shell:npm-publish' ]);

};