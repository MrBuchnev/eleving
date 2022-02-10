<template>
  <ul class="steps">
    <li
      v-for="(step, i) in steps"
      :key="i"
      class="step"
      :class="{ 'is-active': i + 1 <= currentStep }"
    >
      <div class="step__index">{{ i + 1 }}</div>
      <div class="step__name">{{ step }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "StepsNav",

  props: {
    steps: { type: [ Array ], required: true, default: () => [] },
    currentStep: { type: Number, required: true, default: 1 }
  }
}
</script>

<style lang="scss" scoped>
.steps {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  & + & {
    margin-left: 200px;
  }

  &__index {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    font-size: 48px;
    line-height: 65px;
    border-radius: 50%;
    font-family: $font-bold;
    color: $grey-3;
    border: 2px solid $grey-3;
    transition: border-color 0.2s ease;
  }

  .is-active &__index {
    border-color: $primary;
    color: $primary;
  }

  & + & &__index::before {
    content: '';
    position: absolute;
    right: 100%;
    width: 200px;
    height: 1px;
    background-color: $grey-3;
    transition: background-color 0.2s ease;
  }

  & + &.is-active &__index::before {
    background-color: $primary;
  }

  &__name {
    position: absolute;
    top: calc(100% + 16px);
    font-size: 24px;
    line-height: 33px;
    white-space: nowrap;
  }
}
</style>
