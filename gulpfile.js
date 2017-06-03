'use strict'
const gulp = require('gulp')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')
const useref = require('gulp-useref')
const gulpif = require('gulp-if')
const babel = require('gulp-babel')
const runSequence = require('run-sequence')
const sourcemaps = require('gulp-sourcemaps')
const livereload = require('gulp-livereload')
const del = require('del')
const inject = require('gulp-inject-string')

/* ========= PATH url ==============
*/
const DEV_URL = '.development/'

gulp.task('del', function(){
	return del.sync(['build', '.tmp', '.development'])
})



/* ========= Development livereload process ==============
*/
gulp.task('dev-html', function() {
	return gulp.src('src/**/*.html')
		.pipe(inject.before('</body>', '<script src="http://localhost:35729/livereload.js"></script>'))
		.pipe(gulp.dest(DEV_URL))
		.pipe(livereload())
})

gulp.task('dev-css', function(){
	return gulp.src('src/**/*.css')
		// QUESTION = can't get errors from css file
		// .pipe(plumber(function(err) {
		// 	console.log('Error in development - CSS files:' + err)
		// 	this.emit('end')
		// }))
		.pipe(sourcemaps.init())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DEV_URL))
		.pipe(livereload())
})

gulp.task('dev-js', function(){
	return gulp.src('src/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DEV_URL))
		.pipe(livereload())
})

gulp.task('dev', function(){
	runSequence(['dev-html', 'dev-css', 'dev-js'])
	// also add anything else that isn't a js || css || html file to .development
	return gulp.src(['!src/**/*.js', '!src/**/*.css', '!src/**/*.html', 'src/**/*'])
		.pipe(gulp.dest(DEV_URL))
})

gulp.task('watch', ['dev'], function(){
	require('./server.js')
	livereload.listen()
	gulp.watch('src/**/*.css', ['dev-css'])
	gulp.watch('src/**/*.js', ['dev-js'])
	gulp.watch('src/**/*.html', ['dev-html'])
})


/* ========= production BUILD process ==============
*/
gulp.task('clean-build', function(){
	return del.sync(['build', '.tmp'])
})
gulp.task('pre-build', ['clean-build'], function(){
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
		.pipe(babel({
			// presets: ['es2015'].map(require.resolve)
			presets: ['../../node_modules/babel-preset-es2015'] // path is coming from .tmp/assets/
		}))
		.pipe(uglify())
		.pipe(gulp.dest('build/assets/'))
})

gulp.task('build', function(){
	runSequence('pre-build',
		['build-css', 'build-js'])
})
