<template>
  <div class="icon-timer">
    <v-icon
      v-if="!isTimerStarted"
      @click.stop="startTimer()"
      icon="mdi-delete-outline"
      size="small"
    >
    </v-icon>
    <div v-if="isTimerStarted" @click.stop="stopTimer()" class="timer">
      {{ time }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'vb-icon-timer',
  props: {
    icon: { type: String, default: 'mdi-delete-outline', required: false },
    timer: { type: Number, default: 3, required: false },
  },

  setup(props, { emit }) {
    const time = ref(props.timer)
    const isTimerStarted = ref(false)

    const timer = ref(0)

    const startTimer = () => {
      isTimerStarted.value = true
      timer.value = setInterval(() => {
        time.value = time.value - 1
        if (time.value == 0) {
          stopTimer()
          emit('timeout')
        }
      }, 1000)
    }

    const stopTimer = () => {
      clearInterval(timer.value)
      time.value = props.timer
      isTimerStarted.value = false
    }

    return {
      startTimer,
      stopTimer,
      isTimerStarted,
      time,
    }
  },
})
</script>

<style lang="scss" scoped>
.icon-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;

  max-height: 18.75px;
  height: 18.75px;
  max-width: 18.75px;
  width: 18.75px;
  padding: 0;
  margin: 0;

  &:hover {
    transition: 0.3s;
    background-color: rgba(143, 150, 155, 0.39);
  }
}
</style>
