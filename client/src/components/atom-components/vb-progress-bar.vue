<template>
    <div class="progress-bar" id="vbProgressBar">
        <div 
            class="progress-bar-progress left-border" 
            :class="{'full-border': progress == 100}" 
            :style="{width: progress + '%'}">
        </div>
        <div 
            class="progress-bar-falseProgress" 
            :class="{'left-border' : falseProgress >= 0 && progress == 0, 'right-border': falseProgress >= 0 && remained == 0}" 
            :style="{width: falseProgress + '%'}">
        </div>
        <div 
            class="progress-bar-remained right-border" 
            :class="{'left-border' : remained == 100, 'right-border': remained >= 0}" 
            :style="{width: remained + '%'}">
        </div>
    </div>
</template>
  
<script lang="ts">

import { defineComponent, computed, onMounted } from 'vue'

export default defineComponent({
    name: 'vb-progress-bar',
    props: {
        progress: { type: Number, default: 0, required: true},
        falseProgress: { type: Number, default: 0, },
        height: { type: Number, default: 10, },
        color: { type: String, default: '#66cb38', },
        secondColor: { type: String, default: '#d3d3d3'}
    },

    setup(props) {

        onMounted(() => {
            const container = document.getElementById('vbProgressBar')
            container?.style.setProperty("--height", String(props.height) + 'px')
            container?.style.setProperty("--color", props.color)
            container?.style.setProperty("--second-color", props.secondColor)
        })

        const remained = computed(() => {
            return 100 - props.progress - props.falseProgress
        })

        return {
            remained
        }

    }


})

</script>
  
  
<style lang="scss" scoped>
.progress-bar {

    --height: 10px;
    --color: #66cb38;
    --second-color: #d3d3d3;

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
        height: var(--height);
        background-color: var(--color)
    }

    &-falseProgress {
        transition: 0.2s;
        display: inline-block;
        height: var(--height);
        background: repeating-linear-gradient(
            -90deg,
            var(--second-color) 0 50%,
            var(--color) 50% 100%
        );
        background-size: 200% 200%;
        animation: bg-sliding 1s infinite linear;
    }

    &-remained {
        transition: 0.2s;
        display: inline-block;
        height: var(--height);
        background-color: var(--second-color);
    }



    
    .full-border {
        border-radius: calc(var(--height)/2);
    }

    .left-border {
        border-top-left-radius: calc(var(--height)/2);
        border-bottom-left-radius: calc(var(--height)/2);
    }

    .right-border {
        border-top-right-radius: calc(var(--height)/2);
        border-bottom-right-radius: calc(var(--height)/2);
    }


}

</style>
  