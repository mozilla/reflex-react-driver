/* @flow */

import type {Float, Time} from "eased/type"
import type {Address, VirtualNode} from "reflex/type"
import type {Effects} from "reflex/type/effects"


export type AnimationState = {
  lastTime: Time,
  elapsedTime: Time
}

export type State = {
  angle: Float,
  animationState: ?AnimationState
}

export type Model
  = {type: "SpinSquare.Model"}
  & State

export type Spin = {type: "SpinSquare.Spin"}
export type Tick = {type: "SpinSquare.Tick", time: Time}
export type Action
  = Spin
  | Tick

export type asSpin = () => Spin
export type asTick = (time:Time) => Tick

export type create = (options:State) => Model
export type initialize = () => [Model, Effects<Action>]

export type step = (model:Model, action:Action) => [Model, Effects<Action>]

export type view = (model:Model, address:Address<Action>) => VirtualNode
