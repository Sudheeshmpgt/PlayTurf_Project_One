const BookingModel = require('../model/bookingschema')
const ObjectId = require('mongoose').Types.ObjectId

//admin or user booking management
exports.addBooking = async (req, res) => {
    try {
        const { centerId, createdBy, date, startTime, endTime, totalPrice, paymentMode, offer } = req.body
        const prevBooking = await BookingModel.find({ centerId: ObjectId(centerId), date: date, startTime: startTime });
        if (prevBooking.length <= 0) {
            const newBooking = new BookingModel({
                centerId: centerId,
                createdBy: createdBy,
                date: date,
                startTime: startTime,
                endTime: endTime,
                totalPrice: totalPrice,
                paymentMode: paymentMode,
                offer: offer
            });
            const booking = await newBooking.save();
            res.send({ message: "Booked Successfully", booking: booking });
        } else {
            res.send({ message: "The slot is already booked" });
        }
    } catch (error) {
        res.send(error)
    }
}

//user booking get request
exports.getBookingDetails = async (req, res) => {
    const userId = req.params.id
    const data = await BookingModel.aggregate([
        {
            $match: { createdBy: ObjectId(userId) }
        },
        {
            $lookup: {
                from: 'turves',
                localField: 'centerId',
                foreignField: '_id',
                as: 'turfDetails'
            }
        }
    ])
    if (data) {
        res.send({ message: "Successful", turf: data })
    } else {
        res.send({ message: "Error" })
    }
}

//admin booking management get request
exports.bookingManagement = async (req, res) => {
    const data = await BookingModel.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'createdBy',
                foreignField: '_id',
                as: 'userDetails'
            }
        },
        {
            $lookup: {
                from: 'turves',
                localField: 'centerId',
                foreignField: '_id',
                as: 'turfDetails'
            }
        }
    ])
    if (data) {
        res.send({ message: "Successful", booking: data })
    } else {
        res.send({ message: "Error" })
    }
}

//admin booking management booking status change
exports.changeBookingStatus = async (req, res) => {
    try {
        const status = req.body.data

        const data = await BookingModel.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                status: status
            })
        if (data) {
            const bookings = await BookingModel.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'createdBy',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                },
                {
                    $lookup: {
                        from: 'turves',
                        localField: 'centerId',
                        foreignField: '_id',
                        as: 'turfDetails'
                    }
                }
            ])
            res.send({ message: "Booking status updated successfully", booking: bookings })
        } else {
            res.send({ message: "Request failed" })
        }
    } catch (error) {
        console.log('error', error)
    }
}

//admin booking management delete booking details
exports.deleteBookingData = async (req, res) => {
    try {
        const data = await BookingModel.findByIdAndDelete({ _id: req.params.id })
        const booking = await BookingModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $lookup: {
                    from: 'turves',
                    localField: 'centerId',
                    foreignField: '_id',
                    as: 'turfDetails'
                }
            }
        ])
        if (data) {
            res.send({ message: "Deleted Successfully", booking: booking })
        } else {
            res.send({ message: "Some error in deleting the data" })
        }
    } catch (error) {
        res.send({ messsage: "Error", error: error })
    }
}

//user booking cancellation
exports.cancelBooking = async (req, res) => {
    try {
        const id = req.params.id
        const status = req.body.data
        const userId = req.body.userid
        const data = await BookingModel.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                status: status
            })
        if (data) {
            const booking = await BookingModel.aggregate([
                {
                    $match: { createdBy: ObjectId(userId) }
                },
                {
                    $lookup: {
                        from: 'turves',
                        localField: 'centerId',
                        foreignField: '_id',
                        as: 'turfDetails'
                    }
                }
            ])
            res.send({ message: "Successful", booking: booking })
        } else {
            res.send({ message: "Request Failed" })
        }
    } catch (error) {
        console.log(error)
    }
}

//user get booking details by booking_id
exports.getBookingData = async (req, res) => {
    const Id = req.params.id
    const data = await BookingModel.aggregate([
        {
            $match: { _id: ObjectId(Id) }
        },
        {
            $lookup: {
                from: 'turves',
                localField: 'centerId',
                foreignField: '_id',
                as: 'turfDetails'
            }
        }
    ])
    if (data) {
        res.send({ message: "Successful", booking: data })
    } else {
        res.send({ message: "Error" })
    }
}

exports.verifyFirstOffer = async (req, res) => {
    try {
        const userId = req.query.id
        const data = await BookingModel.findOne({ createdBy: ObjectId(userId) })
        if (data.length != 0) {
            res.send({error:'Not Eligible'})
        } else {
             res.send({ message: 'Eligible' })
        }
    } catch (error) {
        res.send(error)
    }

}