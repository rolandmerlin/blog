<template>
    <span>{{ CN(props.cat_id) }}</span>
</template>
<script setup lang="ts">
    import { useStore } from 'vuex'
    import { Categorie } from '../type'
    const props = defineProps(['cat_id'])
    const store = useStore()
    const CN = (cat_id:number) => store.getters.Categories.find((C:Categorie)=>C.id==cat_id)?.name || 'inconnue'
</script>