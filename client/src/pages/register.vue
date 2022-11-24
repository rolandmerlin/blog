<template>
    <div class="p-8 border-2 border-white bg-white/80 rounded-xl text-center">
        <form>
        <div class="text-2xl">S'enregistrer</div>
        &nbsp;<br>
        <div class="form-control">
            <label class="input-group">
                <span class="w-32">Nom</span>
                <input type="text" name="username" class="input input-bordered" v-model="pseudo"/>
            </label>
        </div>
        &nbsp;<br>
        <div class="form-control">
            <label class="input-group">
                <span class="w-32">Adresse Mail</span>
                <input type="text" placeholder="info@site.com" autocomplete="username" class="input input-bordered" v-model="email"/>
            </label>
        </div>
        &nbsp;<br>
        <div class="form-control">
            <label class="input-group">
                <span class="w-32">Mot de passe</span>
                <input type="password" class="input input-bordered" autocomplete="new-password" v-model="password"/>
            </label>
        </div>
        &nbsp;<br>
        <div class="form-control">
            <label class="input-group">
                <span class="w-32">Confirmer</span>
                <input type="password" class="input input-bordered" autocomplete="new-password" v-model="confirm"/>
            </label>
        </div>
        <div>&nbsp;</div>
        <div class="grid grid-cols-2">
            <div class="text-center"><button class="btn btn-primary" v-on:click.prevent="s_enregistrer()">S'enregistrer</button></div>
            <div class="text-center"><router-link to="/login" class="btn btn-secondary">S'authentifier</router-link></div>        
        </div>
        </form>
    </div>
</template>
<script setup lang="ts">

    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import { Register } from '../lib/api'

    const store = useStore()

    const pseudo = ref('')
    const email = ref('')
    const password = ref('')
    const confirm = ref('')

    const s_enregistrer = () => {
        if (password.value!=confirm.value) return
        Register(pseudo.value,email.value,password.value,(e:any)=>{
            store.commit('User',e)
            window.router.push('/')
        })
    }

    if (store.getters.User) window.router.push('/')
</script>