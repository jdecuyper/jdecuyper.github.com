Bag = function(o){
  this.init(o)
}

Bag.prototype.init = function(o){
  for (var a in o){
    this[a] = o[a];
  }
  this._original = o;
}

Bag.prototype.print = function(){
  for (var a in this){
    if (a != "_original"){
      if (!(this[a] instanceof Function)){
        Pqp.trace(a+"="+this[a] + " ("+typeof(this[a])+")");
        trace(a+"="+this[a] + " ("+typeof(this[a])+")");
      }
    }
  }
}


