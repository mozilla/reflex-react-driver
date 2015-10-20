# reflex-react-driver

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
