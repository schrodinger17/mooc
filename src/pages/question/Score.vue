<template>
<!-- eslint-disable -->
  <div class="">
    <show connectComponent="score"></show>
  </div>
</template>
<script>
import show from "components/question/show.vue"
export default {
    name: 'Score',
    components: {
        show
    }
}
</script>