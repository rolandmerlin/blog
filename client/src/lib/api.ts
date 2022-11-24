import { Categorie, AllStat, UserList } from './../type';
import axios from 'axios'

import { ResponseLogout, Blog, User, UserAuth } from '../type'

let r = JSON.parse(localStorage.getItem('User') || '{ "token":""}')

axios.defaults.baseURL = 'http://127.0.0.1:3000/'
axios.defaults.headers.common={ token:r.token }

////////////////////// AUTH //////////////////////////

const Register = (pseudo:string,email:string,password:string,fn:(e:object)=>void) =>
        axios.post('/api/auth',{pseudo,email,password}).then(d=> fn(d.data))

const Login    = (email:string,password:string,fn:(e:object|boolean)=>void) =>
        axios.put('/api/auth',{email,password}).then(d=>{
            if (typeof d.data.token != 'undefined'){
                axios.defaults.headers.common.token = d.data.token
                console.log('LocalStore + CallBack')
                localStorage.setItem('User',JSON.stringify(d.data))
                fn(d.data)
            } else {
                fn(false)
            }
        })
const Logout   = (fn:(o:ResponseLogout)=>void) =>
    axios.delete('/api/auth').then(d => {
        if (d.data.logout) axios.defaults.headers.common.token = ''
        fn(d.data)
    })

const Current  = (fn:(e:object)=>void) => axios.get('/api/auth').then(d => fn(d))

//////////////////////// USER //////////////////////////

const CreateUser = (email:string, pseudo:string, password:string, fn:(e:Object)=>void) => {
    axios.post('/api/user',{ email,pseudo, password }).then(d => { fn(d.data) })
}

const ReadUser = (fn:(e:User)=>void) => { axios.get('/api/user').then(d => fn(d.data)) }

const UpdateUser = (id:number, email:string, pseudo:string, group:number, fn:(o:UserList)=>void) => {
    axios.put('/api/user',{ id, email, pseudo, group }).then(d => { fn(d.data) })
}

const DeleteUser = (id:number, fn:(e:object)=>void) => {
    axios.delete(`/api/user/${id}`).then(d => fn(d))
}

const checkUser = (fn:(e:User)=>void) => {
    axios.get('/api/check').then(d =>{
        if (d.data.token){
            localStorage.setItem('User',JSON.stringify(d.data))
            fn(d.data)
        }
    })
}

const SyncCheckUser = async () => {
    let u = (await axios.get('/api/check')).data
    return (typeof u.id == 'number')?u:false
}

const GetCat = (fn:(e:Categorie[])=>void) => {
    axios.get('/api/categorie').then(d => fn(d.data) )
}

const CreateCat = (name:string,fn:(e:Categorie)=>void) => {
    axios.post('/api/categorie',{ name }).then(d => fn(d.data) )
}
const UpdateCat = (id:number, name:string, fn:(e:Categorie)=>void) => {
    axios.put('/api/categorie',{id,name}).then(d => fn(d.data))
}

const DeleteCat = async(id:number,fn:(e:object)=>void) => {
    await axios.delete('/api/categorie?id='+String(id)).then(d => fn(d.data))
}

const ReadArticle = (page:number,fn:(o:Blog[])=>void) => {
    axios.get(`/api/blog?page=${page}`)
        .then(d => fn(d.data))
}

const ReadArticleCatId = (cat_id:number,page:number,fn:(o:Blog[])=>void)=>{
    axios.get('/api/blog?cat_id='+String(cat_id)+'&page'+String(page))
        .then(d => fn(d.data))
}

const ReadArticleId = (id:number,fn:(o:Blog)=>void)=>{
    axios.get('/api/blog?id='+String(id))
        .then(d => fn(d.data))
}

const ReadLastArticle = (fn:(o:Blog[])=>void) => {
    axios.get('/api/blog?filter=last')
        .then(d => fn(d.data))
}

const ReadLastsArticles = (fn:(o:Blog[])=>void) => {
    axios.get('/api/blog?filter=lasts&take=5')
        .then(d => fn(d.data))
}

const PostArticle = (data:Blog,fn:(o:Blog)=>void) => {
    axios.post('/api/blog',data)
        .then(d => fn(d.data) )
}

const PutArticle = (data:Blog,fn:(o:Blog)=>void) => {
    axios.put('/api/blog',data).then(d => fn(d.data))
}

const DeleteArticle = (data:Blog,fn:(o:Blog)=>void) => {
    axios.delete('/api/blog?id='+data.id).then(d => fn(d.data))
}

const SyncAllStat = async () => (await axios.get('/api/stat')).data

export {
        Register,
        Login,
        Logout,
        Current,

        CreateUser,
        ReadUser,
        UpdateUser,
        DeleteUser,

        GetCat,
        CreateCat,
        UpdateCat,
        DeleteCat,

        ReadArticle,
        ReadArticleCatId,
        ReadArticleId,
        ReadLastArticle,
        ReadLastsArticles,
        PostArticle,
        PutArticle,
        DeleteArticle,

        checkUser,
        SyncCheckUser,

        SyncAllStat
}