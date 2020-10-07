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
    // Getters d'un restaurant en fonction de l'ID
    getPlaceById: state => {
      return id => {
        const placeId = getPlaceId(state.placesFullList, id);
        return state.placesFullList[placeId];
      };
    },

    // Getters de la liste des restaurants visibles
    getSelectedPlacesList: state => {
      return state.selectedPlaces;
    },

    // Getters ouverture de la modale
    getModalState: state => {
      return state.isPlaceModalActive;
    },

    // Getters ID de la modale
    getModalId: state => {
      return state.modalId;
    },

    // Getters limites actuelles de la carte
    getCurrentBounds: state => {
      return state.currentBounds;
    },

    // Getters pour l'état du chargement
    getLoadingStatus: state => {
      return state.loadingStatus;
    },

    // Getters switch ajout de restaurant
    getAddPlaceMode: state => {
      return state.addPlaceMode;
    }
  },

  mutations: {
    // Sélection des restaurants à afficher en fonction des limites actuelles de la carte et du tri par note
    placesSelection(state) {
      const bounds = state.currentBounds;
      const range = state.sliderRange;
      state.selectedPlaces = state.placesFullList.filter(place => {
        let isSelected = true;
        let isInBounds = true;
        let isInSliderRange = true;
        // Tri par limites
        if (bounds) {
          isInBounds =
            place.long >= bounds.getSouthWest().lng() &&
            place.long <= bounds.getNorthEast().lng() &&
            place.lat >= bounds.getSouthWest().lat() &&
            place.lat <= bounds.getNorthEast().lat();
          isSelected = isSelected && isInBounds;
        }
        // Tri par notes
        if (range && range.length === 2) {
          isInSliderRange =
            place.avgRate >= range[0] && place.avgRate <= range[1];
          isSelected = isSelected && isInSliderRange;
        }
        return isSelected;
      });
    },

    // Définir les limites
    setCurrentBounds: (state, bounds) => {
      state.currentBounds = bounds;
    },

    // Définition filtre par note
    setSliderRange: (state, range) => {
      state.sliderRange = range;
    },

    // Ouverture modale
    modalSetup: (state, modalId) => {
      state.isPlaceModalActive = true;
      state.modalId = modalId;
    },

    // Fermeture modale
    resetModal: state => {
      state.isPlaceModalActive = false;
      state.modalId = null;
    },

    // Fin du chargement
    endLoading: state => {
      state.loadingStatus = false;
    },

    // Activation/désactivation ajout restaurant
    setAddPlaceMode: (state, mode) => {
      state.addPlaceMode = mode;
    },

    // Ajout de restaurant à la liste complète et aux restaurants visibles.
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

      // Obtention du dernier ID +1
      function getLastId() {
        const lastId = state.placesFullList.reduce((acc, { id }) => {
          return id;
        }, 0);
        return lastId + 1;
      }
    },

    // Ajout d'un avis
    addRating: (state, { placeIdToAdd, rating }) => {
      const placeId = getPlaceId(state.placesFullList, placeIdToAdd);

      state.placesFullList[placeId].ratings.push({
        ...rating
      });

      const placeAvgRate = getAvgRate(state.placesFullList[placeId].ratings);
      state.placesFullList[placeId].avgRate = placeAvgRate;
    }
  },

  actions: {
    getData: async function(context, { service, location }) {

      // On vide les listes par sécurité
      this.state.selectedPlaces = [];
      this.state.placesFullList = [];

      // Appel de la fonction nearbySearch
      const loadedPlaces = await loadplaces.loadPlaces(service, location);
      
      // Ajout de chaque restaurant dans la liste
      loadedPlaces.forEach(newPlace =>
        context.commit("addPlace", { newPlace })
      );
      context.commit("placesSelection");
      context.commit("endLoading"); // On met fin au chargement de la page.
    }
  }
});

// Récupération par ID
const getPlaceId = (placesFullList, id) => {
  return placesFullList.findIndex(restaurant => restaurant.id === parseInt(id));
};

// Calcul de la moyenne des notes
const getAvgRate = ratings => {
  const avgRate = ratings.reduce(
    (acc, { stars }) => acc + stars / ratings.length,
    0
  );
  return Math.round(avgRate);
};
