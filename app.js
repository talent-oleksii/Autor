var options = require('./stores/config.json');

var watchDir = options.watchDir;
var movieDir = options.movieDir;
var musicDir = options.musicDir;
var imageDir = options.imageDir;
var otherDir = options.otherDir;

var mime = require('mime');
//Initialize mv module to move files around
var mv = require('mv');
//Initialize Chokidar, a file watcher
var chokidar = require('chokidar').watch(watchDir, {
                persistent: true,
                ignoreInitial: true
});

//Registering ADD event of chokidar to perform certain task
chokidar.on('add', function(path, event) {
  var mimeType = mime.lookup(path);
  doCatagorize(path,mimeType);
});



function doCatagorize(path,mimeType) {
  //Check  if File type is Video
  var pathArray = path.split('/');
  var fileName = pathArray[pathArray.length - 1 ];
      if(matchExpression(mimeType,'video*')){
        mv(path, movieDir + fileName,{mkdirp:true},function(err){
          if(err) {
          throw err;
          }
        });
      }
  //Check if File type is Audio
      else if(matchExpression(mimeType,'audio*')){
        mv(path, musicDir + fileName,{mkdirp:true},function(err){
          if(err) {
          throw err;
          }
        });
      }
  //Check if File type is Image
      else if(matchExpression(mimeType,'image*')){
        mv(path, imageDir + fileName,{mkdirp:true},function(err){
          if(err) {
          throw err;
          }
        });
      }
  //Do for the rest of the files
      else {

        mv(path, otherDir + fileName,{mkdirp:true},function(err){
          if(err) {
          throw err;
          }
        });
      }

    console.log('Moving :'+ path + ' to '+ movieDir + fileName);
    console.log('Mime type :' + mimeType);
}
function matchExpression(str, expression) {
  return new RegExp("^" + expression.split("*").join(".*") + "$").test(str);
}
