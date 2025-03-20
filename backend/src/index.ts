import express from "express"

const app = express()

const PORT = 3000;

app.get('/',(req,res)=>{
  res.send("hello welcome")
})

app.listen(PORT,()=>{
    console.log(`Running on port: http://localhost:${PORT}`)
})