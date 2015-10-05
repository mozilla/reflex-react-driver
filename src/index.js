/* @flow */

import * as React from "react";
/*::
import type {VirtualElement} from "reflex/src/core";
import type {Address} from "reflex/src/signal";

type RenderTarget = Node|Element|HTMLElement;
type Configuration = {target: RenderTarget};
*/

export class Renderer {
  /*::
  target: RenderTarget;
  isScheduled: boolean;
  version: number;
  value: VirtualElement;
  receive: (value:VirtualElement) => void;
  render: () => void;
  address: Address<VirtualElement>;
  */
  constructor({target}/*:Configuration*/) {
    this.isScheduled = false
    this.version = 0

    this.target = target
    this.render = this.render.bind(this)

    this.address = this.receive.bind(this)
  }
  receive(value/*:VirtualElement*/) {
    this.value = value
    this.schedule()
  }
  schedule() {
    if (!this.isScheduled) {
      this.isScheduled = true
      this.version = requestAnimationFrame(this.render)
    }
  }
  render() {
    if (profile) {
      console.time('render')
    }

    var start = performance.now()

    // It is important to mark `isScheduled` as `false` before doing actual
    // rendering since state changes in effect of reflecting current state
    // won't be handled by this render cycle. For example rendering a state
    // with updated focus will cause `blur` & `focus` events to be dispatched
    // that happen synchronously, and there for another render cycle may be
    // scheduled for which `isScheduled` must be `false`. Attempt to render
    // this state may also cause a runtime exception but even then we would
    // rather attempt to render updated states that end up being blocked
    // forever.
    this.isScheduled = false
    if (profile) {
      console.time('render')
    }

    React.render(this.value, this.target)

    var end = performance.now()
    var time = end - start

    if (time > 16) {
      console.warn(`Render took ${time}ms & will cause frame drop`)
    }

    if (profile) {
      console.timeEnd('render')
    }
  }
}

var profile /*:?string*/ = null
export var time = (name/*:?string*/) => {
  profile = name
}

export var timeEnd = () => {
  profile = null
}
