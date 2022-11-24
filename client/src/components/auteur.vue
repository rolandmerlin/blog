<template>
    <span>{{ AN(props.user_id) }}</span>
</template>
<script setup lang="ts">
    import { useStore } from 'vuex'
    import { UserList } from '../type'
    const props = defineProps(['user_id'])
    const store = useStore()
    const AN = (user_id:number) => store.getters.Users.find((U:UserList)=>U.id==user_id)?.pseudo || 'Inconnu'
</script>