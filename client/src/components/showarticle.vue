<template>
    <div>
        <div class="grid grid-cols-[1fr_1fr_3fr] p-2">
            <span><b>Auteur : </b><auteur :user_id="props.article.user_id"/></span>
            <span><b>Catégorie : </b><catname :cat_id="props.article.cat_id"/></span>
            <span><b>Titre : </b>{{ props.article.titre }}</span>
        </div>
        <hr/>
        <div>
            <markdown v-model="props.article.content"/>
        </div>
        &nbsp;<br>
        &nbsp;<br>
    </div>
</template>
<script setup lang="ts">
    import { useStore } from 'vuex'
    import { Categorie, UserList } from '../type'

    const props = defineProps(['article'])
    const store = useStore()
</script>