import express, { Request, Response } from "express";
import rateLimit from 'express-rate-limit'
const PORT = 3000;
const app = express();

app.use(express.json());
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

app.post("/", (req: Request, res: Response) => {
    res.json({
        message : "Hello POST",
        data : req.body
    })
})



app.listen(PORT, ()=> {
    console.log(`SERVER RUNNING @PORT:${PORT}`)
})

export default app;