<template>
  <div class="container">
    <StepsNav :steps="steps" :current-step="currentStep" />

    <FormContactInfo
      v-if="currentStep === 1"
      class="form"
      :current-step="steps[currentStep - 1]"
    />

    <FormMembership
      v-if="currentStep === 2"
      class="form"
      :current-step="steps[currentStep - 1]"
    />
  </div>
</template>

<script>
import StepsNav from '@/components/Form/StepsNav'
import FormContactInfo from '@/components/Form/FormContactInfo'
import FormMembership from '@/components/Form/FormMembership'

export default {
  name: 'FormContainer',

  components: {
    StepsNav,
    FormContactInfo,
    FormMembership
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

.form {
  width: 100%;
  max-width: 490px;
  background-color: $white;
  box-shadow: 0 3px 18px #00000029;
  border-radius: 16px;
  padding: 32px;
  margin: 130px auto 0;
}
</style>
