// npm install --save-dev gulp gulp-clean gulp-sass browser-sync

const gulp = require('gulp')
  , clean = require('gulp-clean')
  , sass = require('gulp-sass')
  , usemin = require('gulp-usemin')
  , nodemon = require('gulp-nodemon')
  , browserSync = require('browser-sync')
  , reload = browserSync.reload;

let path = {
  origin: './src/',
  deploy: './dist/',
  server: '../server/',
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


gulp.task('nodemon', (cb) => {
  var started = false;
  return nodemon({ script: `${path.server}/server.js` }).on('start', () => {
    if (!started) {
      started = true;
      cb();
    }
  });
});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init({
    proxy: "http://localhost:3000",
    files: [`${path.origin}/**/*.*`],
    port: 7000,
  });
});

gulp.task('server', ['browser-sync'], () => {
  gulp.watch(`${path.origin}/**/*.+(html|js)`).on('change', reload);
  gulp.watch(`${path.origin}/img/**/*`).on('change', reload);
  gulp.watch(`${path.origin}/**/*.+(scss|sass)`).on('change', () => {
    gulp.start('sass');
    reload();
  });
});


gulp.task('build', ['clean'], () => gulp.start(
  'html'
  , 'img'
  , 'sass'
  // , 'js'
  // , 'css'
));

gulp.task('default', () => gulp.start('build'));
