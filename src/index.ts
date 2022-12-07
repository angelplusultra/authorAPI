import express from 'express'
import apiRouter from './routes/apiroutes'
import dotenv from 'dotenv'
import { connectDB }from './config/db'

dotenv.config({path: './src/config/.env'})

connectDB()

console.log(process.env.CLOUD_NAME, process.env.CLOUD_API_KEY, process.env.CLOUD_API_SECRET)

const app = express()
const PORT = process.env.PORT || 2000

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use('/api', apiRouter)

app.get('/', (req, res): void => {
    console.log('working')

})


app.listen(PORT, () => {
    console.log('listening')
})