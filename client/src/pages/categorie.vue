<template>
    <div>
        <div class="grid grid-cols-2 gap-4 leading-[48px] w-[360px] mx-auto border-2 border-gray-300 p-4" v-if="typeof editCat === 'object'">
            <label class="font-bold">Id</label>
            <span>#<span v-if="editCat.id">{{editCat.id}}</span></span>
            <label class="font-bold">Nom de la catégorie</label>
            <input type="text" v-model="editCat.name" class="px-2"/>
            <div class="text-center"><button class="btn btn-primary" v-on:click="save">{{ editCat.id?'Mettre à jour':'Créer'}}</button></div>
            <div class="text-center"><button class="btn btn-primary" v-on:click="editCat = false">Annuler</button></div>
        </div>

        <template v-if="!editCat">
        <div class="leading-[48px] text-right px-2">
            <button class="btn btn-primary" v-on:click="nouvelCategorie">Nouvelle catégorie</button>
        </div>
        &nbsp;<br>
        <div class="grid grid-cols-4 w-[920px] odd:bg-white/30 even:bg-white/70 m-2 leading-[48px]">
            <div class="pl-2">#</div>
            <div>Name</div>
            <div>NB Article</div>
            <div class="text-center">Action</div>
        </div>
        <template v-for="c in cat" :key="'cat_'+c.id">
            <div class="grid grid-cols-4 w-[920px] odd:bg-white/30 even:bg-white/70 m-2 leading-[48px]">
                <span class="pl-2">{{ c.id }}</span>
                <span>{{ c.name }}</span>
                <span>{{ NbArticle(c.id) }}</span>
                <span class="flex justify-between">
                    <button class="btn btn-primary" v-on:click="editCat = c">Modifier</button>
                    <button class="btn btn-primary" :disabled="NbArticle(c.id)!=0" v-on:click="deleteCategorie(c)">Supprimer</button>
                </span>
            </div>
        </template> 
        </template>
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue'
    import { CreateCat, DeleteCat, GetCat, UpdateCat } from '../lib/api'
    import { blogAllCount } from '../lib/stat'
    import { useStore } from 'vuex'
    import { AllStat, Categorie } from '../type'

    const store = useStore()

    const bcc = ref<AllStat>({ "blogCatCount": [], "blogCount": 0 })
    const cat = ref<Categorie[]>([])

    const editCat = ref<Categorie|boolean>(false)

    const NbArticle = (cat_id:number) => bcc.value.blogCatCount.find((b) => cat_id===b.cat)?.count||0

    const nouvelCategorie = () => { editCat.value = { id:0, name:'' } }

    const save = () => {
        if (typeof editCat.value == 'boolean') return
        if (editCat.value.id===0){
            CreateCat(editCat.value.name,(c:Categorie)=>{
                cat.value = [ ...cat.value, c ]
                store.commit('Categories',cat.value)
                editCat.value = false
            })
        } else {
            UpdateCat(editCat.value.id,editCat.value.name,(e:Categorie)=>{
                let Categories = store.getters.Categories.map((c:Categorie) => (c.id==e.id)?e:c )
                cat.value = Categories
                store.commit('Categories',Categories)
                editCat.value = false
            })
        }
    }

    const deleteCategorie = (c:Categorie) => {
        DeleteCat(c.id,()=>{
            GetCat(d => {
                cat.value = d
                store.commit('Categories',d)
            })
        })
    }

    if (store.getters.Categories.length>1){
        cat.value = store.getters.Categories
    } else {
        GetCat(d => {
            cat.value = d
            store.commit('Categories',d)
        })
    }
    
    blogAllCount(d => { bcc.value = d })
</script>
<style lang="postcss">

</style>