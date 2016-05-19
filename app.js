var options = require('./stores/config.json');

var watchDir = options.watchDir;
var movieDir = options.movieDir;
var musicDir = options.musicDir;
var imageDir = options.imageDir;
var otherDir = options.otherDir;
//Initialize mmmagic to detect MIME types
var mmm = require('mmmagic'), magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
//Initialize mv module to move files around
var mv = require('mv');
//Initialize Chokidar, a file watcher
var chokidar = require('chokidar').watch(watchDir, {
                persistent: true,
                ignoreInitial: true
});

//Registering ADD event of chokidar to perform certain task
chokidar.on('add', function(path, event) {
  console.log(path,event);
  magic.detectFile(path,function (err,result) {
    //Check  if File type is Video
    var pathArray = path.split('/');
    var fileName = pathArray[pathArray.length - 1 ];
    console.log(fileName);
        if(matchExpression(result,'video*')){
          mv(path, movieDir + fileName,{mkdirp:true},function(err){
            if(err) {
            throw err;
            }
          });
        }
    //Check if File type is Audio
        else if(matchExpression(result,'audio*')){
          mv(path, musicDir + fileName,{mkdirp:true},function(err){
            if(err) {
            throw err;
            }
          });
        }
    //Check if File type is Image
        else if(matchExpression(result,'image*')){
          mv(path, imageDir + fileName,{mkdirp:true},function(err){
            if(err) {
            throw err;
            }
          });
        }
    //Do for the rest of the files
        else {
          var pathArray = path.split('/');
          var fileName = pathArray[pathArray.length - 1 ];
          console.log(fileName);
          mv(path, otherDir + fileName,{mkdirp:true},function(err){
            if(err) {
            throw err;
            }
          });
        }

      console.log('Moving :'+ path + ' to '+ movieDir + fileName);
      console.log('Mime type :' + result);
  });

});


function matchExpression(str, expression) {
  return new RegExp("^" + expression.split("*").join(".*") + "$").test(str);
}
