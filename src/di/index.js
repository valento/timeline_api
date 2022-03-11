import { serverSettings, dbSettings } from './config/index.js'
import initDI from './di.js'
import database from '../db/index.js'
import models from '../models/index.js'

const init = initDI.bind(null,{ serverSettings,dbSettings,database,models })

export default Object.assign({},{ init })
