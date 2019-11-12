import Vue from "vue";
import Vuex from "vuex";
import loadplaces from "../utils/loadplaces";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    restaurantList: [],
    visibleRestaurant: [],
    sortValue: [],
    boundsValue: {},
    isPlaceModalActive: false,
    placeIdDetail: null
  },
  getters: {
    // Obtenir l'ID des restaurants
    getRestaurantById: state => {
      return id => {
        const restaurantIndex = getRestaurantIndex(state.restaurantList, id);
        return state.restaurantList[restaurantIndex];
      };
    },

    // Obtenir la liste des restos
    getRestaurantList: state => {
      return state.visibleRestaurant;
    },

    getModalState: state => {
      return state.isPlaceModalActive;
    },
    
    getModalId: state => {
      return state.placeIdDetail;
    },

    // Obtenir la valeur du tri (par note)
    getSortValue: state => {
      return state.sortValue;
    },

    // Obtenir les limites actuelles de la carte
    getBoundsValue: state => {
      return state.boundsValue;
    }
  },

  mutations: {
    setRestaurantList: (state, { list }) => {
      state.restaurantList = list;
    },

    // Définit les restaurants à afficher en fonction des limites de la carte et du tri par moyenne
    selectVisibleRestaurant(state) {
      const bounds = state.boundsValue;
      const range = state.sortValue;
      state.visibleRestaurant = state.restaurantList.filter(restaurant => {
        let shouldBeVisible = true;
        let isInMap = true;
        let isInRange = true;
        // Limites cartes
        if (bounds) {
          isInMap =
            restaurant.long >= bounds.getSouthWest().lng() &&
            restaurant.long <= bounds.getNorthEast().lng() &&
            restaurant.lat >= bounds.getSouthWest().lat() &&
            restaurant.lat <= bounds.getNorthEast().lat();
          shouldBeVisible = shouldBeVisible && isInMap;
        }
        // Moyenne des notes
        if (range && range.length === 2) {
          isInRange =
            restaurant.avgRating >= range[0] &&
            restaurant.avgRating <= range[1];
          shouldBeVisible = shouldBeVisible && isInRange;
        }
        return shouldBeVisible;
      });
    },

    setBoundsValue: (state, bounds) => {
      state.boundsValue = bounds;
    },

    setSortValue: (state, range) => {
      state.sortValue = range;
    },

    modalSetup: (state,modalId) => {
      state.isPlaceModalActive = true;
      state.placeIdDetail = modalId;
    },

    resetModal: (state) => {
      state.isPlaceModalActive = false;
      state.placeIdDetail = null;
    },

    // Ajoute un restaurant en ajoutant automatiquement un champ avgRating et un ID (le dernier +1)
    addRestaurant: (state, { newRestaurant }) => {
      const ratings = newRestaurant.ratings || [];

      const restaurantToAdd = {
        ...newRestaurant,
        ratings,
        avgRating: computeAvgRatings(ratings),
        ID: getLastId()
      };

      state.restaurantList.push(restaurantToAdd);
      state.visibleRestaurant.push(restaurantToAdd);

      function getLastId() {
        const lastId = state.restaurantList.reduce((acc, restaurant) => {
          if (acc < restaurant.ID) {
            return restaurant.ID;
          }
          return acc;
        }, 0);

        return lastId + 1;
      }
    },

    // Ajoute un commentaire
    addComment: (state, { restaurantId, comment }) => {
      const restaurantIndex = getRestaurantIndex(
        state.restaurantList,
        restaurantId
      );

      state.restaurantList[restaurantIndex].ratings.push({
        ...comment
      });

      const restaurantRating = computeAvgRatings(
        state.restaurantList[restaurantIndex].ratings
      );
      state.restaurantList[restaurantIndex].avgRating = restaurantRating;
    }
  },

  actions: {
    getData: async function(context, { service, location }) {
      this.state.visibleRestaurant = [];
      this.state.restaurantList = [];
      const restaurantList = await loadplaces.getRestaurantList(
        service,
        location
      );
      // console.log(restaurantList)
      restaurantList.forEach(newRestaurant =>
        context.commit("addRestaurant", { newRestaurant })
      );
      
    },
    // updateData: async function(context, { service, location, bounds }) {

    // }
  }
});

// Fonction helper pour getRestaurantById
function getRestaurantIndex(restaurantList, id) {
  return restaurantList.findIndex(restaurant => restaurant.ID === parseInt(id));
}
// Fonction helper pour getRestaurantAvgRating
function computeAvgRatings(ratings) {
  const avgRating = ratings.reduce((acc, rating) => {
    return acc + rating.stars / ratings.length;
  }, 0);
  return Math.round(avgRating);
}
