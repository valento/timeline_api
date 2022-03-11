import joi from 'joi'
import _user from './user.model.js'

//const user = _user(joi)
//console.log('Model user: ',user)
//const schemas = Object.create({user})//NOT WORKING??
const schemas = Object.assign({},{user:_user(joi)})

const schemaValidator = (object,type) => {
  return new Promise( (resolve,reject) => {

    if( !object ) reject(new Error(`Missing schema data to validate`))
    if( !type ) reject(new Error(`Missing ${type} data to validate`))

    const { error,value } = schemas[type].validate(object)

    if(error) reject(new Error(`Invalid ${type} data`))

    resolve(value)
  })
}

//export default Object.create({validate: schemaValidator, schemas}) NOT WORKING??
export default Object.assign({},{ validate: schemaValidator },{ user: _user(joi) })
