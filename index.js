var events = require('events')
  , util = require('util')  
  , ws = require('ws');

var Client = module.exports = function(host){
  events.EventEmitter.call(this);

  var self = this;
  this.socket = new ws(host);
  this.socket.on('open',self.emit.bind(this,'open'));
  this.socket.on('error',self.emit.bind(this,'error'));
  this.socket.on('close',self.emit.bind(this,'close'));

  this._pubSubEmitter = new events.EventEmitter();

  this.socket.on('message',function(data){
    try {
      var json = JSON.parse(data);
      self._pubSubEmitter.emit(json.destination,json.data);
    }catch(err){
      console.error(err);
    }
  });

};
util.inherits(Client,events.EventEmitter);

Client.prototype.subscribe = function(eventName,callback){
  var self = this;
  this.socket.send( JSON.stringify({cmd : 'subscribe',name : eventName}),function(err){
    self._pubSubEmitter.on(eventName,callback);
  });  
};






