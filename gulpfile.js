const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browser = require('browser-sync').create();
const prefix = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const path = {
    html: { src: 'app/**/*.html',             dest: { app: 'app/',            dist: 'dist/' } },
    sass: { src: 'app/assets/sass/**/*.scss', dest: { app: 'app/assets/css/', dist: 'dist/assets/css/' } },
    css:  { src: 'app/assets/css/**/*.css',   dest: { app: 'app/assets/css/', dist: 'dist/assets/css/' } },
    js:   { src: 'app/assets/js/**/*.js',     dest: { app: 'app/assets/js/',  dist: 'dist/assets/js/' } },
}

function htmlTask() {
    return (
        gulp.src(path.html.src, { sourcemaps: true })
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest(path.html.dest.dist))
        .pipe(browser.stream())
    );
}

function sassExpandedTask() {
    return (
        gulp.src(path.sass.src, { sourcemaps: true })
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(prefix({ overrideBrowserslist: ['> 1%', 'last 2 versions'] }))
        .pipe(gulp.dest(path.sass.dest.app))
        .pipe(browser.stream())
    );
}

function sassCompressTask() {
    return (
        gulp.src(path.sass.src, { sourcemaps: true })
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(prefix({ overrideBrowserslist: ['> 1%', 'last 2 versions'] }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.sass.dest.app))
        .pipe(browser.stream())
    );
}

function cssTask() {
    return (
        gulp.src(path.css.src, { sourcemaps: true })
        .pipe(gulp.dest(path.css.dest.dist))
        .pipe(browser.stream())
    );
}

function jsAppTask() {
    return (
        gulp.src(path.js.src, { sourcemaps: true })
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.js.dest.app))
        .pipe(browser.stream())
    );
}

function jsDistTask() {
    return (
        gulp.src(path.js.src, { sourcemaps: true })
        .pipe(gulp.dest(path.js.dest.dist))
        .pipe(browser.stream())
    );
}

function watchTask() {
    browser.init({ server: { baseDir: 'app/' } });

    gulp.watch(path.html.src, htmlTask);
    gulp.watch(path.sass.src, sassExpandedTask);
    gulp.watch(path.sass.src, sassCompressTask);
    gulp.watch(path.css.src, cssTask);
    gulp.watch(path.js.src, jsAppTask);
    gulp.watch(path.js.src, jsDistTask);

    gulp.watch(path.html.src).on('change', browser.reload);
    gulp.watch(path.sass.src).on('change', browser.reload);
    gulp.watch(path.css.src).on('change', browser.reload);
    gulp.watch(path.js.src).on('change', browser.reload);
}

exports.default = gulp.series (
    htmlTask,
    sassExpandedTask,
    sassCompressTask,
    cssTask,
    jsAppTask,
    jsDistTask,
    watchTask
);
