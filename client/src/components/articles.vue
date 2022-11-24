<template>
    <div>
    <h2>{{  }}</h2>
    <template v-for="Article in Articles" :key="'art_'+Article.id">
        <showarticle :article="Article"/>
    </template>
    </div>
</template>
<script setup lang="ts">
    import showarticle from '../components/showarticle.vue'
    import { useStore } from 'vuex'
    import { ref,computed } from 'vue'
    import { ReadArticleCatId } from '../lib/api'
    import { Blog, User } from '../type'

    const props = defineProps(['cat_id'])

    const store = useStore()

    const Articles = ref<Blog[]|boolean>(false)

    ReadArticleCatId(props.cat_id,0,(art)=> { if (art.length>0) Articles.value = art })
</script>
<style lang="postcss">

</style>