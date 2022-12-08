import express from 'express'
import apiRouter from './routes/apiroutes'
import dotenv from 'dotenv'
import { connectDB }from './config/db'
import path from 'path'

dotenv.config({path: path.join(path.resolve() + '/src/config/.env')})

connectDB()

console.log(process.env.CLOUD_NAME, process.env.CLOUD_API_KEY, process.env.CLOUD_API_SECRET)

const app = express()
const PORT = process.env.PORT || 2000

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/views'))



app.use('/api', apiRouter)

app.get('/', (req, res): void => {

res.render('index')
})
app.get('/submit', (req, res): void => {

res.render('submit')
})


app.listen(PORT, () => {
    console.log('listening')
})