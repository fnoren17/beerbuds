gulp-mobilizer
==============

[Mobilizer](https://github.com/mcasimir/mobilizer) task for Gulp

## Install

```
npm i --save-dev gulp-mobilizer
```

## Usage

``` js
mobilizer(filename, targets);
```

Catches a file matching filename in the stream and replace it with one or more files according to mobilizer output.

Please refer to [mobilizer documentation](https://github.com/mcasimir/mobilizer) for targets options.

## Example

``` js
var gulp      = require('gulp'),
    mobilizer = require('gulp-mobilizer');

gulp.task('css', function () {
  gulp.src('*.css')

  // Catches only 'app.css' from sources 
  // and emits 'mobile.css' and 'hover.css'.
  // Pass through any other files

  .pipe(mobilizer('app.css', {
    'mobile.css': {
      hover: 'exclude',
      screens: ['0px']      
    },
    'hover.css': {
      hover: 'only',
      screens: ['0px']
    }
  }))
  
  // You can pipe more than 
  // one mobilizer component
  // in order to process multiple 
  // sources

  .pipe(mobilizer('vendor.css', {
    'vendor-mobile.css': {
      hover: 'exclude',
      screens: ['0px']
    },
    'vendor-hover.css': {
      hover: 'only',
      screens: ['0px']
    }
  }))

  .pipe(gulp.dest('dist'));
});
```
