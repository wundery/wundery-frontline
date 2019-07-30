/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: 'Cart',
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: 'This website uses cookies to',
          acknowledge: 'Okay, git it',
          more: 'More information',
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: 'No products found',
          oneResultHeadline: 'One product found',
          resultsHeadline: '${resultsCount} products were found',
          seeAll: 'See all results (${count})'
        },
        searchInput: {
          placeholder: 'Search',
        },
      },
    },
  },
};
