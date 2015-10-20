/* @flow */

import * as CounterPair from "./counter-pair"
import {start} from "reflex"
import {Renderer} from "reflex-react-driver"

var app = start({
  initial: CounterPair.create(window.app != null ?
                                window.app.model.value :
                                {top: {value: 0},
                                 bottom: {value: 0}}),
  update: CounterPair.update,
  view: CounterPair.view
});
window.app = app

var renderer = new Renderer({target: document.body})

app.view.subscribe(renderer.address)
