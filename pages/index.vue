<template>
  <div class="form-link-container">
    <NuxtLink class="btn btn--primary" to="/form/contact-info">Show Form</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style lang="scss" scoped>
.form-link-container {
  display: flex;
  width: 200px;
  margin: 0 auto;
  justify-content: center;
}
</style>
