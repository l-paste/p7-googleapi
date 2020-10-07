export default {
  loadPlaces
};

const axios = require("axios");

// Chargement global des restaurants depuis le jSon + depuis Places.
async function loadPlaces(service, location) {
  try {
    const jsonPromise = axios.get("liste.json"); // Restaurants en local
    const placesPromise = getGooglePlaces(service, location); // Restaurants via GooglePlaces

    // On attend la résolution des promesses, avec affectation par décomposition (const []) dans jSonResult et placesResult
    const [jsonResult, placesResult] = await Promise.all([ 
      jsonPromise,
      placesPromise
    ]);

    // Stockage des résultats
    const localPlacesList = jsonResult.data; // Le json
    const googlePlacesList = placesResult.result.map(formatGoogleList); // Création d'un nouveau tableau mais en formattant comme le json

    // Les deux listes dans un tableau, au même format, avec le spread operator
    return [...localPlacesList, ...googlePlacesList];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return false;
  }
}

// Lancement du nearbySearch pour récupérer les restaurants dans un périmètre de 500 mètres.
async function getGooglePlaces(service, location) {
  try {
  return new Promise(resolve => service.nearbySearch(
    {
      location,
      radius: 1000,
      type: ["restaurant"]
    },
    async (result, status) => {
      const restaurantArray = [];
      for (let apiPlace of result) {
        let currentRestaurant = { ...apiPlace };
        // Récupération des détails du restaurant (avis)
        const detail = await getPlaceDetails(service, apiPlace.place_id);
        currentRestaurant = { ...currentRestaurant, ...detail };
        restaurantArray.push(currentRestaurant);
      }

      // Appel de getPlacesDetails
      return resolve({ result: restaurantArray, status });
    }
  ));
} catch(err) {
  // eslint-disable-next-line no-console
  console.log(err);
}
}

// Fonction pour récupérer les avis du restaurant
async function getPlaceDetails(service, placeId) {
  return new Promise(resolve => {
    const request = {
      placeId,
      fields: [ 'reviews' ]
    };
    return service.getDetails(request, details => resolve({
      details
    }));
  });
}

// Pour formater les données de GooglePlaces de la même manière que les restaurants de la liste JSON
function formatGoogleList(place) {
  return {
    ...place,
    restaurantName: place.name,
    address: place.vicinity,
    lat: place.geometry.location.lat(),
    long: place.geometry.location.lng(),
    ratings: formatGoogleDetails(place)
  };
}

// Idem pour les détails
function formatGoogleDetails(place) {
  if (place.details === null) return [];
  return place.details.reviews.map(function(review) {
    return {
      stars: review.rating,
      author: review.author_name,
      comment: review.text
    };
  });
}