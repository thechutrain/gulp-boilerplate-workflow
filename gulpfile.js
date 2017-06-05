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
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')

/* ========= PATH url ==============
*/
const DEV_URL = '.development/'
const SCSS_ENTRY_URL = 'src/static/scss/styles.scss'

// ===== developing mode =======
gulp.task('del', function() {
	return del.sync(['build', '.tmp', '.development'])
})

/* ========= Development livereload process ==============
*/
gulp.task('dev-html', function() {
	return gulp
		.src('src/**/*.html')
		.pipe(
			inject.before(
				'</body>',
				'<script src="http://localhost:35729/livereload.js"></script>'
			)
		)
		.pipe(gulp.dest(DEV_URL))
		.pipe(livereload())
})

gulp.task('dev-sass', function() {
	// return gulp.src(['src/**/*.sass', 'src/**/*.scss'])
	return (gulp
			.src(SCSS_ENTRY_URL)
			// .pipe(plumber(function(err) {
			// 	console.log('======== dev-sass ERROR =======')
			// 	console.log(err)
			// 	this.emit('end')
			// }))
			.pipe(sourcemaps.init())
			.pipe(autoprefixer())
			.pipe(sass())
			.on('error', sass.logError)
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(DEV_URL + 'static/css'))
			.pipe(livereload()) )
})

gulp.task('dev-js', function() {
	return gulp
		.src('src/**/*.js')
		.pipe(
			plumber(function(err) {
				console.log('======== dev-js ERROR =======')
				console.log(err)
				this.emit('end')
			})
		)
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['es2015'] }))
		.pipe(sourcemaps.write())
		.pipe(plumber.stop())
		.pipe(gulp.dest(DEV_URL))
		.pipe(livereload())
})

gulp.task('dev', function() {
	runSequence(['dev-html', 'dev-sass', 'dev-js'])
	// also add anything else that isn't a js || css || html file to .development
	return gulp
		.src(
			[
				'!src/**/*.js',
				'!src/**/*.css',
				'!src/**/*.scss',
				'!src/**/*.sass',
				'!src/**/*.html',
				'src/**/*'
			],
			{ nodir: true }
		)
		.pipe(gulp.dest(DEV_URL))
})

gulp.task('watch', ['dev'], function() {
	require('./server.js')
	livereload.listen()
	gulp.watch('src/**/*.css', ['dev-css'])
	gulp.watch('src/**/*.js', ['dev-js'])
	gulp.watch('src/**/*.html', ['dev-html'])
	gulp.watch('src/**/*.scss', ['dev-sass'])
})

/* ========= production BUILD process ==============
*/
gulp.task('clean-build', function() {
	return del.sync(['build', '.tmp'])
})
gulp.task('pre-build', ['clean-build'], function() {
	return gulp
		.src('src/*.html')
		.pipe(useref())
		.pipe(gulpif('*.html', gulp.dest('build/')))
		.pipe(gulpif('*.js', gulp.dest('.tmp/')))
	// TODO - if its an image --> compress
})

gulp.task('build-scss', function() {
	return gulp
		.src('src/**/styles.scss')
		.pipe(autoprefixer())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('build/static/css'))
})

gulp.task('build-js', function() {
	return gulp
		.src('.tmp/**/*.js')
		.pipe(
			babel({
				presets: ['babel-preset-es2015'].map(require.resolve)
				// presets: ['../../node_modules/babel-preset-es2015'] // path is coming from .tmp/assets/
			})
		)
		.pipe(uglify())
		.pipe(gulp.dest('build/'))
})

gulp.task('build-img', function() {
	return gulp.src('src/static/img/*').pipe(gulp.dest('build/static/img'))
})

gulp.task('build', function() {
	runSequence('pre-build', ['build-scss', 'build-js', 'build-img'])
})
