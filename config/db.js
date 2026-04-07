const {connect} = require("mongoose");
const URI = process.env.MONGO_URI;

const connectDb = async ()=>{

    try
    {
        const conn = await connect(URI);
        console.log("connected successfully with PORT",process.env.PORT);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    }
    catch(error)
    {
        console.log(error);
        
    }


}

module.exports = connectDb;