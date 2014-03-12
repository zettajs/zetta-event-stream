var ElroyEvent = require('./index');

var c = new ElroyEvent('ws://localhost:3000/events');
c.on('open',function(){
  console.log('on open')

  c.subscribe('_logs',function(log){
    console.log(log.time,log.msg)
  });
  
});

