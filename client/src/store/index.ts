import { UserAuth, AllStat } from './../type';
import { SyncAllStat, SyncCheckUser } from '../lib/api'

import { InjectionKey } from "vue"
import { createStore, Store } from 'vuex'

export interface State {
    User:UserAuth
    Users:{
        id:number
        pseudo:string
        email:string
    }[]
    Categories:{
        id:number
        name:string
    }[]
    Articles:{
        id:number
        titre:string
        content:string
        user_id:number
        cat_id:number
    }[]
    AllStat:AllStat
}

let User:UserAuth = await SyncCheckUser()

let AllStat:AllStat = await SyncAllStat()

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state:{
        User,
        Users:[],
        Categories:[],
        Articles:[],
        AllStat,
    },
    getters:{
        User:(state)=>state.User,
        Users:(state)=>state.Users,
        User_id:(state,id:number)=>state.Users.find(u => u.id==id),
        Categories:(state)=>state.Categories,
        Articles:(state)=>state.Articles,
        AllStat:(state)=>state.AllStat,
    },
    mutations:{
        User:(state,user)=>state.User=user,
        Users:(state,users)=>state.Users = users,
        Categories:(state,cats)=>state.Categories = cats,
        Articles:(state,articles)=>state.Articles = articles,
        AllStat:(state,allStat)=>state.AllStat = allStat,
    }
})