import express from 'express'
import bodyparser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import createError from 'http-errors'

import { promiseWraper } from './middleware/index.js'
import _api from '../api/index.js'

const start = (container) => {
  return new Promise( (resolve,reject) => {
  // Check for DI:
    if(typeof container.resolve !== 'function') {
      reject(new Error('CONTAINER missing ...'))
    }
    const repo = container.resolve('repo')
    const { port,gateway } = container.resolve('serverSettings')

    if(!repo){
      reject(new Error('REPO is missing ...'))
    }
    if(!port){
      reject(new Error('PORT is missing ...'))
    }

// ======================================================
// Express App Server:

    const app = express()
    //app.set('trust proxy', '172.17.0.1')
    //app.use(bodyparser.urlencoded({ extended: true }))
    app.use(bodyparser.json())
    app.use(express.urlencoded({ extended: true } ))
  // Parse request body:
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((req,res,next) => {
      res.header("Access-Control-Allow-Origin", `${gateway}`)
      res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept")
      next()
    })
// Default error handling:
    app.use(promiseWraper())
    app.use(( err,req,res,next ) => {
      res.promise(Promise.reject(err))
    })
  // Check user-authentication:
    //app.use(( req,res,next ) => {
    //  // Check User middleware:
    //  next()
    //})

  // Attach Dependencies to requiest:
  // Create Parent Scope for future User-state:
    app.use(( req,res,next ) => {
      req.container = container.createScope()
      next()
    })

  // Provide API with Repo-Controlers:
    const tmlnAPI = _api.tmln_api.bind(null,{repo})
    const usrAPI = _api.usr_api.bind(null,{repo})

  // Inversion of Control
  // Provide API with Application Server
    usrAPI(app)
    tmlnAPI(app)

  // Error handling:
    app.use(( err,req,res,next ) => {
      //reject(new Error('!Some application error: ',err))
      res.status(500).json({error: {global: err.message}})
      next()
    })

    const server = app.listen(port, () => {
      resolve(server)
    })
  })
}

export default Object.assign({}, { start })
