<template>
  <div class="radio-btns">
    <label v-for="(item, i) in options" :key="i" class="radio-btns__item">
      <input
        v-model="radioButtonValue"
        type="radio"
        :value="item"
        :name="name"
        class="radio-btns__item-input"
      />

      <span class="radio-btns__item-btn">
        {{ item }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Radio',

  props: {
    name: { type: String, required: false, default: '' },
    selected: { type: String, required: false, default: '' },
    options: { type: Array, required: true }
  },

  data() {
    return {
      radioButtonValue: this.selected
    }
  },

  watch: {
    radioButtonValue(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-btns {
  display: flex;
  flex-direction: column;

  &__item {
    display: flex;
    align-items: center;
  }

  &__item + &__item {
    margin-top: 12px;
  }

  &__item-input {
    display: none;
  }

  &__item-btn {
    position: relative;
    padding-left: 48px;
    font-size: 18px;
    line-height: 32px;
    text-transform: capitalize;
  }

  &__item-btn::before {
    content: '';
    position: absolute;
    left: 0;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: 2px solid $primary;
    background-color: $white;
    transition: background-color 0.2s linear;
  }

  &__item-input:checked + &__item-btn::before {
    background-color: $primary;
  }
}
</style>
