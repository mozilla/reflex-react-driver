/* @flow */
import {Record, Union} from "typed-immutable"
import {html, forward, Effects, Task} from "reflex"
import {ease, easeOutBounce, float} from "eased"

/*:: import * as type from "../type/spin-square" */

export const create/*:type.create*/ = ({angle, animationState}) =>
  ({type: "SpinSquare.Model", angle, animationState})

export const initialize/*:type.initialize*/ = () => [
  create({angle: 0, animationState:null}),
  Effects.none
]

const rotateStep = 90
const ms = 1
const second = 1000 * ms
const duration = second

export const asSpin/*:type.asSpin*/ = () => ({type: "SpinSquare.Spin"})
export const asTick/*:type.asTick*/ = time => ({type: "SpinSquare.Tick", time})

export const step/*:type.step*/ = (model, action) => {
  if (action.type === "SpinSquare.Spin") {
    if (model.animationState == null) {
      return [model, Effects.tick(asTick)]
    } else {
      return [model, Effects.none]
    }
  }

  if (action.type === "SpinSquare.Tick") {
    const {animationState, angle} = model
    const elapsedTime = animationState == null ?
      0 :
      animationState.elapsedTime + (action.time - animationState.lastTime)

    if (elapsedTime > duration) {
      return [
        create({angle: angle + rotateStep, animationState: null}),
        Effects.none
      ]
    } else {
      return [
        create({angle, animationState: {elapsedTime, lastTime: action.time}}),
        Effects.tick(asTick)
      ]
    }
  }


  return [model, Effects.none]
}

// View

const toOffset = animationState =>
  animationState == null ?
    0 :
    ease(easeOutBounce, float, 0,
          rotateStep, duration, animationState.elapsedTime)


const style = {
  square: {
    width: "200px",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#60B5CC",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "30px"
  },
  spin({angle, animationState}) {
    return {
      transform: `translate(100px, 100px) rotate(${angle + toOffset(animationState)}deg)`
    }
  }
}

export const view/*:type.view*/ = (model, address) =>
  html.figure({
    key: "spin-square",
    style: Object.assign({}, style.spin(model), style.square),
    onClick: forward(address, asSpin)
  }, ["Click me!"])
