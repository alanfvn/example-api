import express from "express"
import { getUserData } from '../database/db-man'
import { verifyToken } from "../jwt/jwt-man"

const urouter = express.Router()

urouter.use((req, res, next)=>{
  const token = `${req.header('Authorization')?.replace('Bearer ', '')}`
  const payload = verifyToken(token)
  if(!payload){
    res.status(403).send("Token invalido")
    return
  }
  req.body.payload = (payload as any).username;
  next()
})

urouter.get('/info', async (req, res)=>{
  const {payload} = req.body || {}
  const data = await getUserData(payload);
  res.json(data?.rows)
})

export default urouter
