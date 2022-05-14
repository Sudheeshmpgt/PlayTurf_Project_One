const UserModel = require('../model/userschema');
const config = require('../../config')
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID)

exports.googleLogin = async (req, res) => {
    try {
        const { tokenId } = req.body;

        client.verifyIdToken({ idToken: tokenId, audience: config.GOOGLE_CLIENT_ID })
            .then(response => {
                const { email_verified, name, email, iat, picture } = response.payload;
                if (email_verified) {
                    UserModel.findOne({ email }).exec((err, user) => {
                        if (err) {
                            return res.status(400).json({ message: "Something went wrong..." })
                        } else {
                            if (user) {
                                (async () => {
                                    const token = await user.generateAuthToken()
                                    res.cookie("jwtoken", token, {
                                        expiresIn: '1h',
                                        httpOnly: true
                                    })
                                    res.send({ message: "Login Successfull", user: user, token: token })
                                })()
                            } else {
                                (
                                    async () => {
                                        let password = email + config.SECRET_KEY
                                        let newUser = new UserModel({
                                            name: name,
                                            phone: iat,
                                            email: email,
                                            userImg: picture,
                                            password: password
                                        }) 
                                        const user = await newUser.save();
                                        const token = await user.generateAuthToken()
                                        res.cookie("jwtoken", token, {
                                            expiresIn: '1h',
                                            httpOnly: true
                                        })
                                        return res.send({message: "Login Successfull", user: user, token: token })
                                    }
                                )()
                            }
                        }

                    })
                }

            })
    } catch (error) {

    }
}