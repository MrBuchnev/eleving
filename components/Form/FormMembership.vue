<template>
  <div>
    <Radio
      name="membership"
      :options="membershipNames"
      :selected="selectedMembership"
      @change="handleRadioValueChange"
    />

    <p class="membership-info">
      {{ membershipInfo }}
    </p>
  </div>
</template>

<script>
import Radio from '@/components/Form/Radio'

import { mapMutations } from 'vuex';

export default {
  name: 'FormMembership',

  components: {
    Radio
  },

  data() {
    return {
      regularMembershipInfo:
        'Regular lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna, ligula eget maecenas. At pharetra fermentum augue egestas. Sed morbi sed est, ultrices in vel maecenas.',
      premiumMembershipInfo:
        'Premium at pharetra fermentum augue egestas. Sed morbi sed est, ultrices in vel maecenas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna, ligula eget maecenas.'
    }
  },

  computed: {
    memberships() {
      return this.$store.state.memberships
    },

    membershipNames() {
      return this.memberships.map(item => item.label)
    },

    selectedMembership() {
      return this.memberships.find(item => item.selected).label
    },

    membershipInfo() {
      return this.selectedMembership === 'regular' ? this.regularMembershipInfo : this.premiumMembershipInfo
    }
  },

  methods: {
    handleRadioValueChange(val) {
      this.$store.commit('changeMembership', { val })
    }
  }
}
</script>

<style lang="scss" scoped>
.membership-info {
  margin-top: 20px;
}
</style>
