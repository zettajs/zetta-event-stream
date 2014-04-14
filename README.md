# Zetta Event Stream

`npm install zetta-event-stream`

```js

var ZettaEvent = require('zetta-event-stream');

var c = new ZettaEvent('ws://localhost:3000/events');
c.on('open',function(){
  console.log('on open')

  c.subscribe('_logs',function(log){
    console.log(log.time,log.msg)
  });
  
});

```
