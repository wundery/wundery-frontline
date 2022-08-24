/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "Wózek",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "Ta strona korzysta z plików cookie.",
          acknowledge: "OK, rozumiem",
          more: "Więcej informacji",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "Nie znaleziono produktów",
          oneResultHeadline: "Znaleziono jeden produkt",
          resultsHeadline: "Znaleziono ${resultsCount} produktów",
          seeAll: "Zobacz wszystkie wyniki (${count})",
        },
        searchInput: {
          placeholder: "Szukaj",
        },
      },
    },
  },
};
