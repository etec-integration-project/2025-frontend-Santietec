import {config} from 'dotenv'
import crypto from 'crypto'

config()

export const PORT = process.env.PORT || 3000

export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_PORT = process.env.DB_PORT || 3306
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASS = process.env.DB_PASSWORD || 'secret'   
export const DB_NAME = process.env.DB_NAME || 'pelisdb'
export const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex')