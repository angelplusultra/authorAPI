import mongoose from "mongoose"

export const connectDB = async () => {
   const res = await mongoose.connect(process.env.MONGO_URI as string, {dbName: 'AuthorAPI'} )
    console.log(`Connected to the ${res.connection.name}`)
}

