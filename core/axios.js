import axios from 'axios';
import Constants from "expo-constants";
const { manifest } = Constants;

const currentApi = typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:6666`)
  : `api.example.com`;

axios.defaults.baseURL = 'http://' + currentApi;

export default axios;