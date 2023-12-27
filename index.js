import express from 'express'
import bookRoutes from './src/routes/index.js'

const app = express()
app.use(express.json())
app.use('/',bookRoutes)
app.listen(8000,()=>console.log(" Server listening to port 8000"))