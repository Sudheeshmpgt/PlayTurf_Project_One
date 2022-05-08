const Razorpay = require('razorpay')
const OrderModel = require('../model/orderschema')
const config = require('../../config')

//razorpay setup
exports.getRazorpayKey = async (req, res) => {
    res.send({ key: config.RAZORPAY_KEY_ID })
}

//razorpay create order
exports.createOrder = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: config.RAZORPAY_KEY_ID,
            key_secret: config.RAZORPAY_KEY_SECRET
        })
        const options = {
            amount: req.body.amount,
            currency: 'INR',
        }
        const order = await instance.orders.create(options)
        if (!order) return res.send({ message: 'some error occured' })
        res.send(order)
    } catch (error) {
        res.send(error)
    }
}

//razorpay pay order
exports.payOrder = async (req, res) => {
    try {
        const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body
        const newPayment = OrderModel({
            isPaid: true,
            amount: amount,
            razorpay: {
                orderId: razorpayOrderId,
                paymentId: razorpayPaymentId,
                signature: razorpaySignature,
            },
        })
        await newPayment.save()
        res.send({ message: 'Payment was successful' })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

exports.listOrder = async (req, res) => {
    const orders = await OrderModel.find()
    res.send(orders);
}
