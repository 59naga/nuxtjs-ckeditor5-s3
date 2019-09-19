<template>
  <div>
    <client-only>
      <ckeditor-classic v-model="html" />
    </client-only>

    <pre>{{ html }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return { html: "" };
  }
};
</script>
