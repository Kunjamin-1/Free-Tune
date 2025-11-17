import mongoose from "mongoose";

const connectDataBase = async () => {
    try {
        const response = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
        console.log(`Database connected:- ${response.connection.host}`)
    } catch (error) {
        console.error(`Error occured while connecting to database:- ${error}`)
    }
}

export {connectDataBase}