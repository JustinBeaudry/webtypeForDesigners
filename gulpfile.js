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

	var sassOptions = {
		includePaths: require('node-neat').with('node-bourbon'),
	};

	if (process.env.NODE_ENV === 'prod') {
		Object.assign(sassOptions, {
			outputStyle: 'compressed',
			sourceComments: false
		});
	}

	gulp.src(scss)
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(gulp.dest(path.join(__dirname, 'public/cdn/css')))
		.pipe(browserSync.stream());
});

process.on('uncaughtException', function(err) {
	if (err) {
		console.trace(err);
		process.exit(1);
	}
});
