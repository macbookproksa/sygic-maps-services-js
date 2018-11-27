function that (predicate, message) {
  return function (value) {
    if (predicate(value)) {
      return value
    }
    throw new Error(message)
  }
}

function thatNum (predicate, message) {
  return function (value) {
    if (predicate(value)) {
      return Number(value) ? Number(value) : value
    }
    throw new Error(message)
  }
}

export function construct (validators) {
  return function (value) {
    let result = value

    validators.forEach(validate => {
      result = validate(value)
    })

    return result
  }
}

export let number = that(function (value) {
  return typeof value === 'number'
}, 'Not a number.')

export let positiveNumber = that(function (value) {
  return (typeof value === 'number' && value >= 0)
}, 'Not a number.')

export let string = that(function (value) {
  return typeof value === 'string'
}, 'Not a string.')

export let bool = construct([
  that(function (value) {
    return typeof value === 'boolean'
  }, 'Not a boolean.'),
  function (value) {
    return value ? value : undefined
  }
])

export let latitude = thatNum(function (value) {
  return value.toString().match(/^([+\-])?(?:90(?:(?:\.0{1,23})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,23})?))$/)
}, 'Invalid latitude. Valid range of latitude in degrees is -90 and +90.')

export let longitude = thatNum(function (value) {
  return value.toString().match(/^([+\-])?(?:180(?:(?:\.0{1,23})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,23})?))$/)
}, 'Invalid longitude. Valid range of latitude in degrees is -180 and +180.')

export let dateTimeISO8601 = that(function (value) {
  return value.toString().match(/^(19|20)\d\d[-](0[1-9]|1[0-2])[-](0[1-9]|[1|2][0-9]|3[0-1])[T](0[0-9]|1[0-9]|2[0-3])[:](0[0-9]|[1-5][0-9])[:](0[0-9]|[1-5][0-9])$/)
}, 'Invalid date. Valid datetime format is "yyyy-MM-ddTHH:mm:ss".')

export let time = that(function (value) {
  return value.toString().match(/^(0[0-9]|1[0-9]|2[0-3])[:](0[0-9]|[1-5][0-9])[:](0[0-9]|[1-5][0-9])$/)
}, 'Invalid date. Valid datetime format is "HH:mm:ss".')

export function regex (statement) {
  let regex = statement

  return function (value) {
    if (value.toString().match(regex)) {
      return value
    }

    throw new Error(`Invalid value. Not one of ${ statement }`)
  }
}

export function numberRange (min, max) {
  return function (value) {
    let num = number(value)

    if (num >= min && num <= max) {
      return num
    } else {
      throw new Error(`Number must be between ${ min } and ${ max }.`)
    }
  }
}

export function optional (validator) {
  return function (value) {
    return (value === undefined) ? value : validator(value)
  }
}

export function object (propValidators) {
  return function (object) {
    let result = {}

    if (!object || typeof object !== 'object') {
      throw new Error('Not an Object')
    }

    for (let key in propValidators) {
      if (!propValidators.hasOwnProperty(key)) {
        continue
      }

      let validator = propValidators[key]
      let valid = undefined

      try {
        valid = validator(object[key])
      } catch (error) {
        if (key in object) {
          throw new Error(`In property "${ key }": ${ error }`)
        } else {
          throw new Error(`Missing property "${ key }"`)
        }
      }

      if (valid !== undefined) {
        result[key] = valid
      }
    }

    for (let key in object) {
      if (!object.hasOwnProperty(key)) {
        continue
      }

      if (!propValidators[key]) {
        throw new Error(`Unexpected property "${ key }"`)
      }
    }

    return result
  }
}

export function array (validator) {
  return function (array) {
    if (Object.prototype.toString.call(array) !== '[object Array]') {
      throw new Error('Not an Array')
    }

    return array.map((item, index) => {
      try {
        return validator(item)
      } catch (error) {
        throw new Error(`At index ${ index }: ${ error }`)
      }
    })
  }
}

export function coordinates (validator) {
  return function (value) {
    if (!value) {
      throw new Error('Invalid coordinates')
    }

    return Object.values(validator(value)).join(',')
  }
}

export function waypoints (validator) {
  return function (value) {
    if (!value) {
      throw new Error('Invalid coordinates')
    }

    let object = validator(value)

    return `${ object.isVia ? 'via:' : '' }${ object.lat },${ object.lng },${ object.stopTime ? object.stopTime : '0' }`
  }
}

export function oneOf (names) {
  let myObject = {}
  let quotedNames = []

  names.forEach(function (name) {
    myObject[name] = true
    quotedNames.push(`"${ name }"`)
  })

  return function (value) {
    if (myObject[value]) {
      return value
    }

    throw new Error(`Not one of ${ quotedNames.join(', ') }`)
  }
}

export function mutuallyExclusive (names) {
  return function (value) {
    if (!value) {
      return value
    }

    let present = []

    names.forEach(function (name) {
      if (name in value) {
        present.push(`"${ name }"`)
      }
    })

    if (present.length > 1) {
      throw new Error(`Cannot specify properties ${ present.slice(0, -1).join(', ') } and ${ present.slice(-1) } together`)
    }

    return value
  }
}

export function together (names) {
  return function (value) {
    if (!value) {
      return value
    }

    let present = []

    names.forEach(function (name) {
      if (name in value) {
        present.push(`"${ name }"`)
      }
    })

    if (present.length !== 0 && present.length !== names.length) {
      throw new Error(`Specify properties ${ names.join(', ') } together`)
    }

    return value
  }
}

export function pipedArrayOf (validateItem) {
  let validateArray = array(validateItem)
  return function (value) {
    let result = validateArray(value)
    return result.join('|')
  }
}

export function semicolonArrayOf (validateItem) {
  let validateArray = array(validateItem)
  return function (value) {
    let result = validateArray(value)
    return result.join(';')
  }
}

export function stringArrayOf (validateItem) {
  let validateArray = array(validateItem)
  return function (value) {
    return validateArray(value)
  }
}