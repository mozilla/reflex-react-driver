/* @flow */

import type {Effects} from "reflex/type/effects"
import type {Address, VirtualNode} from "reflex/type"
import * as RandomGif from "./random-gif"

export type ID = number

export type Entry = {
  type: "RandomGifList.Entry",
  id: ID,
  model: RandomGif.Model
}

export type State = {
  topic: string,
  nextID: ID,
  entries: Array<Entry>
}

export type Model = {
  type: "RandomGifList.Model",
  topic: string,
  nextID: ID,
  entries: Array<Entry>
}


export type Topic = {type: "RandomGifList.Topic", topic: string}
export type Create = {type: "RandomGifList.Create"}
export type UpdateByID = {
  type: "RandomGifList.UpdateByID",
  id: ID,
  act: RandomGif.Action
}

export type Action
  = Topic
  | Create
  | UpdateByID



export type asTopic = (topic:string) => Topic
export type asCreate = () => Create
export type asByID = (id:ID) => (act:RandomGif.Action) => UpdateByID

export type create = (options:State) => Model
export type initialize = () => [Model, Effects<Action>]

export type step = (model:Model, action:Action) => [Model, Effects<Action>]

export type viewEntry = (entry:Entry, address:Address<Action>) => VirtualNode
export type view = (model:Model, address:Address<Action>) => VirtualNode
