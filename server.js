import dotenv from 'dotenv'
import express from 'express'
import passport from 'passport'
import morgan from 'morgan'

import db from './app/models/index.js'

import index from "./app/routes/index.js"
import api from "./app/routes/api.js"
import user from "./app/routes/user.js"
import company from "./app/routes/company.js"

import getResponse from "./app/lambdas/getResponse.js"
import applyPassport from './app/lambdas/applyPassport.js'
import applyDotenv from './app/lambdas/applyDotenv.js'

async function startServer() {
    const app = express();
    const { mongoUri, port, jwtSecret } = applyDotenv(dotenv)

    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    const _passport = applyPassport(passport, jwtSecret);

    app.use(_passport.initialize());
    app.use("/", index);
    app.use("/api", api);
    app.use("/user", user);
    app.use("/company", company);
    app.use(morgan('dev'))

    db.mongoose
        .connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log(' >> MongoDB Connection Success')
        })
        .catch(err => {
            console.log(' ## MongoDB Connection Fail', err)
            process.exit();
        });

    app.all("*", function (_req, res) {
        return getResponse.notFoundResponse(res, " ## Can't find the page");
    });

    app.use((err, _req, res) => {
        if (err.name == " # Unauthorized Error") {
            return getResponse.unauthorizedResponse(res, err.message);
        }
    });

    app.listen(port, () => {
        console.log('\n >> Server Start')
    });

};
startServer()