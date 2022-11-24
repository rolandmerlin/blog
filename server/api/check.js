const { PrismaClient } = require('@prisma/client')
const { isObject } = require('url/util')

const prisma = new PrismaClient()

const userFieldProtection = (e) => ({ id:e.id, pseudo:e.pseudo, email:e.email, token:e.token, group:e.group })

const checkUser = async(req,res) => {
    const { token } = req.headers
    if (token==undefined){
        res.json({})
        return
    }
    let u = await prisma.user.findFirst({ where: { token } })
    if (!isObject(u)) return res.json({})
    res.json( userFieldProtection( u ) )
}

const regCheck = RegExp('/api/check')
const check = async(req,res,next) => {
    if (!regCheck.test(req.url)) return next()
    switch (req.method){
        case 'GET':
            await checkUser(req,res)
            return
        case 'POST':
            return
        case 'PUT':

            return
        case 'DELETE':

            return
    }
    next()
}

module.exports = check