const gulp = require('gulp');
// const less = require('gulp-less');
var sass = require('gulp-sass');
const cssmin = require('gulp-clean-css');
const base64 = require('gulp-base64');
const rename = require('gulp-rename');
const config = require('../config');
const chalk=require("chalk")
console.log('env: ', process.env.NODE_ENV);

gulp.task('compile-scss', () => {
    return gulp.src(['../src/**/*.scss', '!../src/**/_*.scss'])
        .pipe(sass())
        .pipe(base64({
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
        }))
        .pipe(cssmin())
        .pipe(rename((path) => {
            path.extname = '.wxss';
        }))
        .pipe(gulp.dest(config.distPath));
});

gulp.task('compile-js', () => {
    return gulp.src(['../src/**/*.js', '../src/**/*.wxs'])
        .pipe(gulp.dest(config.distPath));
});

gulp.task('compile-json', () => {
    return gulp.src(['../src/**/*.json'])
        .pipe(gulp.dest(config.distPath));
});

gulp.task('compile-wxml', () => {
    return gulp.src(['../src/**/*.wxml'])
        .pipe(gulp.dest(config.distPath));
});

gulp.task('compile-wxs', () => {
    return gulp.src(['../src/**/*.wxs'])
        .pipe(gulp.dest(config.distPath));
});

if(!config.isProduction) {
    gulp.task('serve', () => {
        console.log(chalk.bgRed('watch is running!'));

        config.ext.forEach(item => {
            var watcher=gulp.watch(`../src/**/*.${item}`, [`compile-${item}`]);
            watcher.on('change',function(event){
                console.log(chalk.bgGreen(`[${event.path}] ==> ${event.type}  `))
            })
        });
    });
}

gulp.task('build', ['compile-scss', 'compile-js', 'compile-wxs','compile-json', 'compile-wxml']);

gulp.run('build');


