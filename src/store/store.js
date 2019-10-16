import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        jsonPlaces: []
    },
    mutations: {
        setData(state, data) {
          state.jsonPlaces = data;
        }
      },
      actions: {
        async getData(placesjSon) {
          let data = (await Axios.get('liste.json')).data;
          placesjSon.commit("setData", data);
        }
      }
    });