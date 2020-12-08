import { reactive } from "vue";
import axios from "axios";

const apiUrl = process.env.VUE_APP_API_URL,
  key = process.env.VUE_APP_KEY;

const state = reactive({
  data: [],
  loading: null,
  firstLoaded: false,
  query: "africans",
  currentItem: null,
  error: false,
  loadingComplete: null,
});

const appData = reactive({
  modalStatus: false,
  modalData: null,
  imgStatus: true,
});
let query = state.query;

export const useLoader = (q = query) => {
  const url = `${apiUrl}&query=${q}&client_id=${key}`;
  state.loading = true;
  state.query = q;
  axios
    .get(url)
    .then(r => r.data.results.slice(0, 6))
    .then(rt => (state.data = rt))
    .then(d => (state.loading = false))
    .then(load => (state.loadingComplete = true))
    .catch(e => {
      state.error = true;
      state.loading = false;
    });

  return {
    state,
    appData,
  };
};
