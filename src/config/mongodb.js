
import { MongoClient, ServerApiVersion } from "mongodb";
import {env} from '~/config/environment'

//Khoi tao doi tuong db ban dau la null (vi chua ket noi)
let trelloDatabaseInstance = null;
//Khoi tao doi tuong client ket noi toi mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const CONNECT_DB = async () => {
  //Goi ket noi toi mgdb atlas voi uri
  await mongoClientInstance.connect();
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

export const CLOSE_DB = async () => {
  console.log(`code chay vao cho close nay`);
  await mongoClientInstance.close();
};

export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("Must connect to database first!");
  return trelloDatabaseInstance;
};
