<template>
    <transition :name="name">
        <slot></slot>
    </transition>
</template>
  
<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent ({
    name: 'vb-transition',
    props: {
        name: { type: String, required: true },
    },
    setup(props) {
        const name = props.name
        return {
            name
        }
    }
    
})
</script>
  
<style lang="scss" scoped>

//fade
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>

  