import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import UserService from "../services/User.js"

dotenv.config()
const mongoUri = process.env.MONGO_URI
const port = process.env.PORT
const jwtSecret = process.env.JWT_SECERT
const origin = process.env.ORIGIN

const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
}

const app = express()

app.use(cors());
app.use(function (_req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.post('/join', cors(corsOptions), (req, res) => {
    UserService().join(req, res)
})

app.post('/login', cors(corsOptions), (req, res) => {
    UserService().login(req, res)
})

app.post('/logout', cors(corsOptions), (req, res) => {
    UserService().logout(req, res)
})

app.get('/getUsers', cors(corsOptions), (req, res) => {
    UserService().getUsers(req, res)
})

export default app