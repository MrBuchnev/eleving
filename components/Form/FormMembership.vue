<template>
  <form novalidate>
    <h1 class="form-heading">{{ currentStep }}</h1>

    <Radio
      name="membership"
      :options="membershipNames"
      :selected="selectedMembership"
      @change="handleRadioValueChange"
    />

    <p class="membership-info">
      {{ membershipInfo }}
    </p>

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
import Radio from '@/components/Form/Radio'

import { mapMutations } from 'vuex';

export default {
  name: 'FormMembership',

  components: {
    Radio
  },

  props: {
    currentStep: { type: String, required: true, default: '' }
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

    nextStep() {
      return this.currentStep === 'Personal info' ? '/form/membership' : '/form/overview'
    },

    prevStep() {
      return this.currentStep === 'Overview' ? '/form/membership' : '/form/contact-info'
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

.membership-info {
  margin-top: 20px;
}
</style>
