import express from 'express'
import useRoutes from './hallbooking.js'
const router =express.Router()
router.use('/',useRoutes)

export default router