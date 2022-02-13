<template>
  <FormContainer :steps="steps" :current-step="currentStep" />
</template>

<script>
import FormContainer from '@/components/FormContainer'

export default {
  name: 'Overview',

  components: {
    FormContainer,
  },

  data() {
    return {
      steps: [ 'Personal info', 'Membership', 'Overview' ],
      currentStep: 3
    }
  }
}
</script>
