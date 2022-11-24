<template>
    <div class="w-screen">
        <div class="text-right">
            <button class="btn btn-secondary mr-4" v-if="mode=='create'" v-on:click="Save()">Sauvegarder</button>
            <button class="btn btn-secondary mr-4" v-on:click="Save()" v-if="mode=='edit'">Mettre à jour</button>
            <button class="btn btn-primary" v-on:click="NouvelArticle()" v-if="!mode">Créer un article</button><button class="btn btn-primary" v-on:click="mode = '' " v-if="mode">Annuler</button>
        </div>
        &nbsp;<br>
        <div v-if="mode" class="bg-white border-2 py-4 article">
            <div class="grid grid-cols-2 leading-[48px]">
                <div class="form-control px-4">
                    <label class="input-group" style="--rounded-btn:0">
                        <span class="">Titre</span>
                        <input type="text" placeholder="Saisissez le titre ici" class="input input-bordered w-full" v-model="Article.titre"/>
                    </label>
                </div>
                <div>
                    <select class="select w-full max-w-xs rounded-none border-2 border-gray-200 mx-4" v-model="Article.cat_id">
                        <template v-for="(c,i) in Categories" :key="'cat_'+c.id">
                            <option :value="c.id">{{ c.name }}</option>
                        </template>
                    </select>
                </div>
                <div class="p-4">
                    <textarea class="w-full h-full px-1 outline-none border-2" rows="20" v-model="Article.content"></textarea>
                </div>
                <div class="p-4">
                    <markdown v-model="Article.content" class="h-full border-2"/>
                </div>
            </div>
        </div>
        <template v-if="!mode">
            <div class="flex flex-center w-full" v-if="NmbPage>1">
                <span v-for="np in NmbPage" :key="'np_'+np" :class="'inline-block px-4 py-2 mx-2 cursor-pointer border-2 border-gray-400 '+(((Page+1)==np)?' bg-blue-300 text-black':'bg-blue-700 text-white')" v-on:click="Page = np-1">{{ np }}</span>
            </div>
            &nbsp;
            <div class="grid grid-cols-[1fr_1fr_1fr_1fr_2fr] w-full bg-white/70">
                <span class="leading-[48px] px-2">#</span>
                <span class="leading-[48px]">titre</span>
                <span class="leading-[48px]">Auteur</span>
                <span class="leading-[48px]">Catégorie</span>
                <span class="leading-[48px] text-center">Action</span>
            </div>
            <template v-for="(a,i) in Articles" :key="'art_'+a.id">
            <div class="grid grid-cols-[1fr_1fr_1fr_1fr_2fr] w-full odd:bg-white/70 even:bg-white/30 my-1">
                <span class="leading-[48px] px-2">{{ a.id }}</span>
                <span class="leading-[48px]">{{ a.titre }}</span>
                <span class="leading-[48px]"><auteur :user_id="a.user_id"/></span>
                <span class="leading-[48px]"><catname :cat_id="a.cat_id"/></span>
                <span class="flex justify-around">
                    <button class="btn btn-primary" v-on:click="ModifierArticle(a)">Modifier</button>
                    <button class="btn btn-primary" v-on:click="EffacerArticle(a)">Supprimer</button>
                </span>
            </div>
        </template>

        </template>
    </div>
</template>
<script setup lang="ts">
    import { computed, ref, watch } from 'vue'
    import { ReadArticle, PostArticle, PutArticle, DeleteArticle } from '../lib/api'
    import { blogAllCount } from '../lib/stat'
    import { Blog,Categorie,UserAuth,AllStat } from '../type'

    import { useStore } from 'vuex'
    const store = useStore()

    let Users = store.getters.Users || []
    const User = computed<UserAuth|boolean>(()=>store.getters.User)
    if (!store.getters.User){
        window.router.push('/')
    } else {
        if (store.getters.User.group!==1) window.router.push('/')
    }

    const Articles = ref<Blog[]>([])
    ReadArticle(0,(o)=>{ Articles.value = o } )
    const Count = ref<number>(0)
    blogAllCount((o:AllStat)=>{
        Count.value = o.blogCount
        store.commit('AllStat',o)
    })

    const Page = ref<number>(0)
    const NmbPage = computed<number>(()=> 1+Math.floor((Count.value-1)/10) )
    watch(Page,()=>{ ReadArticle(Page.value,(o)=>{ Articles.value = o }) })

    let Article = ref({
        id:0,
        titre:'',
        content:'',
        user_id:0,
        cat_id:1
    })

    const NouvelArticle = () => {
        Article.value = {
            id:0,
            titre:' ',
            content:' ',
            user_id:store.getters.User.id,
            cat_id:1
        }
        mode.value = 'create'
    }

    const ModifierArticle = (A:Blog) => {
        Article.value = A
        mode.value = 'edit'
    }

    const EffacerArticle = (A:Blog) => {
        if (window.confirm(`Effacer l'article #${A.id} Titre : ${A.titre}\n Cliquez sur [OK] pour confirmer'`))
            DeleteArticle(A,(d)=>{
                ReadArticle(0,(o)=>{ Articles.value = o })
                blogAllCount((o:AllStat)=>{
                    Count.value = o.blogCount
                    store.commit('AllStat',o)
                })
            })
    }

    if (store.getters.User) { Article.value.user_id = store.getters.User.id }
    watch(() => store.getters.User, () => { Article.value.user_id = store.getters.User.id })
    watch(() => store.getters.Users, () => { Users = store.getters.Users })

    const mode = ref<string>('')

    const Categories = computed<Categorie[]>(()=> store.getters.Categories)

    const Save = () => {
        let D:Blog = { ...Article.value }
        if (!Article.value.id){
            PostArticle(D,(o)=>{
                mode.value = ''
                ReadArticle(Page.value,(o)=>{ Articles.value = o })
                blogAllCount((o:AllStat)=>{
                    Count.value = o.blogCount
                    store.commit('AllStat',o)
                })
            })
        } else {
            PutArticle(D,(o)=>{
                mode.value = ''
                ReadArticle(Page.value,(o)=>{ Articles.value = o })
                blogAllCount((o:AllStat)=>{
                    Count.value = o.blogCount
                    store.commit('AllStat',o)
                })
            })
        }
    }

</script>
