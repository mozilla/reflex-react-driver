/* @flow */

import * as Counter from "./counter"
import * as CounterList from "./counter-list"
import type {Address, VirtualNode} from "reflex/type";

export type ID = CounterList.ID
export type Entry = CounterList.Entry
export type Model = CounterList.Model

export type RemoveByID = {type: "CounterSet.RemoveByID", id:ID}
export type Action
  = RemoveByID
  | CounterList.Action

export type asRemoveBy = (id:ID) => () => RemoveByID


export type update = (model:Model, action:Action) => Model
export type removeByID = (model:Model, id:ID) => Model

export type viewEntry = (entry:Entry, address:Address<Action>) => VirtualNode
export type view = (entry:Model, address:Address<Action>) => VirtualNode
