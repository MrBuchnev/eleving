<template>
  <div class="container">
    <StepsNav :steps="steps" :current-step="currentStep" />
  </div>
</template>

<script>
import StepsNav from '@/components/Form/StepsNav'

export default {
  name: 'FormContainer',

  components: {
    StepsNav
  },

  data() {
    return {
      steps: [ 'Personal info', 'Membership', 'Overview' ],
      currentStep: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: 100px auto 0;
}
</style>
