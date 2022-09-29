import path from "path";

// var fileupload from"express-fileupload");
import bodyParser from "body-parser";
import express from "express";
import dotenv  from "dotenv";
const app = express();
import cors from "cors";

dotenv.config();


import amazonSeller from "./router/adminRouter.js";
import { notFound, errorHandler } from "./Middleware/ErroreHandling.js";

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
// app.use(fileupload());


app.use("/api/amazon", amazonSeller);

// Serve static assets if in production
const __dirname = path.resolve();

//static folder path
app.use(express.static(path.resolve(__dirname, "public")));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/Frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'Frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

//ERROR HANDLING
app.use(notFound);
app.use(errorHandler);

export default app;
