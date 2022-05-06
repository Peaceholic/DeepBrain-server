import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'

import CompanyService from "../services/Company.js"
import applyDotenv from "../lambdas/applyDotenv.js";

const { origin } = applyDotenv(dotenv);

const corsOptions = {
    origin: origin,
    optionsSuccessStatus: 200,
};

const app = express();

app.use(cors());
app.use(function (_req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.route("/")
    .post(cors(corsOptions), (req, res) => {
        CompanyService().addCompany(req, res);
    })
    .get(cors(corsOptions), (req, res) => {
        CompanyService().getCompanys(req, res);
    });

app.route("/:id")
    .get(cors(corsOptions), (req, res) => {
        CompanyService().getCompany(req, res);
    })
    .patch(cors(corsOptions), (req, res) => {
        CompanyService().updateCompany(req, res);
    })
    .delete(cors(corsOptions), (req, res) => {
        CompanyService().deleteCompany(req, res);
    });

app.post('/add', cors(corsOptions), (req, res) => {
    CompanyService().addCompany(req, res)
})

app.get('/getCompanys', cors(corsOptions), (req, res) => {
    CompanyService().getCompanys(req, res)
})

app.post('/update', cors(corsOptions), (req, res) => {
    CompanyService().updateCompany(req, res)
})

app.post('/delete', cors(corsOptions), (req, res) => {
    CompanyService().deleteCompany(req, res)
})

export default app