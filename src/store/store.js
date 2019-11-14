import Vue from "vue";
import Vuex from "vuex";
import loadplaces from "../utils/loadplaces";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    placesFullList: [],
    selectedPlaces: [],
    sliderRange: [],
    currentBounds: {},
    isPlaceModalActive: false,
    modalId: null,
    loadingStatus: true,
    addPlaceMode: false
  },
  getters: {
    // Obtenir l'id des restaurants
    getPlaceById: state => {
      return id => {
        const placeId = getplaceId(state.placesFullList, id);
        return state.placesFullList[placeId];
      };
    },

    // Obtenir la liste des restos sélectionnés
    getSelectedPlacesList: state => {
      return state.selectedPlaces;
    },

    getModalState: state => {
      return state.isPlaceModalActive;
    },

    getModalId: state => {
      return state.modalId;
    },

    // Obtenir les limites actuelles de la carte
    getCurrentBounds: state => {
      return state.currentBounds;
    },

    getLoadingStatus: state => {
      return state.loadingStatus;
    },

    getAddPlaceMode: state => {
      return state.addPlaceMode;
    }

  },

  mutations: {
    // A supprimer ???
    // setPlacesList: (state, { list }) => {
    //   state.placesFullList = list;
    // },

    // Définit les restaurants à afficher en fonction des limites de la carte et du tri par moyenne
    placesSelection(state) {
      const bounds = state.currentBounds;
      const range = state.sliderRange;
      state.selectedPlaces = state.placesFullList.filter(place => {
        let isSelected = true;
        let isInBounds = true;
        let isInSliderRange = true;
        // Limites cartes
        if (bounds) {
          isInBounds =
            place.long >= bounds.getSouthWest().lng() &&
            place.long <= bounds.getNorthEast().lng() &&
            place.lat >= bounds.getSouthWest().lat() &&
            place.lat <= bounds.getNorthEast().lat();
          isSelected = isSelected && isInBounds;
        }
        // Moyenne des notes
        if (range && range.length === 2) {
          isInSliderRange =
            place.avgRate >= range[0] && place.avgRate <= range[1];
          isSelected = isSelected && isInSliderRange;
        }
        return isSelected;
      });
    },

    setCurrentBounds: (state, bounds) => {
      state.currentBounds = bounds;
    },

    setSliderRange: (state, range) => {
      state.sliderRange = range;
    },

    modalSetup: (state, modalId) => {
      state.isPlaceModalActive = true;
      state.modalId = modalId;
    },

    resetModal: state => {
      state.isPlaceModalActive = false;
      state.modalId = null;
    },

    endLoading: state => {
      state.loadingStatus = false;
    },

    setAddPlaceMode: (state, mode) => {
      state.addPlaceMode = mode;
    },

    // Ajoute un restaurant en ajoutant automatiquement un champ avgRate et un id (le dernier +1)
    addPlace: (state, { newPlace }) => {
      const ratings = newPlace.ratings || [];

      const placeToAdd = {
        ...newPlace,
        ratings,
        avgRate: getAvgRate(ratings),
        id: getLastId()
      };

      state.placesFullList.push(placeToAdd);
      state.selectedPlaces.push(placeToAdd);

      // Utilisation de reduce pour obtenir le dernier ID et lui ajouter +1
      function getLastId() {
        const lastId = state.placesFullList.reduce((acc, { id }) => {
          return id;
        }, 0);
        return lastId + 1;
      }
    },

    // Ajout d'une évaluation (rating)
    addRating: (state, { placeIdToAdd, rating }) => {
      const placeId = getplaceId(state.placesFullList, placeIdToAdd);

      state.placesFullList[placeId].ratings.push({
        ...rating
      });

      const placeAvgRate = getAvgRate(state.placesFullList[placeId].ratings);
      state.placesFullList[placeId].avgRate = placeAvgRate;
    }
  },

  actions: {
    getData: async function(context, { service, location }) {

      const loadedPlaces = await loadplaces.loadPlaces(service, location);
      
      loadedPlaces.forEach(newPlace =>
        context.commit("addPlace", { newPlace })
      );
      context.commit("placesSelection");
      context.commit("endLoading"); // On met fin au chargement de la page.
    }
    // updateData: async function(context, { service, location, bounds }) {

    // }
  }
});

// Fonction helper pour getPlaceById
function getplaceId(placesFullList, id) {
  return placesFullList.findIndex(restaurant => restaurant.id === parseInt(id));
}
// Fonction helper pour getRestaurantavgRate
function getAvgRate(ratings) {
  const avgRate = ratings.reduce(
    (acc, { stars }) => acc + stars / ratings.length,
    0
  );
  return Math.round(avgRate);
}
