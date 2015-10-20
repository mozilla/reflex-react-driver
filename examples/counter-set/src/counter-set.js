/* @flow */

import * as CounterList from "./counter-list";
import * as Counter from "./counter";
import {html, forward, thunk} from "reflex";

/*:: import * as type from "../type/counter-set" */

export const create = CounterList.create

export const asRemoveBy/*:type.asRemoveBy*/ = id => () =>
  ({type: "CounterSet.RemoveByID", id})

export const removeByID/*:type.removeByID*/ = (model, id) => create({
  nextID: model.nextID,
  entries: model.entries.filter(entry => entry.id != id)
})

export const update/*:type.update*/ = (model, action) =>
  action.type === "CounterSet.RemoveByID" ?
    removeByID(model, action.id) :
    CounterList.update(model, action)


const viewEntry/*:type.viewEntry*/ = ({id, model}, address) =>
  html.div({key: id}, [
    Counter.view(model, forward(address, CounterList.asBy(id))),
    html.button({
      key: "remove",
      onClick: forward(address, asRemoveBy(id))
    }, ["x"])
  ])

export const view/*:type.view*/ = (model, address) =>
  html.div({key: "CounterList"}, [
    html.div({key: "controls"}, [
      html.button({
        key: "add",
        onClick: forward(address, CounterList.asAdd)
      }, ["Add"])
    ]),
    html.div({
      key: "entries"
    }, model.entries.map(entry => thunk(String(entry.id),
                                        viewEntry,
                                        entry,
                                        address)))
  ])
