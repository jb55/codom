
//===----------------------------------------------------------------------===//
// Codom - code is dom
//   mini, functional javascript templating
// by: Bill Casarin
// email: bill@casarin.ca
//===----------------------------------------------------------------------===//

(function(){

var Codom = {};
var root = this;

var prevCo = root.co;
var co = Codom;

root.co = co;
root.Codom = Codom;

// internal map implementation
co._map = function(d, fn) {
  var a = [];
  for (var key in d) {
    if (d.hasOwnProperty(key))
      a.push(fn(key, d[key]));
  }
  return a;
}

//===----------------------------------------------------------------------===//
// noConflict
//===----------------------------------------------------------------------===//
co.noConflict = function(){
  root.co = prevCo;
}

//===----------------------------------------------------------------------===//
// attrs
//===----------------------------------------------------------------------===//
co.attrs = function(attrs) {
  return co._map(attrs || {}, function(attr, val) {
    // class is not a valid key and will cause issues in some browsers
    return (attr == 'className'? 'class': attr) + '="' + val + '"';})
           .join(" ");
}

//===----------------------------------------------------------------------===//
// node1
//===----------------------------------------------------------------------===//
co.node1 = function(node, attrs) {
  var strAttrs = co.attrs(attrs);
  return "<" + node + " " + strAttrs + ">";
}

//===----------------------------------------------------------------------===//
// node
//===----------------------------------------------------------------------===//
co.node = function(node, attrs, text) {
  return co.node1(node, attrs) + (text || "") + "</" + node + ">";
}

})();
