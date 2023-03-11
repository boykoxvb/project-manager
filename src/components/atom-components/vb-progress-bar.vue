<template>
    <div class="progress-bar">
        <div class="progress-bar-progress" :class="{'full-border' : progress == 100}" :style="{width: progress + '%'}"></div>
        <div class="progress-bar-falseProgress" :class="{'full-border' : falseProgress == 100}" :style="{width: falseProgress + '%'}"></div>
        <div class="progress-bar-remained" :class="{'full-border': progress == 0}" :style="{width: remained + '%'}"></div>
    </div>
</template>
  
<script lang="ts">

import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
    name: 'vb-progress-bar',
    props: {
        progress: { type: Number, default: 0, },
        falseProgress: { type: Number, default: 0, },
        height: { type: Number, default: 0, },
        color: { type: String, default: '#66cb38', },
    },

    setup(props) {
        const falseProgress = ref(props.falseProgress)

        // const remained = computed(() => {
        //     return 100 - progress - falseProgress
        // })

    }


})

</script>
  
  
<style lang="scss" scoped>
.progress-bar {

    --height: 0px;

    @keyframes bg-sliding {
        from {
            background-position: 0%;
        }
        to {
            background-position: -200%
        }
    }

    line-height: 0;
    margin: 0;

    &-progress {
        transition: 0.2s;
        display: inline-block;
        border-radius: 3px 0 0 3px;
        height: 7px;
        background-color: rgba($color: #66cb38, $alpha: 1.0)
    }

    &-falseProgress {
        transition: 0.2s;
        display: inline-block;
        // border-radius: 3px 0 0 3px;
        height: 7px;
        background: repeating-linear-gradient(
            45deg,
            #ccc 0 10px,
            #66cb38 10px 20px
        );
        background-size: 200%;
        animation: bg-sliding 3s infinite linear;
    }

    &-remained {
        transition: 0.2s;
        display: inline-block;
        border-radius: 0 3px 3px 0;
        height: 7px;
        background-color: rgba($color: #d3d3d3, $alpha: 1.0);
    }

    .full-border {
        border-radius: 3px;
    }


}

</style>
  