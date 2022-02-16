<template>
  <div class="container">
    <StepsNav :steps="steps" :current-step="currentStep" />

    <form class="form">
      <h1 class="form-heading">{{ steps[currentStep - 1] }}</h1>

      <FormContactInfo
        v-if="currentStep === 1"
      />

      <FormMembership
        v-if="currentStep === 2"
      />

      <FormOverview
        v-if="currentStep === 3"
      />

      <div class="btn-container">
        <NuxtLink
          v-if="currentStep !== 3"
          class="btn btn--primary"
          :to="nextStep"
        >
          Continue
        </NuxtLink>

        <button
          v-if="currentStep === 3"
          class="btn btn--primary"
          type="submit"
        >
          Submit
        </button>

        <NuxtLink
          v-if="currentStep !== 1"
          class="btn btn--secondary"
          :to="prevStep"
        >
          Back
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script>
import StepsNav from '@/components/Form/StepsNav'
import FormContactInfo from '@/components/Form/FormContactInfo'
import FormMembership from '@/components/Form/FormMembership'
import FormOverview from '@/components/Form/FormOverview'

export default {
  name: 'FormContainer',

  components: {
    StepsNav,
    FormContactInfo,
    FormMembership,
    FormOverview
  },

  props: {
    steps: { type: Array, required: true, default: () => [] },
    currentStep: { type: Number, required: true, default: 1 }
  },

  computed: {
    nextStep() {
      return this.currentStep === 1 ? '/form/membership' : '/form/overview'
    },

    prevStep() {
      return this.currentStep === 3 ? '/form/membership' : '/form/contact-info'
    },
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

.form-heading {
  font-family: $font-bold;
  font-size: 28px;
  line-height: 38px;
  color: $primary;
  margin-bottom: 16px;
}

.btn-container {
  margin-top: 32px;
}
</style>
