import dotenv from 'dotenv'
dotenv.config({silent:true})

export const serverSettings = {
  port: process.env.SERVER_PORT || 8000,
  ssl: null
}

export const dbSettings = {
  host: process.env.DB_HOST || 'localhost',
  name: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
}
