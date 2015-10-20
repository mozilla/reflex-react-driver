/* @flow */

import * as Counter from "./counter";
import {html, forward, thunk} from "reflex";

/*::
import * as type from "../type/counter-list"
*/

export const asAdd/*:type.asAdd*/ = () => ({type: "CounterList.Add"})
export const asRemove/*:type.asRemove*/ = () => ({type: "CounterList.Remove"})
export const asBy/*:type.asBy*/ = id => act =>
  ({type: "CounterList.ModifyByID", id, act})


export const create/*:type.create*/ = ({nextID, entries}) =>
  ({type: "CounterList.Model", nextID, entries})

export const add/*:type.add*/ = model => create({
  nextID: model.nextID + 1,
  entries: model.entries.concat([{
    type: "CounterList.Entry",
    id: model.nextID,
    model: Counter.create({value: 0})
  }])
})

export const remove/*:type.remove*/ = model => create({
  nextID: model.nextID,
  entries: model.entries.slice(1)
})

export const modify/*:type.modify*/ = (model, id, action) => create({
  nextID: model.nextID,
  entries: model.entries.map(entry =>
    entry.id !== id ?
      entry :
      {type: entry.type, id: id, model: Counter.update(entry.model, action)})
})

export const update/*:type.update*/ = (model, action) =>
  action.type === "CounterList.Add" ?
    add(model, action) :
  action.type === "CounterList.Remove" ?
    remove(model, action) :
  action.type === "CounterList.ModifyByID" ?
    modify(model, action.id, action.act) :
    model;


// View
const viewEntry/*:type.viewEntry*/ = ({id, model}, address) =>
  html.div({key: id}, [
    Counter.view(model, forward(address, asBy(id)))
  ])

export const view/*:type.view*/ = (model, address) =>
  html.div({key: "CounterList"}, [
    html.div({key: "controls"}, [
      html.button({
        key: "remove",
        onClick: forward(address, asRemove)
      }, ["Remove"]),
      html.button({
        key: "add",
        onClick: forward(address, asAdd)
      }, ["Add"])
    ]),
    html.div({
      key: "entries"
    }, model.entries.map(entry => thunk(String(entry.id),
                                        viewEntry,
                                        entry,
                                        address)))
  ])
