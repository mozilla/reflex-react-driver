/* @flow */

export type JSONValue
  = string
  | number
  | void
  | {[key:string]: JSONValue}


export type Response = {
  status: number,
  statusText: string,
  json: ()=> Promise<JSONValue>
}

export type fetch = (uri:string) => Promise<Response>
