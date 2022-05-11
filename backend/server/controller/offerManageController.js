const OfferModel = require('../model/offerschema')
const ObjectId = require('mongoose').Types.ObjectId

exports.addOffer = async (req, res) => {
    if (req.authVerified.role === 'admin') {
        try {
            const { turfId, offerPercent, fromDate, toDate } = req.body
            const data = await OfferModel.find({ turfId: ObjectId(turfId) })
            if (data.length === 0) {
                const offer = new OfferModel({
                    turfId: turfId,
                    offerPercent: offerPercent,
                    fromDate: fromDate,
                    toDate: toDate
                })
                const newOffer = await offer.save()
                res.send({ message: 'New offer created successfully', offer: newOffer })
            } else {
                res.send({ error: 'Turf already have an offer' })
            }
        } catch (error) {
            res.send(error)
        }
    } else {
        res.status(401).send('Unauthorized Access')
    }
}

exports.offerManagement = async (req, res) => {
    try {
        const offer = await OfferModel.aggregate([
            {
                $lookup: {
                    from: 'turves',
                    localField: 'turfId',
                    foreignField: '_id',
                    as: 'turfDetails'
                }
            }
        ])
        if (offer) {
            res.send({ message: "Success", offer: offer })
        } else {
            res.send({ error: "something went wrong" })
        }
    } catch (error) {
        res.send(error)
    }
}

exports.offerStatus = async (req, res) => {
    try {
        const id = req.params.id
        const data = await OfferModel.findOne({ _id: req.params.id })
        const status = data.status
        if (!data) {
            res.send({ message: 'No matching data found' })
        } else {
            if (data.status) {
                const stats = !status
                const user = await OfferModel.updateOne({ _id: id }, { status: stats })
            } else {
                const stats = !status
                const user = await OfferModel.updateOne({ _id: id }, { status: stats })
            }
        }
        const offer = await OfferModel.aggregate([
            {
                $lookup: {
                    from: 'turves',
                    localField: 'turfId',
                    foreignField: '_id',
                    as: 'turfDetails'
                }
            }
        ])
        res.send({ message: 'ok', offer: offer })
    } catch (error) {
        res.send(error)
    }
}

exports.getOfferData = async (req, res) => {
    if (req.authVerified.role === 'admin') {
        try {
            const id = req.params.id
            const offer = await OfferModel.aggregate([
                {
                    $match: {
                        _id: ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: 'turves',
                        localField: 'turfId',
                        foreignField: '_id',
                        as: 'turfDetails'
                    }
                }
            ])
            res.send({ message: 'ok', offer: offer })
        } catch (error) {
            res.send(error)
        }
    } else {
        res.status(401).send('Unauthorized Access')
    }
}

exports.updateOfferData = async (req, res) => {
    if (req.authVerified.role === 'admin') {
        try {
            const { offerPercent, fromDate, toDate, turfId } = req.body
            const offer = await OfferModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
            if (offer) {
                res.send({ message: "Offer details Updated Successfully", offer: offer })
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

exports.deleteOfferData = async (req, res) => {
    if (req.authVerified.role === 'admin') {
        try {
            const data = await OfferModel.findByIdAndDelete({ _id: req.params.id })
            const offer = await OfferModel.aggregate([
                {
                    $lookup: {
                        from: 'turves',
                        localField: 'turfId',
                        foreignField: '_id',
                        as: 'turfDetails'
                    }
                }
            ])
            if (offer) {
                res.send({ message: "Deleted Successfully", offer: offer })
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

//user turf get data
exports.getOfferTurfData = async (req, res) => {
    try {
        const id = req.params.id
        const offer = await OfferModel.aggregate([
            {
                $match: {
                    turfId: ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'turves',
                    localField: 'turfId',
                    foreignField: '_id',
                    as: 'turfDetails'
                }
            }
        ])
        res.send({ message: 'ok', offer: offer })
    } catch (error) {
        res.send(error)
    }
}

