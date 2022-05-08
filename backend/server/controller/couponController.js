const CouponModel = require('../model/couponSchema')

exports.addCoupon = async (req, res) => {
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
}

exports.couponManagement = async (req, res) => {
    try {
        const coupon = await CouponModel.find({})
        if (coupon) {
            res.send({ message: "Success", coupon:coupon })
        } else {
            res.send({ error: "something went wrong" })
        }
    } catch (error) {
        res.send(error)
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
        res.send({ message: 'ok', coupon:coupon })
    } catch (error) {
        res.send(error)
    }
}

exports.getCouponData = async (req, res) => {
    try {
        const id = req.params.id
        const coupon = await CouponModel.findOne({_id:id})
        res.send({ message: 'ok', coupon: coupon })
    } catch (error) {
        res.send(error)
    }
}

exports.updateCouponData = async (req, res) => {
    try {
        const { couponCode, offerPercent, fromDate, toDate} = req.body
        const coupon = await CouponModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
        if (coupon) {
            res.send({ message: "Coupon Details Updated Successfully", coupon: coupon })
        } else {
            res.send({ message: "Request failed" })
        }
    } catch (error) {
        res.send(error)
    }
}

exports.deleteCouponData = async (req, res) => {
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
}
