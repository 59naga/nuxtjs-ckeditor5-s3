export default {
  plugins: [{ src: "~/plugins/ckeditor.js", mode: "client" }],
  modules: ["@nuxtjs/axios"],
  axios: {
    baseURL: process.env.BASE_URL || "http://localhost:3001"
  }
};
