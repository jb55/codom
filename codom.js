
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

co._contains = function(s, find) {
  return s.indexOf(find) !== -1;
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
                                return attr + '="' + val + '"';})
           .join(" ");
}

//===----------------------------------------------------------------------===//
// node1
//===----------------------------------------------------------------------===//
co.node1 = function(node, attrs) {
  var hasId = co._contains(node, "#");
  var hasClass = co._contains(node, ".");

  if (hasId && hasClass) {
    var split = node.split("#");
    attrs["id"]    = split[1].split(".")[0];
    attrs["class"] = node.split(".")[1].split("#")[0];
    node = split[0];
  }
  else if (hasClass) {
    var split = node.split(".");
    attrs["class"] = split[1];
    node = split[0];
  }
  else if (hasId) {
    var split = node.split("#");
    attrs["id"] = split[1];
    node = split[0];
  }

  var strAttrs = co.attrs(attrs);
  console.log(strAttrs);
  return "<" + node + " " + strAttrs + ">";
}

//===----------------------------------------------------------------------===//
// node
//===----------------------------------------------------------------------===//
co.node = function(node, attrs, text) {
  if (typeof attrs === 'string') {
    text = attrs;
    attrs = {};
  }
  return co.node1(node, attrs) + (text || "") + "</" + node + ">";
}

})();
