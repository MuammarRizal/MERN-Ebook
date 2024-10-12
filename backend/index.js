import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import Logger from "./src/utils/logger/Logger.js";
import router from "./src/routes/index.js";

// setup
const app = express();
const PORT = 4000;

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/api", router);

app.listen(PORT, () => {
  Logger.info(`Server running on port ${PORT}`);
});
