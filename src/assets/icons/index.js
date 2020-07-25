import Vue from "vue";
import Svg from "@/components/Svg"; // svg component

// register globally
Vue.component("v-icon", Svg);

const req = require.context("./svg", false, /.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);