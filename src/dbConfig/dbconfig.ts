import { log } from "console";
import mongoose from "mongoose";


export async function connect() {
    try {

        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected',() => {
            console.log("mongoDB connected Successfully");
        })

        connection.on('error',(err) => {
            console.log(`failed connetcion ${err}`);
            process.exit();
            
        })

        
    } catch (error) {
        console.log('something goes wrong !');
        console.log(error);
        
    }
    
}