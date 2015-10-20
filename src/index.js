/* @flow */


import * as React from "react";
import {node} from "./node"
import {thunk} from "./thunk"

/*::
import type {VirtualTree, Address, Driver} from "reflex/type";

type RenderTarget = Node & Element & HTMLElement
type Configuration = {target: RenderTarget, timeGroupName?:string}
*/

export class Renderer {
  /*::
  target: RenderTarget;
  value: Driver.VirtualRoot;
  isScheduled: boolean;
  version: number;
  address: Address<Driver.VirtualRoot>;
  execute: () => void;
  timeGroupName: ?string;

  render: Driver.render;
  node: Driver.node;
  thunk: Driver.thunk;
  text: ?Driver.text;
  */
  constructor({target, timeGroupName}/*:Configuration*/) {
    this.isScheduled = false
    this.version = 0

    this.target = target
    this.timeGroupName = timeGroupName == null ? null : timeGroupName

    this.address = this.receive.bind(this)
    this.execute = this.execute.bind(this)
  }
  toString()/*:string*/{
    return `Renderer({target: ${this.target}})`
  }
  receive(value/*:Driver.VirtualRoot*/) {
    this.value = value
    this.schedule()
  }
  schedule() {
    if (!this.isScheduled) {
      this.isScheduled = true
      this.version = requestAnimationFrame(this.execute)
    }
  }
  execute(_/*:number*/) {
    const {timeGroupName} = this
    if (timeGroupName != null) {
      console.time(`render ${timeGroupName}`)
    }

    const start = performance.now()

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

    this.value.renderWith(this)

    const end = performance.now()
    const time = end - start

    if (time > 16) {
      console.warn(`Render took ${time}ms & will cause frame drop`)
    }

    if (timeGroupName != null) {
      console.time(`render ${timeGroupName}`)
    }
  }
  render(tree/*:VirtualTree*/) {
    React.render(tree, this.target)
  }
}
Renderer.prototype.text = null
Renderer.prototype.node = node
Renderer.prototype.thunk = thunk
