/* @flow */

import * as Signal from "reflex/type/signal"
import * as VirtualDOM from "reflex/type/dom"
import * as Driver from "reflex/type/driver"


export type Store <Props> = {
  props: Props;
  originalProps: Props;
}

export type NodeChildren
  = Array<VirtualDOM.VirtualTree>
  | VirtualDOM.VirtualTree

export type NodeProps
  = VirtualDOM.PropertyDictionary
  & {children: ?NodeChildren}


export type Address <message>
  = Signal.Address <message>
  & {reflexEventListener?: EventHandler}

export type AddressBook <message> = Signal.AddressBook <message>
export type redirect <message>
  = (addressBook:AddressBook<message>, index:number) => Address<message>

export type Key = VirtualDOM.Key
export type TagName = VirtualDOM.TagName
export type AttributeDictionary = VirtualDOM.AttributeDictionary
export type StyleDictionary = VirtualDOM.StyleDictionary
export type PropertyDictionary = VirtualDOM.PropertyDictionary
export type VirtualNode = VirtualDOM.VirtualNode
export type VirtualText = VirtualDOM.VirtualText
export type Text = VirtualDOM.Text
export type VirtualTree = VirtualDOM.VirtualTree
export type Thunk = VirtualDOM.Thunk
export type View = VirtualDOM.View
export type text = Driver.text
export type node = Driver.node
export type thunk = Driver.thunk
