# reflex-react-driver [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

This is a [reflex][] application view driver that uses [react][] for rendering into a DOM.

## Usage

```js
import * as App from "./app"
import {start} from "reflex"
import {Renderer} from "reflex-react-driver"

const app = start({
  initial: App.initialize(),
  update: App.update,
  view: App.view
})

app.view.subscribe(new Renderer({target: document.body}))
```

[reflex]:https://github.com/Gozala/reflex
[react]:http://facebook.github.io/react/

[npm-url]: https://npmjs.org/package/reflex-react-driver
[npm-image]: https://img.shields.io/npm/v/reflex-react-driver.svg?style=flat

[travis-url]: https://travis-ci.org/Gozala/reflex-react-driver
[travis-image]: https://img.shields.io/travis/Gozala/reflex-react-driver.svg?style=flat
