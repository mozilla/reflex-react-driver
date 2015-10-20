/* @flow */
import {html, forward} from "reflex";

/*::
import * as type from "../type/counter"
*/

export const asIncrement/*:type.asIncrement*/ = () =>
  ({type: "Counter.Increment"})
export const asDecrement/*:type.asDecrement*/ = () =>
  ({type: "Counter.Decrement"})


export const create/*:type.create*/ = ({value}) =>
  ({type: "Counter.Model", value})

export const update/*:type.update*/ = (model, action) =>
  action.type === "Counter.Increment" ?
    {type:model.type, value: model.value + 1} :
  action.type === "Counter.Decrement" ?
    {type:model.type, value: model.value - 1} :
  model

const counterStyle = {
  value: {
    fontWeight: "bold"
  }
}

// View
export const view/*:type.view*/ = (model, address) =>
  html.span({key: "counter"}, [
    html.button({
      key: "decrement",
      onClick: forward(address, asDecrement)
    }, ["-"]),
    html.span({
      key: "value",
      style: counterStyle.value,
    }, [String(model.value)]),
    html.button({
      key: "increment",
      onClick: forward(address, asIncrement)
    }, ["+"])
  ])
