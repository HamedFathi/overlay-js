var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var filter = require('gulp-filter');
var git = require('gulp-git');
var tagVersion = require('gulp-tag-version');
var bump = require('gulp-bump');

function compile(watch) {
  var bundler = watchify(browserify('./demo/demo.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./demo'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

/**
 * @task
 *
 * Release
 */
function release(importance) {
  // get all the files to bump version in
  return gulp.src(['./package.json', './bower.json'])
    // bump the version number in those files
    .pipe(bump({type: importance}))
    // save it back to filesystem
    .pipe(gulp.dest('./'))
    // commit the changed version number
    .pipe(git.commit('bumps package version'))
    // read only one file to get the version number
    .pipe(filter('package.json'))
    // tag it in the repository
    .pipe(tagVersion());
    //.pipe(git.push({ args: ' --tags' }), function(err){ err } );
}

gulp.task('patch', function() { return release('patch'); });
gulp.task('minor', function() { return release('minor'); });
gulp.task('major', function() { return release('major'); });

gulp.task('default', ['watch']);
