<template>
  <vb-progress-bar :progress="40" :falseProgress="10"></vb-progress-bar>
  wekjfwjef
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import vbProgressBar from '@/components/atom-components/vb-progress-bar.vue';

export default defineComponent({
  name: 'TestView',
  components: {
    vbProgressBar
  },
});
</script>
