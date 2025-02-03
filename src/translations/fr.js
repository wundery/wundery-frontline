/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "Carte",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "Ce site utilise des cookies.",
          acknowledge: "Ok, j’ai compris",
          more: "Plus d’informations",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "Aucun produit trouvé",
          oneResultHeadline: "Un produit trouvé",
          resultsHeadline: "${resultsCount} produits ont été trouvés",
          seeAll: "Voir tous les résultats (${count})",
        },
        searchInput: {
          placeholder: "Recherche",
        },
      },
    },
    notification: {
      imageUploaded: "Image téléchargée avec succès!",
      fileSizeExceeded: "La taille du fichier dépasse la limite de 10 Mo.",
    },
  },
};
