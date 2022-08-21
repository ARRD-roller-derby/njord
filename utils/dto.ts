import validator from 'validator'

function sanitizeString(value: string): string | boolean {
  return  validator.escape(value || '')
}

export default function dto<T>(dto: Object, obj: T): undefined | T {
  let count = 0
  const objKeys = Object.keys(dto),
    newObj = { ...obj }

  //delete unused key
  Object.keys(obj).forEach((key) => {
    if (!dto.hasOwnProperty(key)) {
      delete newObj[key]
    }
  })

  objKeys.forEach((key) => {
    //False if one or more required key is not in obj
    if (dto[key].hasOwnProperty('isRequired')) {
      if (!newObj.hasOwnProperty(key)) {
        count++
      }
    }

    //exemple email: 'string'
    if (typeof dto[key] === 'string') {
      if (dto[key] === 'array') {
        if (!Array.isArray(newObj[key])) {
          count++
        }
      } else if (dto[key] !== typeof newObj[key] && newObj[key]) {
        count++
      }

      if (dto[key] === 'string' && dto[key] !== undefined ) {
        newObj[key] = sanitizeString(newObj[key])
      }
    }
    // exemple email : {type:'string',isRequired:true}
    else {
      if (!dto[key].hasOwnProperty('type')) {
        count++
      }
      if (dto[key].type !== typeof newObj[key]) {
        count++
      }

      if (dto[key].type === 'string') {
        newObj[key] = sanitizeString(newObj[key])
      }
    }
  })
  return count ? undefined : newObj
}
