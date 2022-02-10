const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';


const checkToken = (req, res, next) => {
    res.sendStatus(200);
}

const logout = (req, res, next) => {
    res.clearCookie('token')
    res.send({ success: true });
}

const registerUser = (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;

    User.findOne({email: req.body.email})
    .then((user) =>{
        console.log(email);
        if (user){
            res.status(400).json({success: false, msg: 'User already exists'})
        }
        else{
            const newUser = new User({ firstName, lastName, email, password });
            newUser.save((err, user) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({success: false, msg: "Error Creating Account, please try again."})
                } else {
                    res.status(200).send({ success: true, msg: 'Account Created Successfully' })
                }
            })
        }
    })
    .catch((err) => console.log(err, 'err'))

}



const authenticateUser = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email }, function (err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect email or password'
                });
        } else {
            user.isCorrectPassword(password, function (err, same) {
                if (err) {
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect email or password'
                        });
                } else {
                    // Issue token
                    const payload = { email };
                    console.log(payload, 'payload');
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    
                    res.cookie('token', [token, payload]).sendStatus(200);
                    // res.cookie('email', payload, { httpOnly: true }).sendStatus(200);
                }
            });
        }
    });
}


// const fetchUser = (req, res, next) => {
// const email = req.body.token[1]

// User.find({email})
// }
module.exports = { checkToken, logout, registerUser, authenticateUser }