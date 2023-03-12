import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';

const sass = gulpSass(dartSass);

export const scss = () =>
  app.gulp
    .src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber({
        errorHandler(err) {
          notify.onError({
            title: 'SCSS Error',
            message: 'Error: <%= error.message %>',
          })(err);
          this.emit('end');
        },
      }),
    )
    .pipe(
      sass({
        outputStyle: 'expanded',
      }),
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        webpcss({
          webpClass: '.webp',
          noWebpClass: '.no-webp',
        }),
      ),
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserslist: ['last 3 versions'],
          cascade: true,
        }),
      ),
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: '.min.css',
      }),
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream());
