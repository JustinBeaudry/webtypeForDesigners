'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const path = require('path');

const scss = path.join(__dirname, 'src/*.scss');

gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: path.join(__dirname, 'public')
	});

	gulp.watch(scss, ['sass']).on('change', browserSync.reload);
});

gulp.task('sass', function() {
	gulp.src(scss)
		.pipe(sass({
			includePaths: require('node-neat').with('node-bourbon')
		}))
		.pipe(gulp.dest(path.join(__dirname, 'public/cdn/css')))
		.pipe(browserSync.stream());
});
