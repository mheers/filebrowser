<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "app",
  mounted() {
    this.updateLocale();
    const loading = document.getElementById("loading");
    loading.classList.add("done");

    setTimeout(function() {
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
