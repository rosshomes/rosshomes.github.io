var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var cp = require('child_process');
var gulp = require('gulp');
var prefix = require('gulp-autoprefixer');
var path = require('path');
var rimraf = require('rimraf');
var sequence = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var BOWER_PATH = 'bower_components';
var JS_PATH = 'assets/js';

var orderedScriptSrc = [
    path.join(BOWER_PATH, 'jquery/dist/jquery.min.js'),
    path.join(BOWER_PATH, 'bootstrap/dist/js/bootstrap.min.js'),
    path.join(BOWER_PATH, 'jquery-easing-original/jquery.easing.js'),
    path.join(BOWER_PATH, 'cbp-animated-header-fork/js/classie.js'),
    path.join(BOWER_PATH, 'cbp-animated-header-fork/js/cbpAnimatedHeader.js'),
    path.join(BOWER_PATH, 'jqBootstrapValidation/dist/jqBootstrapValidation-1.3.7.js'),
    path.join(JS_PATH, 'contact_me.js'),
    path.join(JS_PATH, 'agency.js')
];

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('scripts-build', function() {
    return gulp.src(orderedScriptSrc)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.min.js'))
        .pipe(uglify({
            mangle: true
        }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(JS_PATH));
});

gulp.task('jekyll-build', function(done) {
    browserSync.notify(messages.jekyllBuild);

    return cp.spawn('jekyll', ['build'], {
            stdio: 'inherit'
        })
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], browserSync.reload);

gulp.task('dev-scripts', function() {
    sequence(
        'scripts-build', 'jekyll-rebuild');
});

gulp.task('watch', ['scripts-build'], function() {
    browserSync.init({
        server: {
            baseDir: '_site'
        }
    });

    gulp.watch([
        'assets/js/*.js',
        '!assets/js/bundle*.js'
    ], ['dev-scripts']);

    gulp.watch([
        '*.html',
        '_includes/*.html',
        '_layouts/*.html',
        '_posts/*'
    ], ['jekyll-rebuild']);
});

gulp.task('default', ['watch']);