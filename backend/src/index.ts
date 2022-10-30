import config from "./config";
import express, { Request, Response } from "express";
import rateLimit from 'express-rate-limit';
import db from "./database";
import routes from "./routes";
import errorMiddleware from "./middleware/error.middleware";

const PORT = config.port || 3000;
const app = express();

app.use(express.json());

// ROUTES
app.use("/api", routes);

// Apply the rate limiting middleware to all requests
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
)

app.get("/", (req: Request, res: Response) => {

    res.json({
        message : "Hello"
    })

})

app.use(errorMiddleware);

// TEST DATABASE
const connectDb = async () => {
  try {
    await db.connect();
    const res = await db.query('SELECT NOW()');
    console.log(res);
    await db.end();
  } catch (error) {
    console.log(error);
  }
};
//connectDb();

app.use((req: Request, res:Response)=> {
    res.status(400).json({
        message: "SORRY, this url not exist"
    })
})


app.listen(PORT, ()=> {
    console.log(`SERVER RUNNING @PORT:${PORT}`)
})

export default app;