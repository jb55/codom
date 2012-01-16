
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

// node.js support
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports)
    exports = module.exports = co;
  exports.co = co;
} else {
// browser support
  root.co = co;
  root.Codom = Codom;
}

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
// split
//===----------------------------------------------------------------------===//
co.split = function(node) {
  var ind;
  if ((ind = node.indexOf("#")) !== -1)
    return node.substring(0, ind)
  else if ((ind = node.indexOf(".")) !== -1)
    return node.substring(0, ind);
  return node;
}

//===----------------------------------------------------------------------===//
// split1
//===----------------------------------------------------------------------===//
co.split1 = function(node, attrs) {
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

  return node;
}

//===----------------------------------------------------------------------===//
// node1
//===----------------------------------------------------------------------===//
co.node1 = function(node, attrs) {
  attrs = attrs || {};
  node = co.split1(node, attrs);
  var strAttrs = co.attrs(attrs);
  return "<" + node + (strAttrs?" ":"") + strAttrs + ">";
}

//===----------------------------------------------------------------------===//
// node
//===----------------------------------------------------------------------===//
co.node = function(node, attrs, text) {
  if (typeof attrs === 'string') {
    text = attrs;
    attrs = {};
  }
  attrs = attrs || {};
  var actualNode = co.split(node);
  return co.node1(node, attrs) + (text || "") + "</" + actualNode + ">";
}

})();
