/* @flow */

import {reactElementType} from "./core"
import {empty} from "blanks/lib/array"
import {blank} from "blanks/lib/object"

/*::
import * as type from "../type"
import * as DOM from "reflex/type/dom";
import * as Driver from "reflex/type/driver"
import type {Address} from "reflex/type/signal";

type RenderTarget = Node & Element & HTMLElement;
type Configuration = {target: RenderTarget};
*/



/*::
export type View = (...args:Array<any>) => DOM.VirtualTree
type ThunkProps = {
  key: string;
  view: View;
  args: Array<any>;
}
*/

export class ThunkNode {
  /*::
  $type: "Thunk";
  key: type.Key;


  // Recat
  type: NamedThunk;

  // react@1.4
  $$typeof: symbol|number;

  // React@10.3
  _isReactElement: boolean;
  _store: type.Store<ThunkProps>;


  props: ThunkProps;
  originalProps: ThunkProps;
  */
  constructor(key/*:string*/, NamedThunk/*:NamedThunk*/, view/*:View*/, args/*:Array<any>*/) {
    const props = {key, view, args}

    // React
    this.key = key
    this.type = NamedThunk

    // React@0.14
    this.$$typeof = reactElementType
    this.props = props

    // React@0.13
    this._isReactElement = true
    this.originalProps = props
    this._store = this
  }
}

const redirect = (addressBook, index) =>
  action => addressBook[index](action);

// Thunk implements React.Component interface although it's comprised of
// view function and arguments to bassed to it vs a subclassing and passing
// props. It represents subtree of the virtual dom that is computed lazily
// & since computation function and input is packed with this type it provides
// an opportunity to skip computation if two thunks are packagings of same
// view and args.
// Based on: https://github.com/facebook/react/blob/master/src/isomorphic/modern/class/ReactComponent.js
/*::
type ThunkState = {
  args: Array<any>;
  addressBook: Array<Function>;
};
type NamedThunk = SubClass<Thunk, *>;
*/
export class Thunk {
  /*::
  // Reflex keeps track of number of mounts as Thunk's are cached
  // by a displayName.
  static mounts: number;
  // Reflex stores currently operating `view` function into `Thunk.context`
  // in order to allow memoization functions to be contextual.
  static context: ?View;

  // React devtools presents information based on `displayName`
  static displayName: string;

  // React component
  props: ThunkProps;
  state: ThunkState;

  context: any;
  refs: any;
  updater: any;
  */
  constructor(props/*:ThunkProps*/, context/*:any*/, updater/*:any*/) {
    this.props = props
    this.context = context
    this.refs = blank
    this.updater = updater

    this.state = {addressBook: [], args: []}
  }
  static withDisplayName(displayName/*:string*/) {
    class NamedThunk extends Thunk {
      /*::
      static mounts: number;
      */
    }
    NamedThunk.displayName = displayName
    NamedThunk.mounts = 0
    return NamedThunk
  }
  componentWillMount() {
    // Increase number of mounts for this Thunk type.
    ++this.constructor.mounts

    const {addressBook, args} = this.state
    const {args: input} = this.props
    const count = input.length

    let index = 0
    while (index < count) {
     const arg = input[index]
     if (typeof(arg) === 'function') {
       addressBook[index] = arg
       args[index] = redirect(addressBook, index)
     } else {
       args[index] = arg
     }
     index = index + 1
    }
  }
  shouldComponentUpdate(props/*:ThunkProps*/, _/*:ThunkState*/)/*:boolean*/{
    const {key, view, args: passed} = props

    if (profile) {
      console.time(`${key}.receive`)
    }

    const {args, addressBook} = this.state

    const count = passed.length
    let index = 0
    let isUpdated = this.props.view !== view;

    if (args.length !== count) {
      isUpdated = true
      args.length = count
      addressBook.length = count
    }

    while (index < count) {
      const next = passed[index]
      const arg = args[index]

      if (next !== arg) {
        const isNextAddress = typeof(next) === 'function'
        const isCurrentAddress = typeof(arg) === 'function'

        if (isNextAddress && isCurrentAddress) {
          // Update adrress book with a new address.
          addressBook[index] = next
        } else {
          isUpdated = true

          if (isNextAddress) {
            addressBook[index] = next
            args[index] = redirect(addressBook, index)
          } else {
            args[index] = next
          }
        }
      }

      index = index + 1
    }

    if (profile) {
      console.timeEnd(`${key}.receive`)
    }

    return isUpdated
  }
  render()/*:DOM.VirtualTree*/ {
    if (profile) {
      console.time(`${this.props.key}.render`)
    }

    const {args} = this.state
    const {view, key} = this.props

    // Store current context and change current context to view.
    const context = Thunk.context
    Thunk.context = view

    const tree = view(...args)

    // Restore previosu context.
    Thunk.context = context

    if (profile) {
      console.timeEnd(`${key}.render`)
    }

    return tree
  }
  componentWillUnmount() {
    // Decrement number of mounts for this Thunk type if no more mounts left
    // remove it from the cache map.
    if (--this.constructor.mounts === 0) {
      delete thunkCacheTable[this.constructor.displayName];
    }
  }

}

// Following symbol is used for cacheing Thunks by an associated displayName
// under `React.Component[thunks]` namespace. This way we workaround reacts
// remounting behavior if element type does not match (see facebook/react#4826).
export const thunks = (typeof(Symbol) === "function" && Symbol.for != null) ?
  Symbol.for("reflex/thunk/0.1") :
  "reflex/thunk/0.1";

// Alias cache table locally or create new table under designated namespace
// and then alias it.
/*::
type ThunkTable = {[key: string]: NamedThunk};
*/
const thunkCacheTable /*:ThunkTable*/ = global[thunks] != null ? global[thunks] :
                                        (global[thunks] = Object.create(null));


let profile

export const thunk/*:type.thunk*/ = (key, view, ...args) => {
  const name = key.split("@")[0];
  const type = thunkCacheTable[name] != null ? thunkCacheTable[name] :
               (thunkCacheTable[name] = Thunk.withDisplayName(name));

  return new ThunkNode(key, type, view, args);
};
