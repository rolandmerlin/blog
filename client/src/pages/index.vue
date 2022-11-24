<template>
    <div>
        <span v-if="typeof Articles == 'object'">
            <div class="p-2 text-center font-bold text-2xl">Derniers Articles ({{ Articles.length }}) :</div><br>
            <template v-for="Article in Articles" :key="'articles_'+Article.id">
                <showarticle :article="Article"/>
            </template>
        </span>
    </div>
</template>
<script setup lang="ts">
    import showarticle from '../components/showarticle.vue'
    import { useStore } from 'vuex'
    import { ref,computed } from 'vue'
    import { ReadLastsArticles } from '../lib/api'
    import { Blog, User } from '../type'

    const store = useStore()

    const Articles = ref<Blog[]|boolean>(false)

    const QstArticle = computed( ()=>typeof Articles.value == 'object' )
    const Auteur     = (user_id:number|undefined) => store.getters.Users.find((u:User) => u.id==user_id)?.pseudo

    ReadLastsArticles((art)=> { if (art.length>0) Articles.value = art })
</script>