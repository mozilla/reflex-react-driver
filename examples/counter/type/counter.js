/* @flow */

import type {Address, VirtualNode} from "reflex/type"

export type Model = {type: "Counter.Model", value:number}
export type Increment = {type: "Counter.Increment"}
export type Decrement = {type: "Counter.Decrement"}
export type Action = Increment|Decrement

export type asIncrement = () => Increment
export type asDecrement = () => Decrement

export type create = (options:{value:number}) => Model
export type update = (model:Model, action:Action) => Model
export type view = (model:Model, address:Address<Action>) => VirtualNode
