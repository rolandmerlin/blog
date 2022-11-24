const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const md5 = require('md5')

const { tokenkey, passwordkey } = require('../lib/key.js')

const { VMail, VPseudo, VPassword } = require('../lib/verif.js')

const User = async(req) => await prisma.user.findFirst( { where:{ token: req.body.token } } )
const userFieldProtection = (e) => ({ id:e.id, pseudo:e.pseudo, group:e.group })

const GetUser = async(req, res) => {
    const { token } = req.body
    let u
    if (u = await User(token)){
        res.json(userFieldProtection(u))
    } else {
        res.json( {} )
    }
}

const Login = async(req, res) => {
    const { user, password } = req.body
    const md5pwd = md5(passwordkey+password)
    
    let u = await prisma.user.findFirst( { where:{ pseudo:user, password:md5pwd} } )
    if (u){
        const token = md5(tokenkey+Date.now()+'_'+u.id)
        await prisma.user.update({
            where:{ id:u.id },
            data:{ token }
        })
        res.json({ email:u.email, pseudo:u.pseudo, token, group:u.group, id:u.id })
    } else {
        res.json({})
    }
}

const Logout = async(req,res) => {
    const { token } = req.body
    let u = await prisma.user.findFirst({ where: { token } })
    if (u){
        prisma.user.update({
            where:{ id:u.id},
            data:{ token:'' }
        }).then(d => console.log('Logout = ', u.pseudo))
        return res.json({logout:true})
    } else {
        return res.json({logout:false})
    }
}

const Register = async(req,res) => {
    const { email, pseudo, password } = req.body

    console.log('-- REGISTER --')

    if (!VMail(email)){
        res.send({error:'mail'})
        return
    }
    if (!VPseudo(pseudo)){
        res.send({error:'pseudo'})
        return
    }
    if (!VPassword(password)){
        res.send({error:'password'})
        return
    }

    console.log('-- VERIF OK --')
    const md5pwd = md5(passwordkey+password)

    console.log('Create User ',{
        data:{
            email,
            pseudo,
            password:md5pwd,
            token:'',
            group:0
        }
    })

    let u = await prisma.user.create({
        data:{
            email,
            pseudo,
            password:md5pwd,
            token:'',
            group:0
        }
    })
    if (u) return res.json({success:true})
    res.json(false)
}

const regUrl = RegExp('/api/auth')

const auth = async(req,res,next) => {
    if (!regUrl.test(req.url)) return next()
    switch (req.method){
        case 'GET':
            await GetUser(req,res)
            return
        case 'POST':
            await Register(req,res)
            return
        case 'PUT':
            await Login(req,res)
            return
        case 'DELETE':
            await Logout(req,res)
            return
    }
    next()
}

module.exports = auth