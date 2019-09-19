<template>
  <ckeditor
    v-model="ckeditorValue"
    v-bind="ckeditorConfig"
    @ready="ckeditorReady"
  />
</template>

<script>
import editor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/ja.js";

export default {
  props: ["config"],
  data() {
    const config = this.config || {};

    const ckeditorValue = "";
    const ckeditorConfig = { editor, ...config };
    const ckeditorReady = eventData => {
      const FileRepository = eventData.plugins.get("FileRepository");
      FileRepository.createUploadAdapter = loader => {
        class UploadAdapter {
          constructor(loader, $axios) {
            this.loader = loader;
            this.$axios = $axios;
          }
          async upload() {
            const file = await this.loader.file;
            const params = new FormData();
            params.append("file", file);

            return this.$axios.$post("/api/image-upload/", params);
          }
        }

        return new UploadAdapter(loader, this.$axios);
      };
    };

    return { ckeditorValue, ckeditorConfig, ckeditorReady };
  },
  watch: {
    ckeditorValue(value) {
      this.$emit("input", value);
    }
  }
};
</script>
