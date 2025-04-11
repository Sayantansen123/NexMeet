import express from "express"
import getUserRouter from "./routes/users.route"
import cors from "cors"
import compression from "compression"
import bodyParser from "body-parser"
import http from "http"

const app = express()

const PORT = 3000;

app.use(cors({
  credentials : true
}))

app.use(compression())
app.use(bodyParser.json())
const server = http.createServer(app)

server.listen(8000,()=>{
  console.log("Started at PORT http://localhost:8000/")
})