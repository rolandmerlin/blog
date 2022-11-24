const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const Stat_Cat = async() =>
    (await prisma.blog.groupBy({
        by:['cat_id'],
        _count:{ cat_id:true }
    })).map(c => ({ cat:c.cat_id, count:c._count.cat_id }))    

const Stat_Article = async() => await prisma.blog.count()

const urlStat = new RegExp('/api/stat')
const Stat = async(req,res,next) => {
    if (req.method!=="GET")    return next()
    if (!urlStat.test(req.url)) return next()

    const { stat } = req.query

    switch( stat ){
        case 'blogCatCount':
            return res.json({ "blogCatCount":await Stat_Cat() })
        case 'blogCount':
            return res.json({ "blogCount": await Stat_Article() })
        default:
            return res.json({
                "blogCatCount":await Stat_Cat(),
                "blogCount": await Stat_Article()
            })
    }
}

module.exports = Stat