/* eslint-disable no-undef */
import webpack from 'webpack-stream';

export const js = () =>
  app.gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber({
        errorHandler(err) {
          notify.onError({
            title: 'JS Error',
            message: 'Error: <%= error.message %>',
          })(err);
          this.emit('end');
        },
      }),
    )
    .pipe(
      webpack({
        mode: app.isBuild ? 'production' : 'development',
        devtool: app.isDev && 'inline-source-map',
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
          ],
        },
        resolve: {
          extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
          filename: 'app.min.js',
        },
      }),
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream());
