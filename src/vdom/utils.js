
const isType = type => value => {
  return typeof value === type
}

export const isNumber = isType('number')
export const isBoolean = isType('boolean')
export const isString = isType('string')
export const isObject = isType('object')

export const isNagetive = v => v === undefined || v === null

export const plainStyleObj = o => Object.keys(o).map(key => `${key}:${o[key]}`).join(';')
