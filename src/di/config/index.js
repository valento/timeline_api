import dotenv from 'dotenv'
dotenv.config({silent:true})

export const serverSettings = {
  port: process.env.SERVER_PORT || 8000,
  gateway: process.env.NODE_ENV === 'production'? process.env.API_GATEWAY : '*',
  ssl: null,
  authTokenSecret: process.env.AUTH_SECRET
}

export const dbSettings = {
  host: process.env.DB_HOST || 'localhost',
  database: process.env.NODE_ENV === 'development'? process.env.DB_DEV_NAME : process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  user: process.env.NODE_ENV === 'development'? process.env.DB_DEV_USER : process.env.DB_USER,
  password: process.env.NODE_ENV === 'development'? process.env.DB_DEV_PASS : process.env.DB_PASS
}
