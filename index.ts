import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { router } from './src/routes/route';
import bodyParser from 'body-parser';

//For env File 
dotenv.config();

const app: Application = express()
const port = process.env.PORT || 8000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({
        status: "Api running...!"
    })
})

app.use(router)

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
