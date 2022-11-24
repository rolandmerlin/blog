<template>
    <div v-html="resultat" class="article p-2 text-left"></div>
</template>
<script setup lang="ts">
    import { ref, watch } from 'vue'
    import markdownit from 'markdown-it'
    const props = defineProps<{
        modelValue:string
    }>()

    let MarkDownIT = new markdownit({
        html:true,
        linkify:true,
        typographer:true,
        breaks:true,
    }).enable(['link']).enable('image')

    const resultat = ref(MarkDownIT.render(props.modelValue+''))

    watch(()=>props.modelValue,()=>{ resultat.value = MarkDownIT.render(props.modelValue+'') })
</script>