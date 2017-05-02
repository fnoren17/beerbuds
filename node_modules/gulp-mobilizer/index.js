var path = require('path'),
    through = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    File = gutil.File,
    mobilizer = require('mobilizer');

module.exports = function(filename, targets) {  
  return through.obj(function(file, enc, callback) {

    if (filename == file.relative) {    
      if (file.isNull()) return; // ignore
      if (file.isStream()) return this.emit('error', new PluginError('gulp-mobilizer',  'Streaming not supported'));
      
      var content = file.contents.toString();
      var results = mobilizer(content, targets);
      var stream  = this;
      Object.keys(results).forEach(function(k){
        stream.push(new File({
          cwd: file.cwd,
          base: file.base,
          path: path.join(file.base, k),
          contents: new Buffer(results[k]),
          stat: file.stat
        }));
      });
    } else {
      this.push(file);  
    }

    callback();
  });
}