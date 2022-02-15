<template>
  <div class="modal-overview">
    <Input
      v-for="field in fields"
      :key="field.name"
      :type="field.type"
      :label="field.label"
      :id="field.name"
      :name="field.name"
      :value="field.val"
      @input="handleInputValueChange(field.name, $event)"
    />

    <Input
      v-for="phone in usedPhoneTypes"
      :key="phone"
      type="tel"
      label="Phone"
      :id="`phone-${phone}`"
      :name="phone"
      :value="phones.find(item => item.name === phone).val"
      :selected-option="phone"
      :dropdown-options="availablePhoneTypes"
      :removable="false"
      @select-option="handleSelectPhone"
      @input="handlePhoneValueChange(phone, $event)"
    />

    <div class="membership-section">
      <div class="membership-section__label">
        Membership
      </div>

      <Radio
        name="membership"
        :options="membershipNames"
        :selected="selectedMembership"
        :inline="true"
        @change="handleRadioValueChange"
      />
    </div>

    <div class="btn-container">
      <button
        class="btn btn--primary"
        type="button"
        @click="handleSave"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'

import { mapMutations } from 'vuex'

export default {
  name: 'ModalOverview',

  components: {
    Input,
    Radio
  },

  data() {
    return {
      fields: [
        {
          type: 'text',
          label: 'First name',
          name: 'firstname',
          val: this.getFieldValue('firstname')
        },
        {
          type: 'text',
          label: 'Last name',
          name: 'lastname',
          val: this.getFieldValue('lastname')
        },
        {
          type: 'email',
          label: 'E-mail',
          name: 'email',
          val: this.getFieldValue('email')
        },
      ],

      phones: [
        {
          name: 'home',
          val: this.getPhoneValue('home'),
        },
        {
          name: 'work',
          val: this.getPhoneValue('work'),
        },
        {
          name: 'mobile',
          val: this.getPhoneValue('mobile'),
        },
        {
          name: 'main',
          val: this.getPhoneValue('main'),
        },
        {
          name: 'other',
          val: this.getPhoneValue('other'),
        }
      ],

      usedPhoneTypes: '',
      availablePhoneTypes: '',
      selectedMembership: ''
    }
  },

  created() {
    this.usedPhoneTypes = this.copyValues(this.storedUsedPhoneTypes)
    this.availablePhoneTypes = this.copyValues(this.storedAvailablePhoneTypes)
    this.selectedMembership = this.copyValues(this.storedSelectedMembership)
  },

  computed: {
    storedUsedPhoneTypes() {
      return this.$store.state.usedPhoneTypes
    },

    storedAvailablePhoneTypes() {
      return this.$store.state.availablePhoneTypes
    },

    memberships() {
      return this.$store.state.memberships
    },

    membershipNames() {
      return this.memberships.map(item => item.label)
    },

    storedSelectedMembership() {
      return this.memberships.find(item => item.selected).label
    },
  },

  methods: {
    getFieldValue(fieldName) {
      return this.$store.state[fieldName]
    },

    getPhoneValue(phoneName) {
      const statePhoneName = `phone${this.capitalize(phoneName)}`

      return this.$store.state[statePhoneName];
    },

    handleSelectPhone(prevOption, currentOption) {
      const prevOptionIndex = this.usedPhoneTypes.indexOf(prevOption)
      const currentOptionIndex = this.availablePhoneTypes.indexOf(currentOption)

      this.phones.find(item => item.name === currentOption).val = this.phones.find(item => item.name === prevOption).val
      this.phones.find(item => item.name === prevOption).val = ''

      this.usedPhoneTypes.splice(prevOptionIndex, 1, currentOption)
      this.availablePhoneTypes.splice(currentOptionIndex, 1, prevOption)
    },

    handleInputValueChange(fieldName, val) {
      const field = this.fields.find(field => field.name === fieldName)
      field.val = val
    },

    handlePhoneValueChange(phoneName, val) {
      const phone = this.phones.find(item => item.name === phoneName)
      phone.val = val
    },

    handleRadioValueChange(val) {
      this.selectedMembership = val
    },

    copyValues(values) {
      return JSON.parse(JSON.stringify(values));
    },

    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },

    handleSave() {
      this.fields.forEach((field, i) => {
        const fieldName = field.name
        const val = field.val

        this.$store.commit('changeFieldValue', { fieldName, val })
      })

      this.phones.forEach((phone, i) => {
        const phoneName = phone.name
        const val = phone.val

        this.$store.commit('changePhoneValue', { phoneName, val })
      });

      const usedPhones = this.usedPhoneTypes
      const availablePhones = this.availablePhoneTypes

      this.$store.commit('updatePhoneTypes', { usedPhones, availablePhones })

      const val = this.selectedMembership

      this.$store.commit('changeMembership', { val })

      this.$emit('close-modal')
    }
  }
}
</script>

<style lang="scss" scoped>
.membership-section {
  margin-top: 16px;

  &__label {
    font-family: $font-bold;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 8px;
  }
}

.btn-container {
  margin-top: 50px;
}
</style>
