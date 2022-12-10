import express from 'express'
import apiRouter from './routes/apiroutes'
import dotenv from 'dotenv'
import { connectDB }from './config/db'
import path from 'path'
import mainRouter from './routes/mainroutes'

dotenv.config({path: path.join(path.resolve(__dirname + '/config/.env')  )})

connectDB()

const app = express()
const PORT = process.env.PORT || 2000

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// app.use((req,res, next) => {
//     console.log(`${req.method}: ${req.url}`)
//     next()
// })

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/views'))

app.use(express.static(__dirname + '/public'))




app.use('/', mainRouter )
app.use('/api', apiRouter)


process.env.NODE_ENV === 'development' ? console.log('App is in DEVELOPMENT mode') : console.log('App is in PRODUCTION mode')

app.listen(PORT, () => {
    console.log('listening on port ' + PORT )
})