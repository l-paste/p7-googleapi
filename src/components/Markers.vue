<template>
  <div class="google-markers">
    <!-- Seulement besoin de la partie script. -->
  </div>
</template>


<script>
  export default {
    name: 'google-markers',
    // Récupération des infos du marker à créer.
    props: {
      google: {
        type: Object,
        required: true
      },
      map: {
        type: Object,
        required: true
      },
      marker: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        mapMarker: null,
        modalId: null,
      }
    },
    mounted() {
      // Création du marker
      this.mapMarker = new this.google.maps.Marker({
        position: this.marker.position,
        map: this.map,
        marker: this.marker,
        icon: this.getIconUrl(this.marker.type)
      })
      
      // addListener pour ouvrir la modale avec les infos du restaurant.
      this.mapMarker.addListener('click', () => {
          if (this.marker.type !== 'user') {
            this.modalId = this.marker.id;
            this.$store.commit("modalSetup", this.marker.id);
          }
        });
      
        
    },
    // Nettoyage des markers pour éviter les doublons.
    beforeDestroy() {
      this.mapMarker.setMap(null)
    },

    methods: {
      // Les différents types d'icones en fonction du type du marker.
      getIconUrl() {
        let icon
        switch (this.marker.type) {
          case 'restaurant':
            icon = "/icons/restaurant.png";
            break;
          case 'user':
            icon = '/icons/user.png';
            break;
          default:
            icon = '';
            break;
        }
        return icon
      }
    },
  }
</script>