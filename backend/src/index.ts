import express, { Request, Response } from "express";
const PORT = 3000;
const app = express();

app.get("/", (req: Request, res: Response) => {
    res.json({
        message : "Hello"
    })
})

app.listen(PORT, ()=> {
    console.log(`SERVER RUNNING @PORT:${PORT}`)
})

export default app;