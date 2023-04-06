import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from '../config.js'
async function connect(){
  const monngo = await MongoMemoryServer.create();
  const getUri = monngo.getUri();

  mongoose.set('strictQuery', true)
 // const db  = await mongoose.connect(getUri);
  const db = mongoose.connect(ENV.ATLAS_URI)
  console.log("database connected ")

  return db;
}

export default connect;