<template>
  <div class="p-4 fixed top-0 left-0 right-0 z-10">
    <div class="navbar bg-base-100 border-2 border-gray-300">
		<div class="flex-1">
			<router-link to="/" class="btn btn-ghost normal-case text-xl">Blog</router-link>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal p-0">
			<li><router-link to="/">Acceuil</router-link></li>
			<li tabindex="0">
				<span class="cursor-default">
					Catégories
					<svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
				</span>
				<ul class="p-2 bg-base-100">
					<template v-for="(c,i) in categories" :key="'cat_'+c.id">
						<li v-if="NbArticle(c.id)>0">
							<router-link :to="'/blog/'+c.id">{{c.name}} ({{NbArticle(c.id)}})</router-link>
						</li>
					</template>
				</ul>
			</li>
			<template v-if="user">
			<template v-if="user.group == 1">
			<li>
				<span class="cursor-default">
					Admin
					<svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
				</span>
				<ul class="p-2 bg-base-100">
					<li><router-link to="/categorie">Catégorie</router-link></li>
					<li><router-link to="/article">Articles</router-link></li>
					<li><router-link to="/user">Utilisateurs</router-link></li>
				</ul>
			</li>
			</template>
			</template>
			<li><router-link to="/a-propos">A propos de</router-link></li>
			<li><router-link to="/login" v-if="!user">Se connecter</router-link></li>
			<li><span v-if="user" v-on:click="_Logout">Quitter</span></li>
        </ul>
      </div>
    </div>  
  </div>
</template>
<script setup lang="ts">
    import { computed } from 'vue'
    import { useStore } from 'vuex'
	import { Logout } from '../lib/api'
	import { BlogCatCount, Categorie, ResponseLogout } from '../type'

    const store = useStore()

    const user = computed(()=>store.getters.User)
	const categories = computed<Categorie[]>(()=>store.getters.Categories)

	const NbArticle = (cat_id:number):number =>
		store.getters.AllStat.blogCatCount.find((bcc:BlogCatCount) => bcc.cat === cat_id)?.count || 0

	const _Logout = () => {
		Logout(function(e:ResponseLogout){
			if (e.logout){
				store.commit('User',null)
				window.router.push('/')
			}
		})
	}
</script>
<style lang="scss">

</style>