<template>
  <div
    class="input-group"
    :class="{
      'has-error': hasError
    }"
  >
    <label
      class="label"
      :for="id">
      {{ label }}
    </label>

    <input
      v-if="type !== 'tel'"
      v-model="model"
      class="input"
      :id="id"
      :type="type"
      :name="name"
      :required="required"
    />

    <div
      v-if="type === 'tel'"
      class="input-phone-group"
    >
      <div class="input-phone-dropdown" :class="{ 'is-open': dropdownOpen }">
        <button
          class="input-btn input-btn--dropdown"
          type="button"
          @click="dropdownOpen = !dropdownOpen"
        >
          {{ selected }}
          <i class="input-phone-dropdown__icon"></i>
        </button>

        <transition name="fade">
          <ul
            v-if="dropdownOpen && dropdownOptions.length"
            class="input-phone-dropdown__options"
          >
            <li
              v-for="(option, i) in dropdownOptions"
              :key="i"
            >
              <button
                class="input-phone-dropdown__option"
                type="button"
                @click="selectOption(selected, option)"
              >
                {{ option }}
              </button>
            </li>
          </ul>
        </transition>
      </div>

      <input
        class="input input--phone"
        v-model="model"
        :id="id"
        :type="type"
        :name="name"
      >

      <button
        class="input-btn input-btn--remove"
        type="button"
        @click="removeField"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',

  props: {
    type: { type: String, required: false, default: "text" },
    label: { type: String, required: false, default: "" },
    id: { type: String, required: false, default: "" },
    name: { type: String, required: false, default: "" },
    value: { type: [String, Number], required: false, default: "" },
    placeholder: { type: String, required: false, default: "" },
    required: { type: Boolean, required: false, default: false },
    hasError: { type: String, required: false, default: "" },
    dropdownOptions: { type: Array, required: false, default: () => [] },
    selectedOption: { type: String, required: false, default: '' }
  },

  data() {
    return {
      model: this.value,
      dropdownOpen: false,
      selected: this.selectedOption
    }
  },

  watch: {
    model(val) {
      this.$emit('input', val)
    },

    value(val) {
      this.model = val
    }
  },

  methods: {
    selectOption(prevOption, currentOption) {
      this.$emit('select-option', prevOption, currentOption)
      this.selected = currentOption
      this.dropdownOpen = false
    },

    removeField() {
      this.model = ''
      this.$nextTick(() => {
        this.$emit('remove-field', this.name)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;

  & + & {
    margin-top: 16px;
  }
}

.label {
  font-family: $font-bold;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 8px;
}

.input {
  font-size: 18px;
  line-height: 44px;
  width: 100%;
  border: 2px solid $grey-3;
  padding: 0 16px;
  border-radius: 8px;
  transition: border-color .2s linear;

  &--phone {
    border-radius: 0 8px 8px 0;
    margin-left: -2px;
  }
}

.input-phone-group {
  display: flex;
  align-items: center;
}

.input-phone-dropdown {
  position: relative;

  &__icon {
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 8px solid $black;;
    margin-top: 3px;
    margin-left: 8px;
    transition: transform 0.2s linear;
  }

  .is-open &__icon {
    transform: scale(1, -1);
  }

  &__options {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: $white;
    border: 2px solid $grey-3;
    border-top: none;
    z-index: 1;
  }

  &__option {
    font-family: $font-bold;
    padding: 12px 16px;
    text-transform: capitalize;
  }
}

.input-btn {
  display: flex;
  align-items: center;
  font-family: $font-bold;
  line-height: 44px;
  background-color: $grey-2;
  border: 2px solid $grey-3;
  border-radius: 8px;
  padding: 0 16px;
  text-transform: capitalize;

  &--dropdown {
    border-radius: 8px 0 0 8px;
  }

  &--remove {
    margin-left: 22px;
  }

  .is-open & {
    border-bottom-left-radius: 0;
  }
}

</style>
