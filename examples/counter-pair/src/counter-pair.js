// @flow

import * as Counter from "./counter";
import {html, forward} from "reflex";

/*::
import type {VirtualNode, Address} from "reflex/type"
import * as type from "../type/counter-pair"
*/


export const asTop/*:type.asTop*/ = act =>
  ({type: "CounterPair.Top", act})

export const asBottom/*:type.asBottom*/ = act =>
  ({type: "CounterPair.Bottom", act})

export const asReset/*:type.asReset*/ = () =>
  ({type: "CounterPair.Reset"})


export const create/*:type.create*/ = ({top, bottom}) => ({
  type: "CounterPair.Model",
  top: Counter.create(top),
  bottom: Counter.create(bottom)
})

// Note last two functions are wrapped in too many parenthesis with type
// casting comments at the end due to a bug in type checker: facebook/flow#953

export const update/*:type.update*/ = (model, action) =>
  action.type === "CounterPair.Top" ?
    create({top: Counter.update(model.top, action.act),
            bottom: model.bottom}) :
  action.type === "CounterPair.Bottom" ?
    create({top: model.top,
            bottom: Counter.update(model.bottom, action.act)}) :
  action.type === "CounterPair.Reset" ?
    create({top: {value: 0},
            bottom: {value: 0}}) :
    model

// View
export const view/*:type.view*/ = (model, address) =>
  html.div({key: "counter-pair"}, [
    html.div({key: "top"}, [
      Counter.view(model.top, forward(address, asTop))
    ]),
    html.div({key: "bottom"}, [
      Counter.view(model.bottom, forward(address, asBottom)),
    ]),
    html.div({key: "controls"}, [
      html.button({
        key: "reset",
        onClick: forward(address, asReset)
      }, ["Reset"])
    ])
  ])
