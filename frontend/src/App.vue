<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { baseURL } from "@/utils/constants";

export default {
  name: "app",
  mounted() {
    this.updateLocale();
    this.updateCSS();

    const loading = document.getElementById("loading");
    loading.classList.add("done");

    setTimeout(function () {
      loading.parentNode.removeChild(loading);
    }, 200);
  },
  methods: {
    ...mapMutations(["updateUser"]),
    updateLocale() {
      if (Object.prototype.hasOwnProperty.call(this.$route.query, "locale")) {
        this.updateUser({ locale: this.$route.query.locale });
      }
    },
    updateCSS() {
      if (Object.prototype.hasOwnProperty.call(this.$route.query, "theme")) {
        const theme = this.$route.query.theme;
        if (!theme || theme === "") {
          return;
        }
        if (!["dark"].includes(theme)) {
          return;
        }
        const customCssID = "custom-styles";
        if (document.getElementById(customCssID) === null) {
          const style = document.createElement("link");
          style.rel = "stylesheet";
          style.href = `${baseURL}/static/themes/${theme}.css`;
          style.id = customCssID;
          // Get the first script tag
          const ref = document.querySelector("#endOfBody");

          // Insert our new styles before the first script tag
          ref.parentNode.insertBefore(style, ref);
        }
      }
    },
  },
  computed: {
    locale() {
      return Object.prototype.hasOwnProperty.call(this.$route.query, "locale");
    },
  },
  watch: {
    locale() {
      this.updateLocale();
    },
  },
};
</script>

<style>
@import "./css/styles.css";
</style>
