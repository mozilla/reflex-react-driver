/* @flow */

/*:: import * as type from "../type/array-find" */

export const find/*:type.find*/ = Array.prototype.find != null ?
  (array, p) => array.find(p) :
  (array, p) => {
    let index = 0
    while (index < array.length) {
      if (p(array[index])) {
        return array[index]
      }
      index = index + 1
    }
  }
