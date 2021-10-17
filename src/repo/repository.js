const repository = container => {

  const { database: db } = container.cradle

  return {
    getOne: ( data,table,scope ) => {

      const sql = `SELECT * FROM ${table}`

      return new Promise( (resolve,reject) => {
        db.query(sql, (err,results) => {
          if(!err) {
            console.log(results)
            resolve(results)
          } else {
            reject(err)
          }
        })
      })
    },

    getCollection: () => {},

    saveOne: () => {},

    disconnect: () => {
      db.release()
    }
  }
}

const connect = container => {
  return new Promise( (resolve,reject)=>{
    resolve(repository(container))
  } )
}

export default Object.assign({},{connect})
