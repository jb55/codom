
# Codom - mini functional templating

Codom is a mini functional templating engine. There are only 3 functions.

## Getting started

```js
var stuff = co.node('div', { class: 'content' },
              co.node('a', { class: 'linkclass', href: 'http://google.com' },
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
  var rows = columnRenderers.map(function(fn){
    ++n;
    var field = fn(data);
    return co.node('td', { class: 'column' + n }, field);
  }).join("");
  return a.node('tr', {}, rows);
}

function table(meta) {
  var rows = meta.rowData.map(function(rowData){
    return row(meta.renderers, rowData);
  }).join("");
  return a.node("table", { id: "myTable" }, rows);
}
``` 

