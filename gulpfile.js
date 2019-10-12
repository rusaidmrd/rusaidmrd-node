
var gulp = require('gulp'),
  babel = require('gulp-babel'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  changed = require('gulp-changed'),
  uglify = require('gulp-uglify');


// compile scss into css
function cssStyle() {

  // 1. find the scss source file
  return gulp.src('./source/scss/**/*.scss')


    // 2. pass that file through sass compailer
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))

    // 3. send it to the desnination css file
    .pipe(gulp.dest('./build/assets/css'))

    // 4. stream changes to all browser
    .pipe(browserSync.stream());
}


function scripts() {
  return gulp.src(['./source/js/vendors/*.js', './source/js/modules/*.js', './source/js/*.js'])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/assets/js'))
    .pipe(browserSync.stream());
}


function configureTailwindCss() {
  const postcss = require('gulp-postcss')

  return gulp.src('./source/styles-tailwind.css')
    // ...
    .pipe(postcss([
      // ...
      require('tailwindcss'),
      require('autoprefixer'),
      // ...
    ]))
    // ...
    .pipe(gulp.dest('build/assets/css'))

}

function watch() {
  // browserSync.init({
  //   server: {
  //     baseDir: './build'
  //   }
  // });
  gulp.watch('./source/scss/**/*.scss', cssStyle);
  gulp.watch('./source/styles-tailwind.css', configureTailwindCss);
  //gulp.watch('./views/*.html').on('change', browserSync.reload);
  gulp.watch('./source/js/**/*.js', scripts);
  gulp.watch('./source/js/**/*.js').on('change', browserSync.reload);
}

exports.cssStyle = cssStyle;
exports.scripts = scripts;
exports.watch = watch;




