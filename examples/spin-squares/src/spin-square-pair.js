/* @flow */

import * as SpinSquare from "./spin-square"
import {html, forward, thunk, Effects} from "reflex"

/*:: import * as type from "../type/spin-square-pair" */

export const create/*:type.create*/ = ({left, right}) => ({
  type: "SpinSquarePair.Model",
  left: SpinSquare.create(left),
  right: SpinSquare.create(right)
})

export const initialize/*:type.initialize*/ = () => {
  const [left, leftFx] = SpinSquare.initialize()
  const [right, rightFx] = SpinSquare.initialize()
  return [
    create({left, right}),
    Effects.batch([
      leftFx.map(asLeft),
      rightFx.map(asRight)
    ])
  ]
}

export const asLeft/*:type.asLeft*/ = act =>
  ({type: "SpinSquarePair.Left", act})

export const asRight/*:type.asRight*/ = act =>
  ({type: "SpinSquarePair.Right", act})


export const step/*:type.step*/ = (model, action) => {
  if (action.type === "SpinSquarePair.Left") {
    const [left, fx] = SpinSquare.step(model.left, action.act)
    return [create({left, right: model.right}), fx.map(asLeft)]
  }
  if (action.type === "SpinSquarePair.Right") {
    const [right, fx] = SpinSquare.step(model.right, action.act)
    return [create({left:model.left, right}), fx.map(asRight)]
  }

  return [model, Effects.none]
}


export var view/*:type.view*/ = (model, address) =>
  html.div({key: "spin-square-pair",
                   style: {display: "flex"}}, [
    thunk("left", SpinSquare.view, model.left, forward(address, asLeft)),
    thunk("right", SpinSquare.view, model.right, forward(address, asRight))
  ])
