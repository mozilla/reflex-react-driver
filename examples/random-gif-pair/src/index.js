/* @flow */

import * as RandomGifPair from "./random-gif-pair"
import {start, Effects} from "reflex"
import {Renderer} from "reflex-react-driver"

var app = start({
  initial: window.app != null ?
           [RandomGifPair.create(window.app.model.value)] :
           RandomGifPair.initialize("funny cats", "funny hamsters"),
  step: RandomGifPair.step,
  view: RandomGifPair.view
});
window.app = app

var renderer = new Renderer({target: document.body})

app.view.subscribe(renderer.address)
app.task.subscribe(Effects.service(app.address))
