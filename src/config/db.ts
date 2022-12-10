import mongoose, { mongo } from "mongoose"

export const connectDB = async () => {
    mongoose.set('strictQuery', false)
   const res = await mongoose.connect(process.env.MONGO_URI as string, {dbName: 'AuthorAPI'} )
    console.log(`Connected to the ${res.connection.name}`)
}

