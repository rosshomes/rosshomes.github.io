var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var path = require('path');
var rimraf = require('rimraf');


var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function(done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {
            stdio: 'inherit'
        })
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], browserSync.reload);

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
// gulp.task('sass', function () {
//     return gulp.src('_scss/main.scss')
//         .pipe(sass({
//             includePaths: ['scss'],
//             onError: browserSync.notify
//         }))
//         .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
//         .pipe(gulp.dest('_site/css'))
//         .pipe(browserSync.reload({stream:true}))
//         .pipe(gulp.dest('css'));
// });


gulp.task('copy-libs', function() {
    rimraf('assets/libs', function() {
        gulp.src([
                'bower_components/jquery/dist/jquery.min.js',
            ])
            .pipe(gulp.dest('assets/libs/'));

        gulp.src([
                'bower_components/bootstrap/dist/**/*',
            ])
            .pipe(gulp.dest('assets/libs/bootstrap'));

        gulp.src([
                'bower_components/jquery-easing-original/jquery.easing.min.js',
            ])
            .pipe(gulp.dest('assets/libs/'));

        gulp.src([
                'bower_components/cbp-animated-header-fork/js/**/*',
            ])
            .pipe(gulp.dest('assets/libs/cbp-animated-header'));

        gulp.src([
                'bower_components/jqBootstrapValidation/dist/jqBootstrapValidation-1.3.7.min.js',
            ])
            .pipe(gulp.dest('assets/libs/'));

        return gulp.src([
                'bower_components/font-awesome/**/*'
            ])
            .pipe(gulp.dest('assets/libs/font-awesome'));
    });

});

gulp.task('watch', ['copy-libs'], function() {
    browserSync.init({
        server: {
            baseDir: '_site'
        }
    });
    
    // gulp.watch('_scss/*.scss', ['sass']);
    gulp.watch(['*.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['watch']);