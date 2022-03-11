import { tokenValidator, uRole } from '../server/middleware/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default ({repo}, app) => {
  const jwtOptions = { expiresIn: '240d' }
// USER routes:
// Email Confirmation:
  app.get('/api/user/email/:token', (req,res) => {
    const { token } = req.params
    // Check token
    // Response => token
  })

// Get User:
  app.get('/api/user', tokenValidator, ( req,res ) => {
  // Call DB:
    const { email,uid } = req.decoded
    res.promise( repo.fetchOne('*','user',{uid}).then( ([data]) => {
      if(!data) return Promise.reject( new Error('No data...') )
      const {role,username,userlast,bday,gender,language,credit,rating,fb_id,crowdfund_id,verified} = data
      return Object.assign({},{role,username,userlast,bday,gender,language,credit,rating,fb_id,crowdfund_id,verified})
    }))
  })
// Check User:
  app.get('/api/check/:email', ( req,res ) => {
  // Call DB:
    const { email } = req.params
    res.promise( repo.fetchOne(['username'],'user',{email})
    .then( results => {
        if(results.length) {
          const [data] = results
          return Object.assign({},{username: data.username},{ checked: true, free: false, message: 'This email is in use. Have a Password?' })
        }
        return { checked: true, free: true, message: 'Email is free for use. Insert a Password, please!' }
      })
    )
  })

/* === Handle User Signup, Auth, Login ============================== */
// MAKE a USER
// SignUp => Auth-token:
  app.post('/api/user/auth', uRole, (req,res) => {
    const { email,password } = req.body.credentials
    const { role } = req
    let user = Object.assign({},{email,password,role})
    console.log(user)
  // Validate user data:
    const validate = req.container.cradle.validate
    validate(user,'user')
  // Make a hash:
      .then( user => bcrypt.hash(password, 10) )
      .then( hash => repo.insertOne('user',{...user, password: hash}) )
      .then( () => res.promise(repo.fetchOne('*','user',{email}).then( ([data]) => {
          if(!data) return Promise.reject( new Error('Apologies: DB lost that User :(') )
          const { authTokenSecret:SECRET } = req.container.resolve('serverSettings')
          const {uid,email,role} = data
          return jwt.sign({email, uid, role}, SECRET, jwtOptions, (err,token) => {
            return ({...data, auth: token, new_user: false})
          })
        })
      ))
  // Error Handling:
      //.catch( error => {
      //  Promise.reject(createError(500))
      //})
  })

// OLD USER : NO AUTH-TOKEN
// Full Login: Check credentials => auth-token
  app.post('/api/user/login', (req,res) => {
    const { email,password } = req.body.credentials
  // Login: Check user exist => {user: auth.token, data: user.data}
    res.promise( repo.fetchOne('*','user',{email})
      .then(([data]) => {
        if(!data) return Promise.reject( new Error('No user found!') )
        const { password:hash, } = data
        return bcrypt.compare(password,hash)
        .then((result) => {
            if(!data || !result) return Promise.reject(new Error('Wrong Credentials!'))

            const { authTokenSecret:SECRET } = req.container.resolve('serverSettings')
            const {uid,email,role} = data

            const token = jwt.sign({email, uid, role}, SECRET, jwtOptions)
            return ({...data, auth: token, new_user: false})

        })
      })
    )

    // Call DB:
      //repo.createUser()
    // HTTP response:
  })
}








/*
email: 'mundrov@mail.com',
  password: '$2b$10$ML6xPfqvLqH9rvOEX3X0gOrMfdyhOMnn3kYaaWfyVj0yAJM7vhPRe',
  role: 256,
  token: null,
  uid: 4,
  verified: 0,
  status: 1,
  username: null,
  userlast: null,
  bday: null,
  gender: null,
  language: null,
  created_at: 2022-02-25T12:41:26.000Z,
  lastlog: 2022-02-25T12:41:26.000Z,
  credit: 10,
  rating: null,
*/
