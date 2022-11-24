<template>
    <div>
        <h1 class="text-center font-bold text-2xl"><catname :cat_id="$route.params.id"/></h1><br>
        <articles :cat_id="$route.params.id"/>
    </div>
</template>
<script setup lang="ts">
    import articles from '../components/articles.vue'
    import { useStore } from 'vuex'
import { Categorie } from '../type';

    const store = useStore()

    const CatName = (cat_id:number) => {
        return store.getters.Categories.find((C:Categorie)=> C.id===cat_id)?.name || 'inconnue'
    }
</script>
<style lang="postcss">

</style>