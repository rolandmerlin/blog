<template>
    <div class="p-8 border-2 border-white bg-white/80 rounded-xl text-center">
        <form>
        <div class="text-2xl">Se connecter</div>
        &nbsp;<br>
        <div class="form-control">
            <label class="input-group">
                <span class="w-32">Adresse Mail</span>
                <input type="text" name="email" placeholder="info@site.com" autocomplete="username" v-model="email" class="input input-bordered" />
            </label>
        </div>
        &nbsp;<br>
        <div class="form-control">
            <label class="input-group">
                <span class="w-32">Mot de passe</span>
                <input type="password" name="password" v-model="password" autocomplete="current-password" class="input input-bordered"/>
            </label>
        </div>
        <div>&nbsp;</div>
        <div class="grid grid-cols-2">
            <div class="text-center">
                <button class="btn btn-primary" v-on:click.prevent="SeConnecter">Se connecter</button>
            </div>
            <div class="text-center">
                <router-link to="/register" class="btn btn-secondary">S'enregistrer</router-link>
            </div>
        </div>
        </form>
        &nbsp;<br>
        <div class="flex justify-between">
            <button @click="LogAdmin()" class="btn btn-info">Admin</button>
            <button @click="LogFail()" class="btn btn-info">Fail</button>        
        </div>

    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import { Login } from '../lib/api'

    const email = ref('')
    const password = ref('')

    const store = useStore()

    const login = () => {}

    const SeConnecter = () => {
        Login(email.value,password.value,(e)=>{
            if (!e){
                alert('Les identifiants sont incorrects')
            } else {
                store.commit('User',e)
                window.router.push('/')                  
            }
        })
    }

    if (store.getters.User) window.router.push('/')

    const LogAdmin = () => {
        email.value = 'contact@merlinroland.fr'
        password.value = '0000'
    }
    const LogFail = () => {
        email.value = 'contact@authfail.fr'
        password.value = '1111'
    }
</script>
<style lang="postcss">

</style>