const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const regUrl = RegExp('/api/categorie')

const GetCategorie = async(res) => {
    res.json(await prisma.categorie.findMany())
}
const PostCategorie = async(req,res) => {
    const { name } = req.body
    let c = await prisma.categorie.create({ data:{ name } })
    
    if (c) return res.json(c)
    res.json({})
}
const UpdateCategorie = async(req,res) => {
    const { name, id } = req.body
    let c = await prisma.categorie.update({
        where:{ id },
        data:{ name }
    })
    console.log('PUT Categories',c)
    if (c) return res.json(c)
    res.json({})
}

const DeleteCategorie = async(req,res) => {
    const { id } = req.query
    let u = await prisma.Categorie.delete({ where:{ id:Number(id) } })
    if (u) return res.json(u)
    return res.json({})
}

const category = async (req,res,next) => {
    if (!regUrl.test(req.url)) return next()
    switch(req.method){
        case 'GET':
            await GetCategorie(res)
            return
        case 'POST':
            await PostCategorie(req,res)
            return
        case 'PUT':
            await UpdateCategorie(req,res)
            return
        case 'DELETE':
            await DeleteCategorie(req,res)
            return
    }
    next()
}

module.exports = category