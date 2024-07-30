import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import { DB_URL, PORT } from "./configs/env.config";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import authRoutes from "./routes/auth.route";

const app = express();

const corsOptions: cors.CorsOptions = {
    optionsSuccessStatus: 200,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['accesstoken']
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err.message, err.statusCode);
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.statusCode || 500).json({ message: err.message || err });
}

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler);

// Routes
app.use('/auth', authRoutes);

mongoose.set('strictQuery', false);

mongoose.connect(DB_URL, { autoIndex: true, autoCreate: true }).then(() => {
    console.log("connected to DB");
    app.listen(PORT, () => {
        console.log("server started on PORT", PORT);
    })
}).catch(() => {
    console.log(DB_URL)
    throw createHttpError(501, "Unable to connect DB")
})
