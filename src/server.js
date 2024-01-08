/* eslint-disable no-console */
import express from "express"
import exitHook from "async-exit-hook"
import { CONNECT_DB, CLOSE_DB } from "~/config/mongodb";
import {env} from '~/config/environment'

const START_SERVER = () => {
  const app = express();

  app.get("/", async (req, res) => {
    console.log(process.env);
    res.end("<h1>Hello World!</h1><hr>");
  });

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello ${env.AUTHOR}, Back-end Server is running successfully at Host: ${env.APP_HOST} and Port: ${env.APP_PORT}`);
  });
  exitHook(() => {
    console.log(`4. Disconnecting from  MongoDB Cloud Atlas`);
    CLOSE_DB()
    console.log(`5. Disconnected from  MongoDB Cloud Atlas`);
  })
};

//Chi khi ket noi toi db thanh cong thi moi start server back-end len
//IIFE- function an danh
(async ()=>{
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...');
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas!');
    START_SERVER()
  } catch (error) {
    console.log(error);
    process.exit(0)
  }
})()

//Chi khi ket noi toi db thanh cong thi moi start server back-end len
// console.log('1. Connecting to MongoDB Cloud Atlas...');
// CONNECT_DB()
//   .then(()=> {console.log('2. Connected to MongoDB Cloud Atlas!');})
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.log(error);
//     process.exit(0)
//   });
