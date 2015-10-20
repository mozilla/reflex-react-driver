/* @flow */

import type {Address, VirtualNode} from "reflex/type"
import * as Counter from "./counter"

export type ID = number;
export type Entry = {
  type: "CounterList.Entry",
  id: ID,
  model: Counter.Model
};

export type Model = {
  type: "CounterList.Model",
  nextID: ID,
  entries: Array<Entry>
};


export type Add = {type: "CounterList.Add"}
export type Remove = {type: "CounterList.Remove"}
export type ModifyByID = {type: "CounterList.ModifyByID",
                          id:ID,
                          act:Counter.Action}
export type Action = Add|Remove|ModifyByID


export type asAdd = () => Add
export type asRemove = () => Remove
export type asBy = (id:ID) => (act:Counter.Action) => ModifyByID

export type create = (options:{nextID:ID, entries:Array<Entry>}) => Model
export type add = (model:Model) => Model
export type remove = (model:Model) => Model
export type modify = (model:Model, id:ID, action:Counter.Action) => Model
export type update = (model:Model, action:Action) => Model

export type viewEntry = (entry:Entry, address:Address<Action>) => VirtualNode
export type view = (model:Model, address:Address<Action>) => VirtualNode
