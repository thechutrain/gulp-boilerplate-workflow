'use strict'
var gulp = require('gulp')
var concat = require('gulp-concat')
// var uglify = require('gulp-uglify')
var cleanCSS = require('gulp-clean-css')
const inject = require('gulp-inject')

// PATHS
const CSS_URL = 'development/static/css/**/*.css'
const DIST_URL = 'dist/static/'

// HTML task
gulp.task('html', function () {
	const distSources = gulp.src(['dist/static/styles.css', 'dist/static/bundle.js'], {read: false})
	return gulp.src('./dist/*.html')
		.pipe(inject(distSources, { ignorePath: '/dist', addRootSlash: false } ))
		.pipe(gulp.dest('./dist'))
})

// Css tasks
gulp.task('css', function(){
	// console.log('Loading css tasks ...')
	return gulp.src(['development/static/css/normalize_reset.css', CSS_URL])
    .pipe(concat('styles.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(DIST_URL))
})


// gulp.task('default', function(){
// 	// console.log('hey yo Im working in the default task')
// })
