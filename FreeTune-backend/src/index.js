import dotenv from "dotenv";
import { connectDataBase } from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
    path: "./.env"
})


connectDataBase()
    .then(
        app.listen(process.env.PORT, () => {
            console.log(`Server runing on http://localhost:${process.env.PORT}`)
        })
    )
    .catch(error => {
        console.log(`datebase connection error:-${error}`)
    })