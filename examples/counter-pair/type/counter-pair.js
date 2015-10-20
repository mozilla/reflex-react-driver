// @flow

import type {Address, VirtualNode} from "reflex/type"
import * as Counter from "./counter"

export type Model = {
  type: "CounterPair.Model",
  top: Counter.Model,
  bottom: Counter.Model
}

export type Top = {
  type: "CounterPair.Top",
  act: Counter.Action
}
export type Bottom = {
  type: "CounterPair.Bottom",
  act: any // Workaround for facebook/flow#953
  // act: Counter.Action
}
export type Reset = {type: "CounterPair.Reset"}
export type Action
  = Top
  | Bottom
  | Reset

export type asTop = (action:Counter.Action) => Top
export type asBottom = (action:Counter.Action) => Bottom
export type asReset = () => Reset


export type create = (options:{top:{value:number}, bottom:{value:number}}) =>
  Model
export type update = (model:Model, action:Action) => Model


export type view = (model:Model, address:Address<Action>) => VirtualNode
