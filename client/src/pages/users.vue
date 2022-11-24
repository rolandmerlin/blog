<template>
    <div class="w-full">
        <h2 class="text-center font-bold text-xl">Utilisateurs</h2>
        &nbsp;<br>
        <template v-if="typeof user == 'object'">
            <div class="grid grid-cols-2 gap-2 leading-[48px] w-[640px] mx-auto border-2 p-4 border-gray-300">
                <label>#</label>
                    <span>{{user.id}}</span>
                <label>Pseudo</label>
                    <input type="text" v-model="user.pseudo" class="px-2">
                <label>Email</label>
                    <input type="text" v-model="user.email" class="px-2">
                <label>Groupe</label>
                    <select v-model="user.group">
                        <option v-for="gn in groupname" :key="'group_'+gn.id" :value="gn.id">{{gn.name}}</option>
                    </select>
                <span class="text-center"><button class="btn btn-primary" v-on:click="save()">Mettre à jour</button></span>
                <span class="text-center"><button class="btn btn-primary" v-on:click="user=false">Annuler</button></span>
            </div>
        </template>
        <template v-if="!user">
        <div class="gridUser">
            <b class="pl-2">#</b>
            <b>Pseudo</b>
            <b>Email</b>
            <b>Groupe</b>
            <b class="text-center">Action</b>
        </div>
        <template v-for="(u,i) in users" :key="'user_'+u.id">
        <div class="gridUser">
            <b class="pl-2">{{ u.id }}</b>
            <span>{{ u.pseudo }}</span>
            <span>{{ u.email }}</span>
            <span>{{ GroupName(u.group) }}</span>
            <span class="flex justify-center">
                <button class="btn btn-primary" v-on:click="load(u)" :disabled="checkCurrent(u.id)">Modifier</button>
            </span>
        </div>        
        </template>        
        </template>
    </div>
</template>
<script setup lang="ts">
    import { computed, ref } from 'vue'
    import { useStore } from 'vuex'
    import { groupname, GN } from '../data/user'
    import { DeleteUser, UpdateUser } from '../lib/api'
    import { UserAuth, UserList } from '../type'

    const store = useStore()

    const user = ref<UserList|boolean>(false)

    const currentUser = computed<UserAuth>(()=>store.getters.User) 

    const GroupName = (group:number) => groupname.find((gn:GN) => gn.id==group)?.name || 'invalid'

    const users = computed(()=>store.getters.Users)

    const load = (u:UserList) => {
        if (typeof currentUser.value !== 'object') return
        if (u.id==currentUser.value.id) return
        user.value = u
    }

    const deleteUser = (u:UserList) => {
        DeleteUser(u.id,()=>{

        })
    }

    const checkCurrent = (id:number=0) => {
        if (typeof currentUser.value !== 'object') return
        if (id==0){
            if (typeof user.value !== 'object') return
            return user.value.id === currentUser.value.id
        } else {
            return id === currentUser.value.id
        }
    }

    const save = () => {
        if (typeof user.value == 'object'){
            UpdateUser(user.value.id, user.value.email, user.value.pseudo, user.value.group,(o)=>{
                let U = store.getters.Users.map((u:UserList) => u.id==o.id?o:u)
                store.commit('Users',U)
                user.value = false
            })
        }

    }
</script>
<style lang="postcss" scoped>
    .gridUser {
        @apply grid grid-cols-[1fr_2fr_2fr_2fr_1fr] gap-4 leading-[48px] odd:bg-white/30 even:bg-white/70 m-1;
    }
</style>