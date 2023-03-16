<template>
    <div id="root-icon-base-element">
        <svg class="icon" :class="{'icon-button' : button}" :viewBox="'0 0 ' + width + ' ' + width">
            <slot class="svg" v-if="!filled"></slot>
            <slot class="svg" name="filled" v-if="filled"></slot>
        </svg>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent ({
    name: 'vbi-icon-button-base',
    props: {
        color: { type: String, default: '#000000' },
        button: { type: Boolean },
        filled: { type: Boolean },
        width: { type: [Number, String], default: 32 },
    },

    setup(props) {

        onMounted(() => {
            document.getElementById('root-icon-base-element')?.style.setProperty("--main-color", props.color)
            document.getElementById('root-icon-base-element')?.style.setProperty("--width", String(props.width) + 'px')
        })
    }

})

</script>


<style scoped>

#root-icon-base-element {
    --main-color: #000000;
    --width: 32px;
    width: var(--width);
    height: var(--width);
}

.icon {
    display: block;
    width: 100%;
    height: 100%;
    fill: var(--main-color);
    fill-opacity: 50%;
}

.icon-button {
    cursor: pointer;
}

.icon-button:hover {
    fill: var(--main-color);
    fill-opacity: 100%;
}

.svg {
    width: 100%;
    height: 100%;
}


</style>
