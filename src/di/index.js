import { serverSettings, dbSettings } from './config/index.js'
import initDI from './di.js'
import database from '../db/index.js'

console.log('ServerSettings: ',serverSettings)

const init = initDI.bind(null,{ serverSettings,dbSettings,database })

export default Object.assign({},{ init })
