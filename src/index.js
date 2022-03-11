import { asValue } from 'awilix'
import EventEmmiter from 'events'

import di from './di/index.js'
import server from './server/index.js'
import repository from './repo/repository.js'

// Configure an Event Notifier:
const mediator = new EventEmmiter()

// Handle Errors:
process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

// Set Event Emmiter:
mediator.on('di.ready', container => {
  let rep
// init DB-API:
  repository.connect(container)
  .then( repo => {
    rep = repo
// register DB-API in DI-container:
    container.register({
      repo: asValue(repo)
    })
// Start Server with DI-container
    return server.start(container)
  })
  .then( app => {
    app.on('close', () => {
      rep.disconnect()
// or get repo from the container:
      //container.cradle.database.disconnect()
    })
    console.log('Server started on: ', container.cradle.serverSettings.port)
  })
  .catch( err => console.error(err))
})
mediator.on('di.error', err => { console.log('DI failed because of: ', err) })

// REBOOT Application:
di.init(mediator)

mediator.emit('init')
