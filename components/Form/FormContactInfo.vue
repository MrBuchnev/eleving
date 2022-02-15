<template>
  <div>
    <Input
      v-for="field in fields"
      :key="field.name"
      :type="field.type"
      :label="field.label"
      :id="field.name"
      :name="field.name"
      :value="getFieldValue(field.name)"
      @input="handleInputValueChange(field.name, $event)"
    />

    <Input
      v-for="phone in usedPhoneTypes"
      :key="phone"
      type="tel"
      label="Phone"
      :id="`phone-${phone}`"
      :name="`phone-${phone}`"
      :value="getPhoneValue(phone)"
      :selected-option="phone"
      :dropdown-options="availablePhoneTypes"
      @select-option="handleSelectPhone"
      @remove-field="handleRemovePhone"
      @input="handlePhoneValueChange(phone, $event)"
    />

    <button
      v-if="availablePhoneTypes.length"
      class="form-add-phone"
      type="button"
      @click="handleAddPhone"
    >
      Add phone
    </button>
  </div>
</template>

<script>
import Input from '@/components/Form/Input'

import { mapMutations } from 'vuex'

export default {
  name: 'FormContactInfo',

  components: {
    Input
  },

  data() {
    return {
      fields: [
        {
          type: 'text',
          label: 'First name',
          name: 'firstname',
        },
        {
          type: 'text',
          label: 'Last name',
          name: 'lastname',
        },
        {
          type: 'email',
          label: 'E-mail',
          name: 'email',
        },
      ]
    }
  },

  computed: {
    usedPhoneTypes() {
      return this.$store.state.usedPhoneTypes
    },

    availablePhoneTypes() {
      return this.$store.state.availablePhoneTypes
    }
  },

  methods: {
    handleInputValueChange(fieldName, val) {
      this.$store.commit('changeFieldValue', { fieldName, val })
    },

    handlePhoneValueChange(phoneName, val) {
      this.$store.commit('changePhoneValue', { phoneName, val })
    },

    getFieldValue(fieldName) {
      return this.$store.state[fieldName]
    },

    getPhoneValue(phoneName) {
      const statePhoneName = `phone${phoneName.charAt(0).toUpperCase() + phoneName.slice(1)}`

      return this.$store.state[statePhoneName];
    },

    handleSelectPhone(prevOption, currentOption) {
      this.$store.commit('selectPhone', { prevOption, currentOption })
    },

    handleRemovePhone(phone) {
      this.$store.commit('removePhone', { phone })
    },

    handleAddPhone() {
      this.$store.commit('addPhone')
    }
  }
}
</script>

<style lang="scss" scoped>
.form-add-phone {
  text-align: left;
  font-family: $font-bold;
  font-size: 18px;
  line-height: 24px;
  color: $primary;
  margin-top: 16px;
}
</style>
