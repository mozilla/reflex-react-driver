/* @flow */
import * as RandomGif from "./random-gif"
import {find} from "./array-find"
import {html, forward, thunk, Effects} from "reflex"


/*:: import * as type from "../type/random-gif-list" */

export const create/*:type.create*/ = ({topic, entries, nextID}) =>
  ({type: "RandomGifList.Model", topic, entries, nextID})

export const initialize/*:type.initialize*/ = () =>
  [create({topic: "", entries: [], nextID: 0}, Effects.none)]

export const asTopic/*:type.asTopic*/ = topic =>
  ({type: "RandomGifList.Topic", topic})

export const asCreate/*:type.asCreate*/ = () =>
  ({type: "RandomGifList.Create"})

export const asByID/*:type.asByID*/ = id => act =>
  ({type: "RandomGifList.UpdateByID", id, act})

export const step/*:type.step*/ = (model, action) => {
  if (action.type === "RandomGifList.Topic") {
    return [
      create({
        topic: action.topic,
        nextID: model.nextID,
        entries: model.entries
      }),
      Effects.none
    ]
  }

  if (action.type === "RandomGifList.Create") {
    const [gif, fx] = RandomGif.initialize(model.topic)
    return [
      create({
        topic: "",
        nextID: model.nextID + 1,
        entries: model.entries.concat([{
          type: "RandomGifList.Entry",
          id: model.nextID,
          model: gif
        }])
      }),
      fx.map(asByID(model.nextID))
    ]
  }

  if (action.type === "RandomGifList.UpdateByID") {
    const {id} = action
    const {entries, topic, nextID} = model
    const entry = find(entries, entry => entry.id === id)
    const index = entry != null ? entries.indexOf(entry) : -1
    if (index >= 0 && entry != null && entry.model != null && entry.id != null){
      const [gif, fx] = RandomGif.step(entry.model, action.act)
      const entries = model.entries.slice(0)
      entries[index] = {
        type: "RandomGifList.Entry",
        id,
        model: gif
      }

      return [
        create({topic, nextID, entries}),
        fx.map(asByID(id))
      ]
    }
  }

  return [model, Effects.none]
}

const style = {
  input: {
    width: "100%",
    height: "40px",
    padding: "10px 0",
    fontSize: "2em",
    textAlign: "center"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
}

export const viewEntry/*:type.viewEntry*/ = ({id, model}, address) =>
  RandomGif.view(model, forward(address, asByID(id)))

export const view/*:type.view*/ = (model, address) =>
  html.div({key: "random-gif-list"}, [
    html.input({
      style: style.input,
      placeholder: "What kind of gifs do you want?",
      value: model.topic,
      onChange: forward(address, event => asTopic(event.target.value)),
      onKeyUp: event => {
        if (event.keyCode === 13) {
          address(asCreate())
        }
      }
    }),
    html.div({key: "random-gifs-list-box", style: style.container},
             model.entries.map(entry => thunk(String(entry.id),
                                              viewEntry,
                                              entry,
                                              address)))
  ])
