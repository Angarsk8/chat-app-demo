const gulp   = require('gulp')
const react  = require('gulp-react')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const babel  = require('gulp-babel')

const jsFiles = './src/assets/javascripts/*.jsx'
const jsDest  = './src/assets/javascripts/dist'

gulp.task('build-js', () => {  
  return gulp.src(jsFiles)
    .pipe(concat('chat.jsx'))
    .pipe(react())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('chat.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest))
})

gulp.task('default', ['build-js'])
