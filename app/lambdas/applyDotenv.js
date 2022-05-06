const applyDotenv = dotenv => {
    dotenv.config()
    return {
        mongoUri: process.env.MONGO_URI,
        dbName: process.env.DB_NAME,
        port: process.env.PORT,
        jwtSecret: process.env.JWT_SECERT,
        origin: process.env.ORIGIN
    }
}
export default applyDotenv