import Vue from "vue";
import Ckeditor5Vue from "@ckeditor/ckeditor5-vue";
import CkeditorClassic from "@/components/CkeditorClassic";

Vue.use(Ckeditor5Vue);
Vue.component("ckeditor-classic", CkeditorClassic);
