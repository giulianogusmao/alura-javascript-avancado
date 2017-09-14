// npm install --save-dev gulp gulp-clean gulp-sass browser-sync

const gulp = require('gulp')
    , clean = require('gulp-clean')
    , sass = require('gulp-sass')
    , usemin = require('gulp-usemin')
    , browserSync = require('browser-sync').create()
    , reload = browserSync.reload;

let path = {
    origin: './src/',
    deploy: './dist/'
};

gulp.task('clean', () => {
    return gulp
        .src(path.deploy)
        .pipe(clean());
});


gulp.task('html', () => {
    gulp
        .src(`${path.origin}**/*.html`)
        .pipe(usemin())
        .pipe(gulp.dest(path.deploy));
});

gulp.task('img', () => {
    gulp
        .src(`${path.origin}img/**/*`)
        .pipe(gulp.dest(`${path.deploy}img`));
});

gulp.task('sass', () => {
    return gulp
        .src(`${path.origin}/sass/**/*.+(scss|sass)`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`${path.origin}/css`));
});

// gulp.task('js', () => {
//     gulp
//         .src(`${path.origin}**/*.js`)
//         .pipe(gulp.dest(`${path.deploy}`));
// });

// gulp.task('css', ['sass'], () => {
//     gulp
//         .src(`${path.origin}/css/**/*.css`)
//         .pipe(gulp.dest(`${path.deploy}/css`));
// });



gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: path.origin,
        }
    });

    gulp.watch(`${path.origin}/**/*.+(html|js)`).on('change', reload);
    gulp.watch(`${path.origin}/img/**/*`).on('change', reload);
    gulp.watch(`${path.origin}/**/*.+(scss|sass)`).on('change', () => {
      gulp.start('sass');
      reload();
    });
});

gulp.task('default', ['clean'], () => gulp.start(
      'html'
    , 'img'
    , 'sass'
    // , 'js'
    // , 'css'
));
