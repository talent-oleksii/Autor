var menubar = require('menubar');
var mb = menubar();
var path = require('path');
var child = require('child_process');

mb.on('ready', function(){
  console.log('Rady!');
  var appPath = path.join(__dirname, 'app.js');
  console.log(appPath);
  child.fork(appPath);
})
