import mongo from 'mongodb'
import dotenv from 'dotenv'

let MongoClient = mongo.MongoClient;
dotenv.config()
export const client = await MongoClient.connect(
    'mongodb://upscale:d5xsXjYUem&S9rB@13.40.105.133:52531/admin',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );


//   import mongoose from "mongoose";

// const connectDb = async () => {
//   try {
//     mongoose.connection
//       .on("connecting", () => {
//         console.log(" [ MongoDB ] connecting...".yellow.dim);
//       })
//       .on("connected", () => {
//         console.log(" [ MongoDB ] connected".green);
//       })
//       .on("disconnecting", () => {
//         console.log(" [ MongoDB ] disconnecting...".red.dim);
//       })
//       .on("disconnected", () => {
//         console.log(" [ MongoDB ] disconnected".red.dim);
//       })
//       .on("error", (err) => {
//         console.log(" [ MongoDB ] error".red);
//         console.error(err);
//       });

//     await mongoose.connect(process.env.MONGO_URI,{

//       useNewUrlParser: true, 
      
//       useUnifiedTopology: true 
      
//       }, err => {
//       if(err) throw err;
//       console.log('Connected to MongoDB!!!')
//       });
//   } catch (error) {
//     console.log("Mongo is error :", error);
//   }
// };
// export default connectDb