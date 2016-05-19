var menubar = require('menubar');
var mb = menubar();

var child = require('child_process');

mb.on('ready', function(){
  console.log('Rady!');
  child.spawn('node',['./app.js'],{});
})
