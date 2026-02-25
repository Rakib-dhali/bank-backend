const { json } = require("express")
const userModel = require("../models/user.model")


/**
 * - user register controller
 * - POST /api/auth/register
*/ 
async function userRegisterController(res, req){
    const {email, password, name } = req.body

    const isExists = await userModel.findOne({
        email: email
    })

    if (isExists){
        return res.status(422),json({
            message: "user already exist",
            status: "failed"
        })
    }

    const user = await userModel.create({
        email, password, name
    })
}

module.exports = {
    userRegisterController
}