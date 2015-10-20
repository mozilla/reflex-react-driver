/* @flow */


import type {Address, VirtualNode} from "reflex/type"
import type {Effects} from "reflex/type/effects"
import * as SpinSquare from "./spin-square"

export type State = {
  left: SpinSquare.State,
  right: SpinSquare.State
}

export type Model = {
  left: SpinSquare.Model,
  right: SpinSquare.Model
}


export type Left = {
  type: "SpinSquarePair.Left",
  act: SpinSquare.Action
}

export type Right = {
  type: "SpinSquarePair.Right",
  act: any // Workaround for facebook/flow#953
  // act: SpinSquare.Action
}

export type Action
  = Left
  | Right


export type asLeft = (action:SpinSquare.Action) => Left
export type asRight = (action:SpinSquare.Action) => Right

export type create = (options:State) => Model
export type initialize = () => [Model, Effects<Action>]

export type step = (model:Model, action:Action) => [Model, Effects<Action>]

export type view = (model:Model, address:Address<Action>) => VirtualNode
