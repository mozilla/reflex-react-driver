/* @flow */

// Recat@0.14 uses different API for elemnets, custom value for `$$typeof`
// field is used to signify that instance implement Element interface.
// See: https://github.com/facebook/react/blob/master/src/isomorphic/classic/element/ReactElement.js#L18-L22
export const reactElementType = (typeof(Symbol) === 'function' && Symbol.for != null) ?
  Symbol.for('react.element') :
  0xeac7
