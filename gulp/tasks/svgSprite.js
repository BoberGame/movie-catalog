import svgSprite from 'gulp-svg-sprite';
import cheerio from 'gulp-cheerio';

export const svgSprites = () =>
  app.gulp
    .src(`${app.path.src.svgicons}`, {})
    .pipe(app.plugins.plumber())
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../icons/icons.svg',
            example: true,
            inline: true,
          },
        },
      }),
    )
    .pipe(
      cheerio({
        run($) {
          // $('[fill^="#"]').removeAttr('fill');
          // // $('[stroke^="#"]').removeAttr('stroke');
          $('[fill^="#"]').attr('fill', 'currentColor');
          $('[stroke^="#"]').attr('stroke', 'currentColor');
        },
        parserOptions: { xmlMode: true },
      }),
    )
    .pipe(app.gulp.dest(app.path.build.images));
