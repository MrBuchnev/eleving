<template>
  <FormContainer :steps="steps" :current-step="currentStep" />
</template>

<script>
import FormContainer from '@/components/FormContainer'

export default {
  name: 'Membership',

  components: {
    FormContainer,
  },

  data() {
    return {
      steps: [ 'Personal info', 'Membership', 'Overview' ],
      currentStep: 2
    }
  }
}
</script>
