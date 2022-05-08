const FavouritesModel = require('../model/favouritesschema')
const ObjectId = require('mongoose').Types.ObjectId

//user add to favourites
exports.addToFavourites = async (req, res) => {
    try {
        const userId = req.body.userId
        const turfId = req.body.turfId
        const data = await FavouritesModel.find({ userId: ObjectId(userId), turfId: ObjectId(turfId) })
        if (data.length <= 0) {
            const favourite = new FavouritesModel({
                userId: userId,
                turfId: turfId
            })
            const favourites = await favourite.save()
            const value = await FavouritesModel.find({ userId: ObjectId(userId) })
            res.send({ message: 'Successfull', turf: value })
        } else {
            const id = data[0]._id
            const deleteData = await FavouritesModel.findByIdAndDelete({ _id: id })
            const value = await FavouritesModel.aggregate([
                {
                    $match: { userId: ObjectId(userId) }
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
            if (value) {
                res.send({ message: "Success", turf: value })
            } else {
                res.send({ message: "Request failed" })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

//user favourites get request
exports.getFavourites = async (req, res) => {
    try {
        const userId = req.params.id
        const data = await FavouritesModel.aggregate([
            {
                $match: { userId: ObjectId(userId) }
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
        if (data) {
            res.send({ message: "Success", turf: data })
        } else {
            res.send({ message: "Request failed" })
        }
    } catch (error) {
        console.log(error)
    }
}

