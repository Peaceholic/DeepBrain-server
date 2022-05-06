
export default function CompanyModel(mongoose) {
    const CompanySchema = mongoose.Schema({
        companyName: String,
        sortCode: String,
        service: String,
        majorProduct: String,
        startDate: String,
        ceoName: String,
        webpage: String,
        region: String
    })
    return mongoose.model('Company', CompanySchema)
}


