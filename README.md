
# Codom - mini functional templating

Codom is a mini functional templating engine. There are only 3 functions.
You probably won't use 2 of them.

## Getting started

```js
var stuff = co.node('div.content',
              co.node('a.linkclass', { href: 'http://google.com' },
                "google!"));
```

stuff is a string:

```html
<div class="content">
  <a class="linkclass" href="http://google.com">google!</a>
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

