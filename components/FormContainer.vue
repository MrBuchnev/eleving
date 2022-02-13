<template>
  <div class="container">
    <StepsNav :steps="steps" :current-step="currentStep" />

    <FormContactInfo
      v-if="currentStep === 1"
      class="section-form"
      :current-step="steps[currentStep - 1]"
    />
  </div>
</template>

<script>
import StepsNav from '@/components/Form/StepsNav'
import FormContactInfo from '@/components/Form/FormContactInfo'

export default {
  name: 'FormContainer',

  components: {
    StepsNav,
    FormContactInfo
  },

  props: {
    steps: { type: Array, required: true, default: () => [] },
    currentStep: { type: Number, required: true, default: 1 }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-form {
  margin: 130px auto 0;
}
</style>
