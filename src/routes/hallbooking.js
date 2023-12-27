import express from 'express'
import bookingController from '../controller/hallbooking.js'

const router = express.Router()

router.get('/rooms',bookingController.getRooms)
router.post('/createRoom',bookingController.create)
router.post('/bookRoom',bookingController.bookRooms)
router.get('/viewbooking',bookingController.viewBooking)
router.get('/getCustomer',bookingController.getCustomer)
router.get('/customers/:name')

export default router