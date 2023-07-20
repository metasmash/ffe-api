import { config } from 'dotenv'
import mongoose from 'mongoose'
import app from 'app'
import waitPort from 'wait-port'

// Loads .env.example file contents into process.env and destructures them.
config({ path: '.env' })
const {
    API_ADMIN_PASSWORD,
    DB_PORT,
    DB_NAME,
    API_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    ENVIRONMENT,
    MONGO_HOST,
    FFE_USERNAME,
    FFE_PASSWORD,
} = process.env

export const environment = {
    API_ADMIN_PASSWORD,
    DB_PORT,
    DB_NAME,
    API_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    ENVIRONMENT,
    MONGO_HOST,
    FFE_USERNAME,
    FFE_PASSWORD,
}

// Construct Mongo connection URI
const mongoURI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${MONGO_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`

// Start mongo connection
mongoose
    .connect(mongoURI, { serverSelectionTimeoutMS: 10000 })
    .then(({ connection: mongo }) => {
        mongo.on('error', console.error.bind(console, 'connection error:'))
        console.log(`MONGO: connected to "${DB_NAME}" mongodb database!`)
    })

// Start the web server on the defined port and defined environment
// Start the web server on the defined port and defined environment
waitPort({
    host: 'localhost',
    port: Number(environment.API_PORT),
    timeout: 20000, // Maximum wait time in milliseconds (adjust as needed)
    output: 'silent', // Optional, suppress console output
})
    .then(() => {
        app.listen(environment.API_PORT, () => {
            console.log(`Server is running on port ${environment.API_PORT}.`)
            console.log(`Environment: ${environment.ENVIRONMENT}.`)
        })
    })
    .catch((err) => {
        console.error(`Failed to wait for port ${environment.API_PORT}:`, err)
    })
