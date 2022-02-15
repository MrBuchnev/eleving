export const state = () => ({
  firstname: '',
  lastname: '',
  email: '',

  phoneHome: '',
  phoneWork: '',
  phoneMobile: '',
  phoneMain: '',
  phoneOther: '',

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
})

export const mutations = {
  changeFieldValue(state, { fieldName, val }) {
    state[fieldName] = val;
  },

  changePhoneValue(state, { phoneName, val }) {
    const statePhoneName = `phone${phoneName.charAt(0).toUpperCase() + phoneName.slice(1)}`

    state[statePhoneName] = val
  },

  selectPhone(state, { prevOption, currentOption }) {
    const prevOptionIndex = this.state.usedPhoneTypes.indexOf(prevOption)
    const currentOptionIndex = this.state.availablePhoneTypes.indexOf(currentOption)

    this.state.usedPhoneTypes.splice(prevOptionIndex, 1, currentOption)
    this.state.availablePhoneTypes.splice(currentOptionIndex, 1, prevOption)
  },

  addPhone(state) {
    this.state.usedPhoneTypes.push(this.state.availablePhoneTypes[0])
    this.state.availablePhoneTypes.splice(0, 1)
  },

  removePhone(state, { phone }) {
    const phoneType = phone.split('phone-').pop()
    const index = this.state.usedPhoneTypes.indexOf(phoneType)

    this.state.usedPhoneTypes.splice(index, 1)
    this.state.availablePhoneTypes.push(phoneType)
  },

  changeMembership(state, { val }) {
    this.state.memberships.forEach(item => item.selected = false)
    this.state.memberships.find(item => item.label === val).selected = true
  }
}
