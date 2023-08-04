<template>
  <router-view />
</template>

<script>
import { useStore } from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()

    return {}
  },
})
</script>

<style lang="scss"></style>
