const CouponModel = require('../model/couponSchema')
const VerifyCouponModel = require('../model/verifyCouponSchema')
const ObjectId = require('mongoose').Types.ObjectId

exports.addCoupon = async (req, res) => {
    if (req.authVerified.role === 'admin') {
        try {
            const { couponCode, offerPercent, fromDate, toDate } = req.body
            const data = await CouponModel.find({ couponCode: couponCode })
            if (data.length === 0) {
                const coupon = new CouponModel({
                    couponCode: couponCode,
                    offerPercent: offerPercent,
                    fromDate: fromDate,
                    toDate: toDate
                })
                const newCoupon = await coupon.save()
                res.send({ message: 'New coupon created successfully', Coupon: newCoupon })
            } else {
                res.send({ error: 'Coupon code already exists' })
            }
        } catch (error) {
            res.send(error)
        }
    } else {
        res.status(401).send('Unauthorized Access')
    }
}

exports.couponManagement = async (req, res) => {
    if (req.authVerified.role === 'admin') {
        try {
            const coupon = await CouponModel.find({})
            if (coupon) {
                res.send({ message: "Success", coupon: coupon })
            } else {
                res.send({ error: "something went wrong" })
            }
        } catch (error) {
            res.send(error)
        }
    } else {
        res.status(401).send('Unauthorized Access')
    }
}

exports.couponStatus = async (req, res) => {
    try {
        const id = req.params.id
        const data = await CouponModel.findOne({ _id: req.params.id })
        const status = data.status
        if (!data) {
            res.send({ message: 'No matching data found' })
        } else {
            if (status) {
                const newStatus = !status
                await CouponModel.updateOne({ _id: id }, { status: newStatus })
            } else {
                const newStatus = !status
                await CouponModel.updateOne({ _id: id }, { status: newStatus })
            }
        }
        const coupon = await CouponModel.find({})
        res.send({ message: 'ok', coupon: coupon })
    } catch (error) {
        res.send(error)
    }
}

exports.getCouponData = async (req, res) => {
    if (req.authVerified.role === 'admin') {
        try {
            const id = req.params.id
            const coupon = await CouponModel.findOne({ _id: id })
            res.send({ message: 'ok', coupon: coupon })
        } catch (error) {
            res.send(error)
        }
    } else {
        res.status(401).send('Unauthorized Access')
    }
}

exports.updateCouponData = async (req, res) => {
    if (req.authVerified.role === 'admin') {
        try {
            const { couponCode, offerPercent, fromDate, toDate } = req.body
            const coupon = await CouponModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
            if (coupon) {
                res.send({ message: "Coupon Details Updated Successfully", coupon: coupon })
            } else {
                res.send({ message: "Request failed" })
            }
        } catch (error) {
            res.send(error)
        }
    } else {
        res.status(401).send('Unauthorized Access')
    }
}

exports.deleteCouponData = async (req, res) => {
    if (req.authVerified.role === 'admin') {
        try {
            const data = await CouponModel.findByIdAndDelete({ _id: req.params.id })
            const coupon = await CouponModel.find({})
            if (coupon) {
                res.send({ message: "Deleted Successfully", coupon: coupon })
            } else {
                res.send({ error: "Some error in deleting the data" })
            }
        } catch (error) {
            res.send({ messsage: "Error", error: error })
        }
    } else {
        res.status(401).send('Unauthorized Access')
    }
}

exports.checkCoupon = async (req, res) => {
    try {
        const code = req.query.code
        const data = await CouponModel.findOne({ couponCode: code })
        if (data.length === 0) {
            res.send({ error: 'Invallid Coupon' })
        } else {
            res.send({ message: 'OK', coupon: data })
        }
    } catch (error) {
        res.send(error)
    }
}

exports.couponVerification = async (req, res) => {
    try {
        const couponId = req.query.couponId
        const userId = req.query.userId
        const data = await VerifyCouponModel.findOne({ couponId: ObjectId(couponId), userId: ObjectId(userId) })
        if (data) {
            res.send({ error: 'Coupon already applied' })
        } else {
            const value = new VerifyCouponModel({
                userId: userId,
                couponId: couponId
            })
            const newValue = await value.save()
            res.send({ message: 'OK', result: newValue })
        }
    } catch (error) {
        res.send(error)
    }
}
