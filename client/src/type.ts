
export type Blog = {
    id:number
    titre:string
    content:string
    cat_id:number
    user_id:number
}
  
export type Commentaire = {
    id:number
    email:string
    content:string
    token:string
    blog_id:number
}
  
export type Categorie = {
    id:number
    name:string
}

export type ResponseLogout = {
    logout:object
}

export type User = {
    id?:number
    email:string
    pseudo:string
    password?:string
    group?:number
    token?:string
}

export type UserAuth = {
    id:number
    pseudo:string
    email:string
    group:number
    token:string
}|boolean

export type BlogCatCount = {
    cat:number
    count:number
}

export type BlogCount = {
    blogCount:number
}

export type AllStat = {
    blogCatCount:BlogCatCount[]
    blogCount:number
}

export type UserList = {
    id:number
    pseudo:string
    email:string
    group:number
}