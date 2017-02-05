/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: 'Warenkorb',
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: 'Diese Website nutzt Cookies, um bestmögliche Funktionalität bieten zu können.',
          acknowledge: 'Verstanden',
          more: 'Weitere Informationen',
        },
      },
    },
    search: {
      components: {
        searchResults: {
          placeholder: 'Suche',
          noResultsHeadline: 'Es wurden keine Produkte gefunden',
          oneResultHeadline: 'Es wurde ein Produkt gefunden',
          resultsHeadline: 'Es wurden ${resultsCount} Produkte gefunden',
        },
        searchInput: {
          placeholder: 'Suche',
        },
      },
    },
  },
};
