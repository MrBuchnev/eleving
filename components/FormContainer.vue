<template>
  <div class="container">
    <StepsNav :steps="steps" :current-step="currentStep" />

    <FormContactInfo
      v-if="currentStep === 1"
      class="form"
      :form-data="formData"
      :current-step="steps[currentStep - 1]"
      @field-value-change="handleInputValueChange"
      @phone-value-change="handlePhoneValueChange"
      @handle-phone-add-or-delete="handlePhoneAddOrDelete"
    />

    <FormMembership
      v-if="currentStep === 2"
      class="form"
      :memberships="formData.memberships"
      :current-step="steps[currentStep - 1]"
      @radio-value-change="handleRadioValueChange"
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

  data() {
    return {
      formData: {
        fields: [
          {
            type: 'text',
            label: 'First name',
            name: 'firstname',
            value: ''
          },
          {
            type: 'text',
            label: 'Last name',
            name: 'lastname',
            value: ''
          },
          {
            type: 'email',
            label: 'E-mail',
            name: 'email',
            value: ''
          },
        ],

        phones: [
          {
            type: 'home',
            value: ''
          },
          {
            type: 'work',
            value: ''
          },
          {
            type: 'mobile',
            value: ''
          },
          {
            type: 'main',
            value: ''
          },
          {
            type: 'other',
            value: ''
          }
        ],

        usedPhoneTypes: [
          'home',
          'work'
        ],

        availablePhoneTypes: [
          'mobile',
          'main',
          'other'
        ],

        memberships: [
          {
            label: 'regular',
            selected: true
          },
          {
            label: 'premium',
            selected: false
          }
        ]
      }
    }
  },

  props: {
    steps: { type: Array, required: true, default: () => [] },
    currentStep: { type: Number, required: true, default: 1 }
  },

  methods: {
    handleInputValueChange(field, val) {
      const changedField = this.formData.fields.find(item => item.name === field.name)
      changedField.value = val
    },

    handlePhoneValueChange(phone, val) {
      const changedPhone = this.formData.phones.find(item => item.type === phone)
      changedPhone.value = val
    },

    handlePhoneAddOrDelete(used, available) {
      this.usedPhoneTypes = used
      this.availablePhoneTypes = available
    },

    handleRadioValueChange(val) {
      this.formData.memberships.forEach(item => item.selected = false)
      this.formData.memberships.find(item => item.label === val).selected = true
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
  width: 100%;
  max-width: 490px;
  background-color: $white;
  box-shadow: 0 3px 18px #00000029;
  border-radius: 16px;
  padding: 32px;
  margin: 130px auto 0;
}
</style>
