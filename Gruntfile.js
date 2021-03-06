module.exports = function(grunt) {

    "use strict";
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options : {
                livereload: true
            },
            source: {
                files: [
                    'src/*.js',
                    'src/*/*.js',
                    'Gruntfile.js'
                ],
                tasks: [ 'build:js' ]
            }
        },

        browserify: {
            dist: {
                src: [
                    'src/Leaflet.BlurredLocation.js'
                ],
                dest: 'dist/Leaflet.BlurredLocation.js'
            }
        },

        uglify: {
          my_target: {
            files: {
              'dist/Leaflet.BlurredLocation.js': ['src/location_tags.js', 'src/locationForm.js', 'main.js']
            }
          }
        },

        jasmine: {
          src: "src/client/js/*.js",
          options: {
            specs: "spec/javascripts/*spec.js",
            vendor: ['node_modules/jquery/dist/jquery.js','node_modules/leaflet/dist/leaflet-src.js','src/*.js','node_modules/jasmine-jquery/lib/jasmine-jquery.js'],
          }
        },

        jshint: {
        all: [
            "Gruntfile.js",
            "dsit/*.js",
            "spec/**/*.js",
        ],
        options: {
          jshintrc: '.jshintrc'
        },
}

    });

    /* Default (development): Watch files and build on change. */
    grunt.registerTask('build', [
        'browserify:dist'
    ]);
    grunt.registerTask('test', ['jshint', 'jasmine']);
};
