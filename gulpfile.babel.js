import del from 'del'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

import pkg from './package.json'

const plugin = gulpLoadPlugins();

gulp.task('clean', (done) => {
  del(`dist/**/*`)
  done();
})

gulp.task('compile', (done) => {
  const project = plugin.typescript.createProject('tsconfig.json');
  return gulp.src('src/ts/**/*.{ts,tsx}')
    .pipe(plugin.changed('.js', { extension: '.js' }))
    .pipe(plugin.plumber())
    .pipe(project())
    .pipe(gulp.dest('.js'));
})

gulp.task('manifest', (done) => {
  return gulp.src('src/manifest.json')
    .pipe(plugin.jsonEditor((manifest) => {
      manifest.name = pkg.name;
      manifest.version = pkg.version;
      manifest.description = pkg.description;
      return manifest
    }))
    .pipe(gulp.dest('build'));
})

gulp.task('bundle', (done) => {
  return gulp.src('.js')
    .pipe(plugin.plumber())
    .pipe(webpackStream({
      mode: 'production',
      entry: {
        background: './.js/background.js',
      },
      output: {
        path: `${__dirname}/build/js`,
        filename: '[name].js',
      },
    }, webpack))
    .pipe(gulp.dest('./build/js'));
})

gulp.task('build', gulp.series('clean', 'compile', gulp.parallel('manifest', 'bundle')), (done) => {
  done();
});

gulp.task('default', gulp.series('build'), (done) => {
  done();
})
