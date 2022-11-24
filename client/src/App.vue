<template>
    <div class="App--bg">
        <navigation/>
        <div class="h-20 block">&nbsp;</div>
        <div class="App--view">
            <router-view/>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { GetCat, ReadUser } from './lib/api'
    import navigation from './components/navigation.vue'

    import { useStore } from 'vuex'
    const store = useStore()

    GetCat(d => { store.commit('Categories',d) })
    ReadUser((d)=> store.commit('Users',d) )
</script>
<style lang="postcss">
    html,body {
        @apply w-full min-h-full;
    }
    .App--bg {
        @apply bg-blue-100 min-h-screen;
    }
    .App--view {
        @apply flex justify-center items-start p-4;
        min-height:calc(100vh - 80px);
        height:100%;
    }
    body {
        @apply bg-blue-100;
    }

</style>