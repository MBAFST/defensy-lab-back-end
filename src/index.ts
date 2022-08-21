import express, { Request, Response } from "express";
import Connection from "mysql2/typings/mysql/lib/Connection";
import "reflect-metadata";
import { createConnection } from "typeorm";
import EvaluationRoutes from  "./routes/EvaluationRoutes";
import cors from "cors";
import bodyParser from "body-parser";
createConnection().then(async(Connection)=>{ "'connection' is declared but its value is never read."

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.get("/", EvaluationRoutes);
app.listen(8000, () => (
    console.log("Listening to port 8000")));
app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
});


});
