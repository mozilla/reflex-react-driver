/* @flow */

import {reactElementType} from "./core"
import {empty} from "blanks/lib/array"
import {blank} from "blanks/lib/object"

/*::
import * as type from "../type"
*/

// VirtualNode implements same interface as result of `React.createElement`
// but it's strictly for DOM elements. For thunks a.k.a components (in react
// vocabulary) we will have a different type.
export class VirtualNode {
  /*::
  // Refelx VirtualNode type interface
  $type: "VirtualNode";
  key: ?type.Key;
  tagName: type.TagName;
  namespace: ?string;
  children: Array<type.VirtualTree>;

  // React
  // VirtualNode is exclusively represents virtual HTML nodes as thunks
  // a.k.a components (in react vocabulary) have their own type.
  type: string;

  // Interface of React@0.13 defines `_isReactElement` to signify that object
  // implement element interface.
  _isReactElement: boolean;
  _store: type.Store<type.NodeProps>;

  // In react@1.4
  $$typeof: symbol|number;
  props: type.NodeProps;

  // VirtualNode implements interface for several react versions, in order
  // to avoid extra allocations instance is also used as `_store` to support
  // 0.13 and there for we denfine `originalProps` to comply to the store
  // interface.
  originalProps: type.NodeProps;

  // Note _owner & ref fields are not used and there for ommited.
  */
  constructor(tagName/*:string*/, namespace/*:?string*/, props/*:type.NodeProps*/, children/*:Array<type.VirtualTree>*/) {
    // reflex
    this.tagName = tagName
    this.namespace = namespace
    this.key = props.key == null ? null : String(props.key)

    const count = children.length
    let index = 0
    while (index < count) {
      const child = children[index]


      if (typeof(child) === "string") {
        // It is important to check for string type first cause there is no
        // guarantee that `String.prototype.$type` may
        // (see facebook/flow#957)
      } else if (child.$type === "VirtualText") {
        children[index] = child.text
      } else if (child.$type === "LazyTree") {
        children[index] = child.force()
        index = index - 1
      }


      index = index + 1
    }

    this.children = children


    // React
    this.type = tagName
    // Unbox single child otherwise react will wrap text nodes into
    // spans.
    props.children = children.length === 1 ? children[0] :
                     children;

    // React@0.14
    this.props = props
    // Use `this` as `_store` to avoid extra allocation. There for
    // we define additional `originalProps` to implement `_store` interface.
    // We don't actually worry about mutations as our API does not expose
    // props to user anyhow.
    this._store = this
    this.originalProps = props
  }
}
// React@0.14
VirtualNode.prototype.$$typeof = reactElementType
// React@0.13
VirtualNode.prototype._isReactElement = true

export const node/*:type.node*/ = (tagName, properties, children) =>
  new VirtualNode(tagName,
                  null,
                  properties == null ? {children: null} : properties,
                  children == null ? empty : children)
