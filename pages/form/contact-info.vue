<template>
  <FormContainer :steps="steps" :current-step="currentStep" />
</template>

<script>
import FormContainer from '@/components/Form/FormContainer'

export default {
  name: 'ContactInfo',

  components: {
    FormContainer,
  },

  data() {
    return {
      steps: [ 'Personal info', 'Membership', 'Overview' ],
      currentStep: 1
    }
  }
}
</script>
