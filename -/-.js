console.log(`script by
  _|  _.  _  _   _  _  ._     _|_  _ |_   _  ._ _  o  _ _|_
 (_| (_| (_ (_) (_ (_) | | |_| |_ (_ | | (/_ | | | | _>  |_`);
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}
