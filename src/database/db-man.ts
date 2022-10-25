import {Client} from 'pg'

function getClient(){
  const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
  return client
}

async function login(user: string, pass: string){
  const client = getClient()
  let data 
  try{
    await client.connect()
    data = await client.query("select * from autenticar($1, $2)", [user, pass])
  }catch(e){
    console.log(`Login error: ${e}`)
  }finally{
    await client.end()
  }
  return data?.rows[0]["autenticar"]
}

async function getUserData(user: string){
  const client = getClient()
  let data
  try{
    await client.connect()
    data = await client.query('select * from tb_usuario where usuario = $1', [user])
  }catch(e){
    console.log(`Get data error: ${e}`)
  }finally{
    await client.end()
  }
  return data
}

export {login, getUserData}
