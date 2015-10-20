/* @flow */

import type {Effects} from "reflex/type/effects"
import type {Address, VirtualNode} from "reflex/type"

export type State = {
  topic: string,
  uri: string
}

export type Model
  = {type: "RandomGif.Model"}
  & State

export type RequestMore = {type: "RandomGif.RequestMore"}
export type ReceiveNewGif = {type: "RandomGif.ReceiveNewGif", uri: ?string}
export type Action
  = RequestMore
  | ReceiveNewGif

export type asRequestMore = () => RequestMore
export type asReceiveNewGif = (uri:?string) => ReceiveNewGif

export type create = (options:State) => Model


export type initialize = (topic:string) => [Model, Effects<Action>]
export type step = (model:Model, action:Action) => [Model, Effects<Action>]

export type getRandomGif = (topic:string) => Effects<Action>

export type view = (model:Model, address:Address<Action>) => VirtualNode
