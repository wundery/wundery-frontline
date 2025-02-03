/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "Košarica",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "Ta spletna stran uporablja piškotke.",
          acknowledge: "V redu, razumem",
          more: "Več informacij",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "Ni najdenih izdelkov",
          oneResultHeadline: "Najden je en izdelek",
          resultsHeadline: "${resultsCount} izdelkov je bilo najdenih",
          seeAll: "Poglejte vse rezultate (${count})",
        },
        searchInput: {
          placeholder: "Išči",
        },
      },
    },
    notification: {
      imageUploaded: "Slika je bila uspešno naložena!",
      fileSizeExceeded: "Velikost datoteke presega omejitev 10MB.",
    },
  },
};
