import db from '../models/index.js'
import getDatabase from '../lambdas/getDatabase.js'

export default function CompanyService() {

  const Company = db.Company
  const dbo = getDatabase()
  const dbConnect = dbo.getDb();

  return {
    addCompany(req, res) {
      const data = req.body;
      new Company(data).save((err) => {
        if (err) {
          res.status(500).json({ message: err })
          console.log(' ## add Fail')
          return;
        } else {
          console.log(' >> add Success : ' + data.bookName)
          res.status(200).json({ ok: 'ok' })
        }
      })
    },

    getCompanys(_req, res) {
      Company.find()
        .limit(10)
        .sort([["_id", -1]])
        .exec((err, Companys) => {
          console.log(" >> get Success");
          res.status(200).json(Companys);
        });
    },

    getCompany(req, res) {
      const { id } = req.params;
      Company.findById(id).exec((err, Company) => {
        if (err) {
          res.status(500).json({ message: err });
          console.log(" ## get Fail");
        } else {
          res.status(200).json(Company);
        }
      });
    },

    updateCompany(req, res) {
      const { id } = req.params;
      Company.findByIdAndUpdate(id, { ...req.body }, (err) => {
        if (err) {
          res.status(500).json({ message: err });
          console.log(" ## update Fail");
          return;
        } else {
          res.status(200).json({ ok: "ok" });
        }
      });
    },

    deleteCompany(req, res) {
      const { id } = req.params;
      Company.findByIdAndDelete(id, (err) => {
        if (err) {
          res.status(500).json({ message: err });
          console.log(" ## delete Fail");
          return;
        } else {
          res.status(200).json({ ok: "ok" });
        }
      });
    },

  }
}