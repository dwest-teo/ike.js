// IMPORTS

import packageJSON from './package.json'

import babelify from 'babelify'
import sync from 'browser-sync'
import browserify from 'browserify'
import gulp from 'gulp'
import header from 'gulp-header'
import uglify from 'gulp-uglify'
import assign from 'lodash.assign'
import notifier from 'node-notifier'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'
import watchify from 'watchify'

// ERROR HANDLER
const onError = function(error) {
  notifier.notify({
    'title': 'Error',
    'message': 'Compilation failure.'
  })

  console.log(error)
}

// ATTRIBUTION
const attribution = [
  '/*!',
  ' * Ike.js <%= pkg.version %> - <%= pkg.description %>',
  ' * Copyright (c) ' + new Date().getFullYear() + ' <%= pkg.author %> - <%= pkg.homepage %>',
  ' * License: <%= pkg.license %>',
  ' */',
  ''
].join('\n')

// JS
const browserifyArgs = {
  debug: true,
  entries: 'src/ike.js',
  standalone: 'Ike',
  transform: [
    'babelify'
  ]
}

const watchifyArgs = assign(watchify.args, browserifyArgs)
const bundler = watchify(browserify(watchifyArgs))

const build = () => {
  console.log('Bundling started...')
  console.time('Bundling finished')

  return bundler
    .bundle()
    .on('error', onError)
    .on('end', () => console.timeEnd('Bundling finished'))
    .pipe(source('ike.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(header(attribution, { pkg: packageJSON }))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream())
}

bundler.on('update', build)
gulp.task('js', build)

// SERVER
const server = sync.create()

const options = {
  notify: false,
  server: {
    baseDir: 'dist',
  },
  watchOptions: {
    ignored: '*.map'
  }
}

gulp.task('server', () => sync(options))

// WATCH
gulp.task('default', ['js', 'server'])
