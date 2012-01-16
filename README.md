
# Codom - mini functional templating

Codom is a mini functional templating engine.

## Installing

### Node.js

    npm install codom

### Browser

Codom functions are accessible on the `co` object. You can call `Codom.noConflict`
to restore existing objects bound to `co`.

## Getting started

```js
var stuff = co.node('div#content',
              co.node('a#google.linkclass', { href: 'http://google.com' },
                "google!"));
```

stuff is a string:

```html
<div id="content">
  <a class="linkclass" id="google" href="http://google.com">google!</a>
</div>
```

## Abstractions

Easily build abstractions!

```js
function row(columnRenderers, data) {
  var n = 0;
  return co.node('tr', columnRenderers.map(function(fn){
    return co.node('td#column' + (++n), fn(data));
  }).join(""));
}

function table(meta) {
  var rows = meta.rowData.map(function(rowData){
    return row(meta.renderers, rowData);
  }).join("");
  return co.node("table#myTable", rows);
}
``` 

