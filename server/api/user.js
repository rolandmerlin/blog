const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const md5 = require('md5')

const { tokenkey, passwordkey } = require('../lib/key.js')
const { VMail, VPseudo, VPassword, DataFill } = require('../lib/verif.js')

const userFieldProtection = (e) => ({ id:e.id, pseudo:e.pseudo, email:e.email, group:e.group })

const usersFieldProtection = (es) => es.map(e => userFieldProtection(e))
const md5password = (pwd) => md5(passwordkey+pwd)

const GetUser = async(req, res) => {
    const { id } = req.query
    let u = null
    if (id){
        return res.json( userFieldProtection(await prisma.user.findFirst({ where:{ id:Number(id) } })) )
    } else {
        return res.json( usersFieldProtection(await prisma.user.findMany()) )
    }
}

const CreateUser = (req ,res) => {
    const { email, pseudo, password } = req.body
    if (!VMail(email)) return res.json({error:'email'})
    if (!VPseudo(pseudo)) return res.json({error:'pseudo'})
    if (!VPassword(password)) return res.json({error:'password'})
    let u = prisma.user.create({
        data:{ email, pseudo, password:md5password(password), token:'' }
    })
    if (u) res.json( userFieldProtection( u ) )
    res.json({})
}

const UpdateUser = (req, res) => {
    const { id, email, pseudo, group } = req.body
    let u = prisma.user.update({
        where:{ id },
        data:{ email, pseudo, group }
    })
    res.json( userFieldProtection(u) )
}

const DeleteUser = (req, res) => {
    const { id, token } = req.body
    let u = prisma.user.delete({ where: { id } })
    return res.json(u)
}

const regUrl = RegExp('/api/user')

const user = (req,res,next) => {
    if (!regUrl.test(req.url)) return next()
    switch (req.method){
        case 'GET':
            GetUser(req,res)
            return
        case 'POST':
            CreateUser(req,res)
            return
        case 'PUT':
            UpdateUser(req,res)
            return
        case 'DELETE':
            DeleteUser(req,res)
            return
    }
    next()
}

//export default user
module.exports = user