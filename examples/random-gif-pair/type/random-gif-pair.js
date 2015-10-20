/* @flow */

import type {Effects} from "reflex/type/effects"
import type {Address, VirtualNode} from "reflex/type"
import * as RandomGif from "./random-gif"

export type State = {
  left: RandomGif.State,
  right: RandomGif.State
}

export type Model
  = {type: "RandomGifPair.Model"}
  & {left: RandomGif.Model, right:RandomGif.Model}

export type Left = {
  type: "RandomGifPair.Left",
  act: RandomGif.Action
}
export type Right = {
  type: "RandomGifPair.Right",
  act: any // Workaround for facebook/flow#953
  // act: RandomGif.Action
}
export type Action = Left | Right

export type asLeft = (action:RandomGif.Action) => Left
export type asRight = (action:RandomGif.Action) => Right

export type create = (options:State) => Model
export type initialize = (leftTopic:string, rightTopic:string) =>
  [Model, Effects<Action>]

export type step = (model:Model, action:Action) => [Model, Effects<Action>]

export type view = (model:Model, address:Address<Action>) => VirtualNode
