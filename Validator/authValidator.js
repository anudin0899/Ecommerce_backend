const { check, validationResult } = require('express-validator')

const signUpValidator = [
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('lastName').notEmpty().withMessage('lastName is required'),
    check('email').isEmail().withMessage('valid email is required'),
    check('password').isLength({ min: 8 }).withMessage('password atleast contain 8 character long'),
]

const signInValidator = [
    check('data').isEmail().withMessage('valid email is required'),
    check('password').isLength({ min: 8 }).withMessage('password atleast contain 8 character long'),
]


const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}


module.exports = { signUpValidator, signInValidator, isRequestValidated }