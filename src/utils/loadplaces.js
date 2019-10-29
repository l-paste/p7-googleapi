export default {
  getRestaurantList
};

const axios = require("axios");

// Appel Axios à la liste restaurantList.json, et de GooglePlaces, réutilisée dans le Store.
async function getRestaurantList(service, location) {
  try {
    const jsonPromise = axios.get("http://localhost:8080/liste.json"); // Restaurants en local
    const placesPromise = getPlacesPromise(service, location); // Restaurants via GooglePlaces

    // On attend la résolution des promesses, avec affectation par décomposition (const []) dans jSonResult et placesResult
    const [jsonResult, placesResult] = await Promise.all([ 
      jsonPromise,
      placesPromise
    ]);

    // Stockage des résultats
    const jsonRestaurantList = jsonResult.data; // Le json
    const placesRestaurantList = placesResult.result.map(formatPlacesIntoJson); // Création d'un nouveau tableau mais en formattant comme le json

    // Les deux listes dans un tableau, au même format, avec le spread operator
    return [...jsonRestaurantList, ...placesRestaurantList];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return false;
  }
}

/* Deux fonctions helpers de getRestaurantList utilisée dans le Store */

// Promesse pour récupérer les restaurants avec Google Places.
async function getPlacesPromise(service, location) {
  return new Promise(resolve => {
    return service.nearbySearch(
      {
        location,
        radius: 1000,
        type: ["restaurant"]
      },
      async function(result, status) {
        const restaurantArray = [];
        for (let restaurant of result) {
          let currentRestaurant = { ...restaurant };
          const detail = await getPlaceDetails(service, restaurant.place_id);
          currentRestaurant = { ...currentRestaurant, ...detail };

          restaurantArray.push(currentRestaurant);
        }

        // Appel de getPlacesDetails
        return resolve({ result: restaurantArray, status });
      }
    );
  });
}

function getPlaceDetails(service, placeId) {
  return new Promise(resolve => {
    const request = {
      placeId
      // fields: [ 'rating', 'review' ]
    };
    return service.getDetails(request, function(details) {
      return resolve({
        details
      });
    });
  });
}

// Pour formater les données de GooglePlaces de la même manière que les restaurants de la liste JSON
function formatPlacesIntoJson(restaurant) {
  // console.log(restaurant);
  return {
    ...restaurant,
    restaurantName: restaurant.name,
    address: restaurant.vicinity,
    lat: restaurant.geometry.location.lat(),
    long: restaurant.geometry.location.lng(),
    description: "",
    ratings: formatDetailsIntoJson(restaurant)
  };
}

function formatDetailsIntoJson(restaurant) {
  if (restaurant.details === null) return [];
  return restaurant.details.reviews.map(function(review) {
    return {
      stars: review.rating,
      author: review.author_name,
      comment: review.text
    };
  });
}