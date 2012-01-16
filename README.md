
# Codom - mini functional templating

Codom is a mini functional templating engine there are only 3 functions

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

