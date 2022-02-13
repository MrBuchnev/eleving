<template>
  <form class="form" @submit="handleSubmit" novalidate>
    <h1 class="form-heading">{{ currentStep }}</h1>

    <Input
      v-for="field in fields"
      :key="field.name"
      :type="field.type"
      :label="field.label"
      :id="field.name"
      :name="field.name"
    />

    <Input
      v-for="phone in usedPhoneTypes"
      :key="phone"
      type="tel"
      label="Phone"
      :id="`phone-${phone}`"
      :name="`phone-${phone}`"
      :selected-option="phone"
      :dropdown-options="availablePhoneTypes"
      @select-option="handleSelectPhone"
      @remove-field="handleRemovePhone"
    />

    <button
      v-if="availablePhoneTypes.length"
      class="form-add-phone"
      type="button"
      @click="handleAddPhone"
    >
      Add phone
    </button>

    <div class="btn-container">
      <NuxtLink
        v-if="currentStep !== 'Overview'"
        class="btn btn--primary"
        :to="nextStep"
      >
        Continue
      </NuxtLink>

      <button
        v-if="currentStep === 'Overview'"
        class="btn btn--primary"
        type="submit"
      >
        Submit
      </button>

      <NuxtLink
        v-if="currentStep !== 'Personal info'"
        class="btn btn--secondary"
        :to="prevStep"
      >
        Back
      </NuxtLink>
    </div>
  </form>
</template>

<script>
import Input from '@/components/Form/Input'

export default {
  name: 'FormContactInfo',

  components: {
    Input
  },

  props: {
    currentStep: { type: String, required: true, default: '' }
  },

  data() {
    return {
      fields: [
        {
          type: 'text',
          label: 'First name',
          name: 'firstname'
        },
        {
          type: 'text',
          label: 'Last name',
          name: 'lastname'
        },
        {
          type: 'email',
          label: 'E-mail',
          name: 'email'
        },
      ],

      usedPhoneTypes: [
        'Home',
        'Work'
      ],

      availablePhoneTypes: [
        'Mobile',
        'Main',
        'Other'
      ]
    }
  },

  computed: {
    nextStep() {
      return this.currentStep === 'Personal info' ? '/form/membership' : '/form/overview'
    },

    prevStep() {
      return this.currentStep === 'Overview' ? '/form/membership' : '/form/contact-info'
    }
  },

  methods: {
    handleSubmit() {
      e.preventDefault()
      console.log('Submitting form...');
    },

    handleSelectPhone(prevOption, currentOption) {
      const prevOptionIndex = this.usedPhoneTypes.indexOf(prevOption);
      const currentOptionIndex = this.availablePhoneTypes.indexOf(currentOption);

      this.usedPhoneTypes.splice(prevOptionIndex, 1, currentOption);
      this.availablePhoneTypes.splice(currentOptionIndex, 1, prevOption);
    },

    handleRemovePhone(phone) {
      const phoneType = phone.split('phone-').pop()
      const index = this.usedPhoneTypes.indexOf(phoneType);

      this.usedPhoneTypes.splice(index, 1);
      this.availablePhoneTypes.push(phoneType);
    },

    handleAddPhone() {
      this.usedPhoneTypes.push(this.availablePhoneTypes[0]);
      this.availablePhoneTypes.splice(0, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 490px;
  background-color: $white;
  box-shadow: 0 3px 18px #00000029;
  border-radius: 16px;
  padding: 32px;
}

.form-heading {
  font-family: $font-bold;
  font-size: 28px;
  line-height: 38px;
  color: $primary;
  margin-bottom: 16px;
}

.form-add-phone {
  text-align: left;
  font-family: $font-bold;
  font-size: 18px;
  line-height: 24px;
  color: $primary;
  margin-top: 16px;
}

.btn-container {
  margin-top: 32px;
}

.btn {
  display: block;
  text-align: center;
  width: 100%;
  border: 2px solid;
  border-radius: 8px;
  font-family: $font-bold;
  font-size: 28px;
  line-height: 60px;
  transition: background-color 0.2 linear, color 0.2s linear;

  & + & {
    margin-top: 24px;
  }

  &--primary {
    border-color: $primary;
    background-color: $primary;
    color: $white;
  }

  &--secondary {
    border-color: $primary;
    background-color: $white;
    color: $primary;
  }

  @media (hover: hover) {
    &--primary:hover {
      background-color: $white;
      color: $primary;
    }

    &--secondary:hover {
      background-color: $primary;
      color: $white;
    }
  }
}
</style>
