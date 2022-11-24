const { PrismaClient } = require('@prisma/client')
const { REGISTER_INSTANCE } = require('ts-node')
const prisma = new PrismaClient()

const VerifAuth = async(token) => {
    if (!token) return false
    let u = await prisma.user.findFirst({ where: { token } })
    if (typeof u.id == 'number') return {id:u.id,group:u.group}
    return false
}

const regUser = RegExp('/api/user')
const CrudUser = async(req,token) => {
    switch (req.method){
        case 'POST':    /// Création de compte
            return await VerifAuth(token).group == 1
        case 'GET':     /// Lecture des pseudo,id des comptes
            return true
        case 'PUT':     /// Mise à jour d'un compte
            return await VerifAuth(token).group == 1
        case 'DELETE':  /// Suppression de compte
            return await VerifAuth(token).group == 1
    }
}

const regCat  = RegExp('/api/categorie')
const CrudCat = async(req,token) => {
    switch (req.method){
        case 'GET':     /// Lecture des catégorie
            return true
        case 'POST':    /// Création de catégorie    
        case 'PUT':     /// Mise à jour des catégorie
        case 'DELETE':  /// Suppression des catégories
            return VerifAuth(token)?.group==1
    }
}

const regBlog = RegExp('/api/blog')
const CrudBlog = async(req,token) => {
    switch (req.method){
        case 'GET':
            return true
        case 'POST':
        case 'PUT':
        case 'DELETE':
            return await VerifAuth(token)!==false
    }
}

const regAuth = RegExp('/api/auth')
const CrudAuth = async(req,token) => {
    switch (req.method){
        case 'POST':        /// S'enregistrer
            return true
        case 'GET':         /// Info Current User
            return await VerifAuth(token)!==false
        case 'PUT':         /// Login
            return true
        case 'DELETE':      /// Logout
            return true
    }
}

const regCheck = RegExp('/api/check')
const CrudCheck = async(req,token) => {
    switch (req.method){
        case 'GET':
            return true
        case 'POST':
        case 'PUT':
        case 'DELETE':
            return false
    }
}

const regAPI = RegExp('/api/')
const CrudAPI = (req) => regAPI.test(req.url)

const regStat = RegExp('/api/stat')

module.exports = (req,res,next) => {
    let token = req.headers.token||''
    let pass = false

    if (!CrudAPI(req)){
        console.log(' ')
        console.log('No API Request')
        return next()
    }

    if (regAuth.test(req.url))  pass = CrudAuth(req,token)
    if (regBlog.test(req.url))  pass = CrudBlog(req,token)
    if (regCat.test (req.url))  pass = CrudCat (req,token)
    if (regUser.test(req.url))  pass = CrudUser(req,token)
    if (regUser.test(req.url))  pass = CrudUser(req,token)
    if (regCheck.test(req.url)) pass = CrudCheck(req,token)
    if (regStat.test(req.url))  pass = true

    if (!pass) console.log('Query refusé')

    if (pass) return next()
    res.send('API : error404')
}