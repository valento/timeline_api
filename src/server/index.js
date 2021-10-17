import express from 'express'
import bodyparser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'

import tmln_api from '../api/timeline/index.js'

const start = (container) => {
  return new Promise( (resolve,reject) => {

    const { port } = container.resolve('serverSettings')
    const repo = container.resolve('repo')

    if(!repo){
      reject(new Error('Server needs DB-API! No repository ...'))
    }
    if(!port){
      reject(new Error('Server needs PORT! No port available ...'))
    }

    const app = express()
  // Parse request body:
    app.use(morgan('dev'))
    app.use(bodyparser.json())
    app.use(helmet())
  // Error handling:
    app.use(( err,req,res,next ) => {
      reject(new Error('!Some err: ',err))
      res.status(500).send('Something went wrong', err)
      next()
    })
  // Check user-authentication:
    app.use(( req,res,next ) => {
      // Check User middleware:
    })
  // Check user-authorized:
    app.use(( req,res,next ) => {
      // Check User middleware:
    })

  // Attach Dependencies to requiest:
  // Create Parent Scope for future User-state:
    app.use(( req,res,next ) => {
      req.container = container.createScope()
      next()
    })

    const api = tmln_api.bind(null,{repo})
    api(app)

    const server = app.listen(port, () => {
      resolve(server)
    })
  })
}

export default Object.assign({}, { start })
