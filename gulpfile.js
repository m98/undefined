'use strict';

let gulp = require('gulp');
let browserify = require("browserify");
let source = require('vinyl-source-stream');
let tsify = require("tsify"); //Browserify plugin for compiling Typescript
let buffer = require('vinyl-buffer');
let sourcemaps = require('gulp-sourcemaps');
let minify = require('gulp-minify');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');


gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('extension/chrome'))
        .pipe(gulp.dest('extension/firefox'));
});

gulp.task("build", ['compileTypeScript', 'sass'], function () {
    return gulp.src(['src/libraries/*.js', 'dist/index.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('extension/chrome'))
        .pipe(gulp.dest('extension/firefox'));
});

gulp.task('compileTypeScript', function () {
    browserify({
        basedir: '.',
        standalone: 'githubEx',
        debug: true,
        entries: ['src/index.ts'],
        cache: {},
        packageCache: {}
    }).plugin("tsify", {noImplicitAny: true})
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        }).bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(minify({
            ext: {
                min: '.js'
            },
            preserveComments: 'all'
        }))
        .pipe(gulp.dest('dist'))
});
