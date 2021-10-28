import express from 'express'
import bodyparser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'

import _api from '../api/index.js'


const start = (container) => {
  return new Promise( (resolve,reject) => {
    if(typeof container.resolve !== 'function'){
      reject(new Error('CONTAINER ain\'t a function ...'))
    } else {
      const { port } = container.resolve('serverSettings')
      const repo = container.resolve('repo')
    }

    if(!repo || !port){
      reject(new Error('REPO or PORT is missing ...'))
    }

    const app = express()
  // Parse request body:
    app.use(morgan('dev'))
    app.use(bodyparser.json())
    app.use(helmet())
  // Error handling:
    app.use(( err,req,res,next ) => {
      reject(new Error('!Some application error: ',err))
      res.status(500).send('Something went wrong', err)
      next()
    })
  // Check user-authentication:
    app.use(( req,res,next ) => {
      // Check User middleware:
      next()
    })
  // Check user-authorized:
    app.use(( req,res,next ) => {
      // Check User middleware:
      next()
    })

  // Attach Dependencies to requiest:
  // Create Parent Scope for future User-state:
    app.use(( req,res,next ) => {
      req.container = container.createScope()
      next()
    })

    const tmlnAPI = _api.tmln_api.bind(null,{repo})
    const usrAPI = _api.usr_api.bind(null,{repo})
    usrAPI(app)
    tmlnAPI(app)

    const server = app.listen(port, () => {
      resolve(server)
    })
  })
}

export default Object.assign({}, { start })
