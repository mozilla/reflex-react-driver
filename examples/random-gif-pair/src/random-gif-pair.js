/* @flow */

import * as RandomGif from "./random-gif"
import {html, forward, Task, Effects} from "reflex"

/*:: import * as type from "../type/random-gif-pair" */

export const create/*:type.create*/ = ({left, right}) => ({
  type: "RandomGifPair.Model",
  left: RandomGif.create(left),
  right: RandomGif.create(right)
})

export const initialize/*:type.initialize*/ = (leftTopic, rightTopic) => {
  const [left, leftFx] = RandomGif.initialize(leftTopic)
  const [right, rightFx] = RandomGif.initialize(rightTopic)
  return [
    create({left, right}),
    Effects.batch([
      leftFx.map(asLeft),
      rightFx.map(asRight)
    ])
  ]
}

export const asLeft/*:type.asLeft*/ = act =>
  ({type: "RandomGifPair.Left", act})

export const asRight/*:type.asRight*/ = act =>
  ({type: "RandomGifPair.Right", act})


export const step/*:type.step*/ = (model, action) => {
  if (action.type === "RandomGifPair.Left") {
    const [left, fx] = RandomGif.step(model.left, action.act)
    return [create({left, right: model.right}), fx.map(asLeft)]
  }

  if (action.type === "RandomGifPair.Right") {
    const [right, fx] = RandomGif.step(model.right, action.act)
    return [create({left:model.left, right}), fx.map(asRight)]
  }

  return [model, Effects.none]
}

export const view/*:type.view*/ = (model, address) => {
  return html.div({key: "random-gif-pair",
                   style: {display: "flex"}}, [
    html.div({key: "left"}, [
      RandomGif.view(model.left, forward(address, asLeft))
    ]),
    html.div({key: "right"}, [
      RandomGif.view(model.right, forward(address, asRight))
    ])
  ]);
};
