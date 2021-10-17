import { createContainer,asValue } from 'awilix'

// CREATE DEPENDENCIES Object: db,models,services:

export default ({ serverSettings,dbSettings,database }, mediator) => {

  mediator.once('init', () => {
  // create dependencies Container object:
    mediator.on('db.ready', db => {
      const container = createContainer()

      container.register({
        database: asValue(db),
        serverSettings: asValue(serverSettings)
      })

      mediator.emit('di.ready', container)
    })

  // DB error handling:
    mediator.on('db.error', err => { mediator.emit('di.error') })

  // CONNECT MYSQL DB:
    database.connect( dbSettings,mediator )

  // Initiate reboot -> DB createsPool:
    mediator.emit('boot.ready')
  })


}
