const repository = container => {

  const { database: db } = container.cradle
  let query, conditions, inserts

// Construct query:
  const queryPlaceholders = (params) => {
    let _placeholders = params.map( i => '?')
    return _placeholders
  }
  const queryConditions = (params={}) => {
    let _condition = Object.keys(params).map( p => `${p}=?`)
    return _condition
  }
  const valuesArray = (data={}) => {
    let values = Object.keys(params).map( p => `${p}=?`)
    return _condition
  }

// Expose Object with Controlers:
  return {
    // SELECT [*] FROM [table] WHERE [condition1 {AND} condition2];
    // SELECT one,two FROM [table] WHERE a=b AND c=d;
    fetchOne: ( scope='*',table='',params={} ) => {
  // Exit if not table provided:
      if( !table.length ) return Promise.reject(new Error('Missing DB-table...'))
  // Format conditions:
      if(Object.keys(params).length || Object.keys(params).length>1) {
        conditions = (' WHERE ').concat(queryConditions(params).join(' AND '))
      } else {
        conditions = Object.keys(params).length ? (' WHERE ').concat(`${Object.keys(params)[0]}=?`) : ''
      }

      query = `SELECT ${scope} FROM ${table}${conditions};`
console.log(query)

      return new Promise( (resolve,reject) => {
        db.query(query, Object.values(params), (err,result) => {
          if(err) reject(new Error(`DB error: ${err}`))
          resolve(result)
        })
      })

    },

    getCollection: (scope='*',table='',params={}) => {
  // Exit if not table provided:
      if( !table.length ) return

      query = `SELECT ${scope} FROM ${table} WHERE ${(typeof condition !== 'string') ? condition.join(' AND ') : condition}`

      return new Promise( (resolve,reject) => {
        db.query(table, (err,results) => {
          if(err) reject(err)
          resolve(result)
        })
      })

    },

    insertOne: (table='',data={}) => {
      console.log('DB API input: ', data)
  // Exit if not table provided:
      if( !table.length || !Object.keys(data).length ) return
      const input = new Array(Object.keys(data).length).fill('?')

      query = `INSERT INTO ${table} (${Object.keys(data)}) VALUES (${input})`
console.log(query)
      return new Promise( (resolve,reject) =>{
        db.query(query,Object.values(data), (err,result) => {
          if(err) reject(new Error(`DB Error: ,${err}`))
          resolve()
        })
      })
    },

    disconnect: () => {
      db.release()
    }
  }
}

const connect = container => {
  return new Promise( (resolve,reject)=>{
    resolve(repository(container))
  })
}

export default Object.assign({},{connect})
