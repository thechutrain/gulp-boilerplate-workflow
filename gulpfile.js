'use strict'
var gulp = require('gulp')
// var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var cleanCSS = require('gulp-clean-css')
var useref = require('gulp-useref')
var gulpif = require('gulp-if')
var babel = require('gulp-babel')
var runSequence = require('run-sequence')
var plumber = require('gulp-plumber')
var sourcemaps = require('gulp-sourcemaps')
var livereload = require('gulp-livereload')

// ========= URL paths ==============
// const DEV_URL = 'development/'

/* ========= DEVELOPMENT process ==============
*/
// gulp.task('dev-js', function(){
// 	return gulp.src('src/**/*.js')
// 		.pipe(plumber(function(err) {
// 			console.log('Error in src - JS files:' + err)
// 			this.emit('end')
// 		}))
// 		.pipe(sourcemaps.init())
// 		.pipe(babel({
// 			presets: ['es2015']
// 			// presets: ['es2015'].map(require.resolve)
// 			// presets: ['../../node_modules/babel-preset-es2015'] // path is coming from .tmp/assets/
// 		}))
// 		.pipe(uglify())
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest('development/dist'))
// })

gulp.task('dev-html', function() {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('development/'))
		.pipe(livereload())
})

gulp.task('dev-css', function(){
	return gulp.src('src/**/*.css')
		// .pipe(plumber(function(err) {
		// 	console.log('Error in development - CSS files:' + err)
		// 	this.emit('end')
		// }))
		.pipe(sourcemaps.init())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('development/'))
		.pipe(livereload())
})

gulp.task('dev-js', function(){
	return gulp.src('src/**/*.js')
		.pipe(plumber(function(err) {
			console.log('Error in development - JS files:' + err)
			this.emit('end')
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('development/'))
		.pipe(livereload())
})

gulp.task('dev', function(){
	console.log('Running dev')
	runSequence(['dev-html', 'dev-css', 'dev-js'])
})
//
gulp.task('watch', ['dev'], function(){
	console.log('WATCHING now ...')
	require('./server.js')
	livereload.listen()
	gulp.watch('src/**/*.css', ['dev-css'])
	gulp.watch('src/**/*.js', ['dev-js'])
	gulp.watch('src/**/*.html', ['dev-html'])
})

// gulp.task('watch', function(){
// 	runSequence(['dev-html', 'dev-css', 'dev-js'])
// 	console.log('WATCHING now')
// })

/* ========= BUILD process ==============
*/
gulp.task('pre-build', function(){
	return gulp.src('src/*.html')
		.pipe(useref())
		.pipe(gulpif('*.html', gulp.dest('build/')))
		.pipe(gulpif('*.js', gulp.dest('.tmp/')))
		.pipe(gulpif('*.css', gulp.dest('.tmp/')))
		// TODO - if its an image --> compress
})

gulp.task('build-css', function(){
	return gulp.src('.tmp/assets/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('build/assets/'))
})

gulp.task('build-js', function(){
	return gulp.src('.tmp/assets/*.js')
		// .pipe(plumber(function(err) {
		// 	console.log('Error in development - JS files:' + err)
		// 	this.emit('end')
		// }))
		// .pipe(sourcemaps.init())
		.pipe(babel({
			// presets: ['es2015'].map(require.resolve)
			presets: ['../../node_modules/babel-preset-es2015'] // path is coming from .tmp/assets/
		}))
		.pipe(uglify())
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('build/assets/'))
})

gulp.task('build', function(){
	console.log('Building now ...')
	runSequence('pre-build',
		['build-css', 'build-js'])
})
