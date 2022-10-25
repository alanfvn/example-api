import dotenv from 'dotenv'
dotenv.config()
// express
import express, { Express } from 'express'
import cors from 'cors'
// endpoints
import urouter from './routes/user-route'
import auth_router from './routes/auth-route'

const app: Express = express()
const port = process.env.PORT

// setup
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// endpoints
app.use('/user', urouter)
app.use('/auth', auth_router)
//start
app.listen(port, ()=>{
  console.log(`Running on port ${port}`)
})
