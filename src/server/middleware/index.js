import jwt from 'jsonwebtoken'

// Test and Decode Authorization token
export const tokenValidator = ( req,res,next ) => {
  const token = req.get('Authorization')
  const { authTokenSecret:secret } = req.container.resolve('serverSettings')

  if(!token) {
    return next( new Error('Missin\' token...') )
  } else {
    try {
      const decode = jwt.verify(token, secret, (err,decoded) => {
          if(err) {
            console.log(err)
            return next( new Error('Unauthorized request...'))
          } else {
            req.decoded = decoded
            return next()
          }
      })
    }
    catch (e) { next(e) }
  }
}

export const handleErr = ( res, err={} ) => { res.status(err.status || 500).json({ errors: { global: err.message } }) }

export const handleRes = ( res, data ) => { res.status(200).json( data ) }

export const promiseWraper = () => ( req,res,next ) => {
  console.log('Promise Wrapper!')
  res.promise = p => {
    let solve
    if( p.then && p.catch ){
      console.log('Middleware fire a Promise')
      solve = p
    }
    else if( p === 'function' ) {
      console.log('Middlware fire a function')
      solve = Promise.resolve().then(() => p())
    }
    else { solve = Promise.resolve(p) }

    return solve
      .then( data => handleRes(res, data) )
      .catch( err => handleErr(res, err) )
  }
  return next()
}

// Assign role to user:
export const uRole = (req,res,next) => {
  const { email } = req.body.credentials
  switch (email) {
    case email.match(/^tester./).input:
      req.role = 64
    break
    case email.match(/^baker./).input:
      req.role = 8
    break
    default: req.role = 256
  }
  next()
}

//export default Object.assign({},{tokenValidator})
