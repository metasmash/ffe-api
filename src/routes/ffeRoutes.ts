// ffeRoutes.ts
import express from 'express'
import { loginToFFE } from '../helpers/ffe/login'
import { retrieve_ffe_credentials } from '../helpers/runtime'

const router = express.Router()

router.post('/login', async (req, res) => {
    const { username, password } = retrieve_ffe_credentials()

    if (!username || !password) {
        return res
            .status(400)
            .json({ message: 'Both username and password are required.' })
    }

    try {
        await loginToFFE(username, password)
        res.json({ message: 'Logged in successfully.' })
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while logging in.',
            error: error.message,
        })
    }
})

export default router
