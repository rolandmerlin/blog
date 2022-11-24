const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const regUrl = RegExp('/api/blog')

const GetBlog = async(req,res) => {
    let u = null
    let options = {}
    const { filter, cat_id, id, take } = req.query
    if (req.query.page) options = { skip:(req.query.page*10), take:10 }
    if (req.body.cat_id) u = await prisma.blog.findMany({ where: { cat_id:req.body.cat_id }, ...options })
    if (req.query.filter){
        if (filter=='id')     u= await prisma.blog.find({  orderBy:[{ id:'desc' } ], where: { id }, ...options })
        if (filter=='cat_id') u= await prisma.blog.findMany({  orderBy:[{ id:'desc' } ], where: { cat_id }, ...options })
        if (filter=='last')   u= await prisma.blog.findMany({ orderBy:[{ id:'desc' } ], skip:0, take:1 })
        if (filter=='lasts')  u= await prisma.blog.findMany({ orderBy:[{ id:'desc' } ], skip:0, take:Number(take)||5 })
    } else u= await prisma.blog.findMany({ ...options })

    if (!u) return res.json({error:'Not Found'})
    res.json(u)
}
const PostBlog = async(req,res) => {
    const { titre, content, user_id, cat_id } = req.body
    let c = await prisma.blog.create({
        data:{
            titre,
            content,
            user_id,
            cat_id
        }
    })
    console.log(c)
    if (c) return res.json(c)
    res.json([])
}
const UpdateBlog = async(req,res) => {
    const { titre, content, user_id, cat_id, id } = req.body
    let c = await prisma.blog.update({
        where:{ id },
        data:{ titre, content, user_id, cat_id }
    })
    if (c) return res.json(c)
    res.json([])
}

const DeleteBlog = async(req,res) => {
    const { id } = req.query
    if (!id) return res.json({})
    let u = await prisma.blog.delete({ where:{ id:Number(id) } })
    if (u) return res.json(u)
    res.json([])
}

const category = async (req,res,next) => {
    if (!regUrl.test(req.url)) return next()
    switch(req.method){
        case 'GET':
            await GetBlog(req,res)
            return
        case 'POST':
            await PostBlog(req,res)
            return
        case 'PUT':
            await UpdateBlog(req,res)
            return
        case 'DELETE':
            await DeleteBlog(req,res)
            return
    }
    next()
    
}

module.exports = category