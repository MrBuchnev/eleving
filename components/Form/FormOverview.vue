<template>
  <div>
    <table class="overview-table">
      <tbody>
        <tr
          v-for="(field, i) in userInfo"
          v-if="field.val"
          :key="i"
          class="overview-table__row"
        >
          <td class="overview-table__cell">{{ field.label }}:</td>
          <td class="overview-table__cell">{{ field.val }}</td>
        </tr>
      </tbody>
    </table>

    <button
      class="btn-edit"
      type="button"
      @click="modalOpen = true"
    >
      Edit information
    </button>

    <Modal
       v-if="modalOpen"
       title="Edit information"
       @close-modal="modalOpen = false"
     >
      <ModalOverview
        @close-modal="modalOpen = false"
      />
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import ModalOverview from '@/components/Modal/ModalOverview'
import { mapMutations } from 'vuex';

export default {
  name: 'FormMembership',

  components: {
    Modal,
    ModalOverview
  },

  data() {
    return {
      modalOpen: false
    }
  },

  computed: {
    membershipName() {
      const initialName = this.$store.state.memberships.find(item => item.selected).label

      return initialName.charAt(0).toUpperCase() + initialName.slice(1)
    },

    userInfo() {
      return [
        {
          label: 'First name',
          name: 'firstname',
          val: this.$store.state.firstname
        },
        {
          label: 'Last name',
          name: 'lastname',
          val: this.$store.state.lastname
        },
        {
          label: 'E-mail',
          name: 'email',
          val: this.$store.state.email
        },
        {
          label: 'Phone',
          name: 'phoneHome',
          val: this.$store.state.phoneHome
        },
        {
          label: 'Phone',
          name: 'phoneWork',
          val: this.$store.state.phoneWork
        },
        {
          label: 'Phone',
          name: 'phoneMobile',
          val: this.$store.state.phoneMobile
        },
        {
          label: 'Phone',
          name: 'phoneMain',
          val: this.$store.state.phoneMain
        },
        {
          label: 'Phone',
          name: 'phoneOther',
          val: this.$store.state.phoneOther
        },
        {
          label: 'Membership',
          name: 'membership',
          val: this.membershipName
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.overview-table {
  margin-top: 32px;

  &__cell {
    padding: 11px 0 13px;
    font-size: 18px;
    line-height: 24px;
  }

  &__cell:first-child {
    font-family: $font-bold;
    padding-right: 58px;
  }
}

.btn-edit {
  display: inline-block;
  font-family: $font-bold;
  font-size: 18px;
  line-height: 24px;
  color: $primary;
  margin-top: 26px;
}
</style>
