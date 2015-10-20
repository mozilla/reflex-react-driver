/* @flow */

import {html, forward, Effects, Task} from "reflex"
import {fetch} from "./fetch"

/*:: import * as type from "../type/random-gif" */

export const create/*:type.create*/ = ({topic, uri}) =>
  ({type: "RandomGif.Model", topic, uri})

export const initialize/*:type.initialize*/ = topic =>
  [create({topic, uri: "assets/waiting.gif"}), getRandomGif(topic)]


export const asRequestMore/*:type.asRequestMore*/ = () =>
  ({type: "RandomGif.RequestMore"})

export const asReceiveNewGif/*:type.asReceiveNewGif*/ = uri =>
  ({type: "RandomGif.ReceiveNewGif", uri})


export const step/*:type.step*/ = (model, action) =>
  action.type === "RandomGif.RequestMore" ?
    [model, getRandomGif(model.topic)] :
  action.type === "RandomGif.ReceiveNewGif" ?
    [
      create({
        topic: model.topic,
        uri: action.uri != null ? action.uri : model.uri
      }),
      Effects.none
    ] :
    [model, Effects.none]

const makeRandomURI = topic =>
  `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${topic}`

const decodeResponseBody = body =>
  (body != null && body.data != null && body.data.image_url != null) ?
    String(body.data.image_url) :
    null

const readResponseAsJSON = response => response.json()

export const getRandomGif/*:type.getRandomGif*/ = topic =>
  Effects.task(Task.future(() => fetch(makeRandomURI(topic))
                                  .then(readResponseAsJSON)
                                  .then(decodeResponseBody)
                                  .then(asReceiveNewGif)))

const style = {
  viewer: {
    width: "200px"
  },
  header: {
    width: "200px",
    textAlign: "center"
  },
  image(uri) {
    return {
      display: "inline-block",
      width: "200px",
      height: "200px",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundImage: `url("${uri}")`
    }
  }
}

export const view/*:type.view*/ = (model, address) =>
  html.div({key: "gif-viewer", style: style.viewer}, [
    html.h2({key: "header", style: style.header}, [model.topic]),
    html.div({key: "image", style: style.image(model.uri)}),
    html.button({key: "button", onClick: forward(address, asRequestMore)}, [
      "More please!"
    ])
  ])
