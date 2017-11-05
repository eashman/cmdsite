"use strict";

var gulp  = require('gulp'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    concat = require('gulp-concat'),
    del = require('del');

gulp.task('clean-up', function() {
  return del([
          'dist/css/**/*',
  ]);
});

// BUILD CHARMING CSS

gulp.task('build-css', ['clean-up'], function() {
  return gulp.src(['scss/*.scss', 'scss/mixins/*.scss'])
             .pipe(sass().on('error', sass.logError))
             .pipe(postcss([ autoprefixer({ browsers: [
                 //
                 // Official browser support policy:
                 // https://v4-alpha.getbootstrap.com/getting-started/browsers-devices/#supported-browsers
                 //
                 'Chrome >= 35', // Exact version number here is kinda arbitrary
                 // Rather than using Autoprefixer's native "Firefox ESR" version specifier string,
                 // we deliberately hardcode the number. This is to avoid unwittingly severely breaking the previous ESR in the event that:
                 // (a) we happen to ship a new Bootstrap release soon after the release of a new ESR,
                 //     such that folks haven't yet had a reasonable amount of time to upgrade; and
                 // (b) the new ESR has unprefixed CSS properties/values whose absence would severely break webpages
                 //     (e.g. `box-sizing`, as opposed to `background: linear-gradient(...)`).
                 //     Since they've been unprefixed, Autoprefixer will stop prefixing them,
                 //     thus causing them to not work in the previous ESR (where the prefixes were required).
                 'Firefox >= 38', // Current Firefox Extended Support Release (ESR); https://www.mozilla.org/en-US/firefox/organizations/faq/
                 // Note: Edge versions in Autoprefixer & Can I Use refer to the EdgeHTML rendering engine version,
                 // NOT the Edge app version shown in Edge's "About" screen.
                 // For example, at the time of writing, Edge 20 on an up-to-date system uses EdgeHTML 12.
                 // See also https://github.com/Fyrd/caniuse/issues/1928
                 'Edge >= 12',
                 'Explorer >= 10',
                 // Out of leniency, we prefix these 1 version further back than the official policy.
                 'iOS >= 8',
                 'Safari >= 8',
                 // The following remain NOT officially supported, but we're lenient and include their prefixes to avoid severely breaking in them.
                 'Android 2.3',
                 'Android >= 4',
                 'Opera >= 12'
             ] }) ]))
             .pipe(gulp.dest('dist/css/'))
             .pipe(cleanCss())
             .pipe(rename({suffix: '.min'}))
             .pipe(gulp.dest('dist/css/'));
});

gulp.task('copy-dist', ['build-css' ], function() {
    return gulp .src('dist/**/*')
                .pipe(gulp.dest('examples/startup/charming/dist'))
                .pipe(gulp.dest('examples/startup/dashboard/dist'));
});

// Main task launches build-bootstrap and build-css when executing gulp
gulp.task('default', ['copy-dist'], function () {
});

// Watch task to rebuild CSS on edit
gulp.task('watch', ['default'], function() {
    gulp.watch(['scss/*.scss', 'scss/mixins/*.scss'], ['default']);
});
