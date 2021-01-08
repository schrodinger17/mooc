<template>
<!-- eslint-disable -->
  <div class="question">
    <!-- 这边是题目界面 -->
    <show connectComponent="question"></show>
  </div>
</template>
<script>
import show from "components/question/show.vue"
export default {
    name: 'Question',
    components: {
        show
    }
}
</script>