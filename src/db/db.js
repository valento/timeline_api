import mysql from 'mysql2'

export const connect = (options,mediator) => {
  //const mydb = mysql.createPool(options)
  console.log(options)

  mediator.once('boot.ready', () => {
    const mydb = mysql.createPool(options)

    mydb.on('connection', () => { console.log('DB Pool oppened') })
    mydb.on('release', () => { console.log('DB Pool closed') })

    mydb.getConnection((err,connection) => {
      if(err) {
        mediator.emit('db.error', err)
      } else {
        mediator.emit('db.ready', connection)
      }
    })

  })

}
