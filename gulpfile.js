'use strict'
var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var cleanCSS = require('gulp-clean-css')
var useref = require('gulp-useref')
var gulpif = require('gulp-if')

// PATHS
const CSS_URL = 'development/static/css/**/*.css'
const DIST_URL = 'dist/static/'

// html
gulp.task('prod-build', function(){
	return gulp.src('development/*.html')
		.pipe(useref())
		.pipe(gulpif('*.css', cleanCSS({compatibility: 'ie8'})))
		.pipe(gulpif('*.js', uglify()))
		// TODO - if its an image --> compress
		.pipe(gulp.dest('dist/'))
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
