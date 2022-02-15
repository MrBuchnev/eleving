<template>
  <div class="modal" @click="handleClickOutside">
    <div class="modal__content">
      <div class="modal__header">
        <h1 class="modal__title">{{ title }}</h1>

        <button
          class="modal__close"
          type="button"
          @click="handleClose"
        >
          Close
        </button>
      </div>

      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    title: { type: String, required: true, default: '' }
  },

  methods: {
    handleClose() {
      this.$emit('close-modal')
    },

    handleClickOutside(e) {
      if (e.currentTarget === e.target) {
        this.handleClose()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba($black, 0.8);
  backdrop-filter: blur(9px);
  z-index: 100;
  overflow: auto;

  &__content {
    width: 100%;
    max-width: 490px;
    background-color: $white;
    box-shadow: 0 3px 18px #00000029;
    border-radius: 16px;
    padding: 32px;
    margin: 130px auto 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  &__title {
    font-family: $font-bold;
    color: $primary;
    padding-right: 24px;
  }

  &__close {
    font-family: $font-bold;
    color: $grey-4;
  }
}
</style>
