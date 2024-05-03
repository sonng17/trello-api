/* eslint-disable no-console */
import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, CLOSE_DB } from "~/config/mongodb";
import { env } from "~/config/environment";
import { APIs_V1 } from "~/routes/v1";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";
import cors from "cors";
import { corsOptions } from "./config/cors";

const START_SERVER = () => {
  const app = express();

  // Xử lý CORS
  app.use(cors(corsOptions));

  //enable req.body jsondata
  app.use(express.json());

  //use api v1
  app.use("/v1", APIs_V1);

  //Middleware xu ly loi tap trung
  app.use(errorHandlingMiddleware);

  if (env.BUILD_MODE === "production") {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(
        `3.Production: Hello ${env.AUTHOR}, Back-end Server is running successfully at PORT: ${process.env.PORT}}`
      );
    });
  } else {
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(
        `3.Local Dev: Hello ${env.AUTHOR}, Back-end Server is running successfully at: http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}`
      );
    });
  }
  exitHook(() => {
    console.log(`4. Disconnecting from  MongoDB Cloud Atlas`);
    CLOSE_DB();
    console.log(`5. Disconnected from  MongoDB Cloud Atlas`);
  });
};

//Chi khi ket noi toi db thanh cong thi moi start server back-end len
//IIFE- function an danh
(async () => {
  try {
    console.log("1. Connecting to MongoDB Cloud Atlas...");
    await CONNECT_DB();
    console.log("2. Connected to MongoDB Cloud Atlas!");
    START_SERVER();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();

