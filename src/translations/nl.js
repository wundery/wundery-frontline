/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "Winkelwagen",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "Deze website maakt gebruik van cookies.",
          acknowledge: "Oké, begrepen",
          more: "Meer informatie",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "Geen producten gevonden",
          oneResultHeadline: "Eén product gevonden",
          resultsHeadline: "Er zijn ${resultsCount} producten gevonden",
          seeAll: "Bekijk alle resultaten (${count})",
        },
        searchInput: {
          placeholder: "Zoekopdracht",
        },
      },
    },
  },
};
