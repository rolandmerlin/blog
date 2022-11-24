const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const cors = require('cors')
const { exists, readFileSync } = require('fs')
app.use(cors({ origin:'*' }))

/// Data Parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

try {
    /// WEB
    app.use(express.static(__dirname+'/../client/dist')) 
   
    const crud = require('./api/crud')
    app.use(crud)

    /// API
    const category = require('./api/categorie.js')
    app.use(category)

    const user = require('./api/user.js')
    app.use(user)

    const blog = require('./api/blog.js')
    app.use(blog)

    const auth = require('./api/auth.js')
    app.use(auth)

    const check = require('./api/check')
    app.use(check)

    const stat = require('./api/stat')
    app.use(stat)
/*
    const err404 = require('./api/err404')
    app.use(err404)*/

} catch (e){
    app.use((req,res,next)=>{
        console.log(req.method+' > '+req.url)
        console.log("====================================")
        console.log('BODY = ',req.body)
        console.log('QUERY = ',req.query)
        console.log('HEADERS = ',req.headers)
        console.log("====================================")
        console.log(" ")
        console.log(" ")
        next()
    })
    console.log(e)
}

const https= require('https')

exists('./cert/server.key',(e)=>{
    if (e){
        console.log('---- RUN SERVER IN HTTPS MODE ----')
        console.log('http://{url}:3443')
        const options = {
            key:readFileSync('./cert/server.key','utf-8'),
            cert:readFileSync('./cert/server.crt','utf-8')
        }
        const httpsServer = https.createServer(options,app)
        httpsServer.listen(3443)
    } else {
        console.log('WARNING : ---- RUN SERVER IN HTTP MODE ----')
        console.log('http://{url}:3000')
        app.listen(3000)
    }
})

