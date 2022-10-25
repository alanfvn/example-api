import express from "express"
import { login } from '../database/db-man'
import { createToken } from "../jwt/jwt-man"

const auth_router = express.Router()

auth_router.post('/login', async (req, res)=>{
  const {user, password} = req.body || {}
  const data = await login(user, password)

  if(!data){
    res.status(400).send("Verifica tus credenciales por favor.")
    return
  }
  const token = createToken(user)
  res.json({access_token: token})
})


export default auth_router
