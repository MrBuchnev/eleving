<template>
  <div class="container">
    <StepsNav :steps="steps" :current-step="currentStep" />

    <form class="form">
      <transition name="fade">
        <div v-if="formSendSuccess" class="form-status form-status--success">
          Form sent successfully!
        </div>
      </transition>

      <transition name="fade">
        <div v-if="formSendError" class="form-status form-status--error">
          {{ formSendError }}
        </div>
      </transition>

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
          type="button"
          @click="handleSubmit"
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

  data() {
    return {
      formSendSuccess: '',
      formSendError: ''
    }
  },

  watch: {
    formSendSuccess() {
      if (this.formSendSuccess.length) {
        setTimeout(() => {
          this.formSendSuccess = ''
        }, 3000)
      }
    },

    formSendError() {
      if (this.formSendError.length) {
        setTimeout(() => {
          this.formSendError = ''
        }, 3000)
      }
    }
  },

  computed: {
    nextStep() {
      return this.currentStep === 1 ? '/form/membership' : '/form/overview'
    },

    prevStep() {
      return this.currentStep === 3 ? '/form/membership' : '/form/contact-info'
    },
  },

  methods: {
    async handleSubmit() {
      const usedPhoneNumbers = {}

      this.$store.state.usedPhoneTypes.forEach((item, i) => {
        usedPhoneNumbers[`phone${item}`] = this.$store.state[`phone${this.capitalize(item)}`]
      });

      const data = {
        firstname: this.$store.state.firstname,
        lastname: this.$store.state.lastname,
        email: this.$store.state.email,
        membership: this.$store.state.memberships.find(item => item.selected).label,
        ...usedPhoneNumbers
      }

      this.$axios.$post('/api', JSON.stringify(data))
        .then(response => {
          this.formSendError = ''
          this.formSendSuccess = 'success'
        })
        .catch(error => {
          this.formSendSuccess = ''
          this.formSendError = error.message;
        })
    },

    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
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
  position: relative;
  width: 100%;
  max-width: 490px;
  background-color: $white;
  box-shadow: 0 3px 18px #00000029;
  border-radius: 16px;
  padding: 32px;
  margin: 130px auto 0;
}

.form-status {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 32px;
  color: $white;
  padding: 0 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  &--success {
    background-color: $green;
  }

  &--error {
    background-color: $red;
  }
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
