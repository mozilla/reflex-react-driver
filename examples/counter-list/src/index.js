/* @flow */

import * as CounterList from "./counter-list"
import {start} from "reflex"
import {Renderer} from "reflex-react-driver"

const app = start({
  initial: CounterList.create(window.app != null ?
                                window.app.model.value :
                                {nextID: 0, entries: []}),
  update: CounterList.update,
  view: CounterList.view
});
window.app = app

const renderer = new Renderer({target: document.body})

app.view.subscribe(renderer.address)
