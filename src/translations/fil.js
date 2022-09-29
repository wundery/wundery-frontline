/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "Cart",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "Gumagamit ang website na ito ng cookies.",
          acknowledge: "Sige nakuha ko",
          more: "Karagdagang informasiyon",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "Walang nakitang mga produkto",
          oneResultHeadline: "Isang produkto ang natagpuan",
          resultsHeadline: "Nakita ang mga produkto ng ${resultsCount}.",
          seeAll: "Tingnan ang lahat ng resulta (${count})",
        },
        searchInput: {
          placeholder: "Maghanap",
        },
      },
    },
  },
};
