'use strict'
var gulp = require('gulp')
// var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var cleanCSS = require('gulp-clean-css')
var useref = require('gulp-useref')
var gulpif = require('gulp-if')
var babel = require('gulp-babel')
var runSequence = require('run-sequence')

// PATHS
// const CSS_URL = 'development/static/css/**/*.css'
// const DIST_URL = 'dist/'

// var gutil = require('gulp-util')

// gulp.uglify().on('error', function(err) {
// 	gutil.log(gutil.colors.red('[Error]'), err.toString())
// 	this.emit('end')
// })

gulp.task('pre-build', function(){
	return gulp.src('development/*.html')
		.pipe(useref())
		.pipe(gulpif('*.html', gulp.dest('dist/')))
		.pipe(gulpif('*.js', gulp.dest('.tmp/')))
		.pipe(gulpif('*.css', gulp.dest('.tmp/')))
		// .pipe(gulpif('*bundle.js', babel({ presets: ['es2015']}), uglify()))
		// .pipe(gulpif('*.html', gulp.dest('dist/')))
		// .pipe(gulpif('*.css', cleanCSS({compatibility: 'ie8'})))
		// .pipe(gulpif('*.js', babel({ presets: ['es2015']}), uglify()))
		// .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString())})
		// TODO - if its an image --> compress
})

gulp.task('build-css', function(){
	return gulp.src('.tmp/assets/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/assets/'))
})

gulp.task('build-js', function(){
	return gulp.src('.tmp/assets/*.js')
		.pipe(babel({
			// presets: ['es2015'].map(require.resolve)
			presets: ['../../node_modules/babel-preset-es2015'] // path is coming from .tmp/assets/
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/assets/'))
})

gulp.task('build', function(){
	console.log('Building now ...')
	runSequence('pre-build',
		['build-css', 'build-js'])
})

// Css tasks
// gulp.task('css', function(){
// 	// console.log('Loading css tasks ...')
// 	return gulp.src(['development/static/css/normalize_reset.css', CSS_URL])
//     .pipe(concat('styles.css'))
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(gulp.dest(DIST_URL))
// })


// gulp.task('default', function(){
// 	// console.log('hey yo Im working in the default task')
// })
