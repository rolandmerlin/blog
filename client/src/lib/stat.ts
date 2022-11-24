import { AllStat, BlogCatCount, BlogCount } from './../type';
import axios from 'axios'

const blogCatCount = (fn:(o:BlogCatCount[])=>void):void => {
    axios.get('/api/stat?stat=blogCatCount').then(d => { fn(d.data) })
}

const blogCount = (fn:(o:BlogCount)=>void):void => {
    axios.get('/api/stat?stat=blogCount').then(d => { fn(d.data) })
}

const blogAllCount = (fn:(o:AllStat)=>void):void => {
    axios.get('/api/stat').then(d => { fn(d.data) })
}

export {
    blogCatCount,
    blogCount,
    blogAllCount
}