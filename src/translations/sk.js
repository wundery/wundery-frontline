/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "Košík",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "Táto webová stránka používa súbory cookie.",
          acknowledge: "Dobre, rozumiem",
          more: "Viac informácií",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "Neboli nájdené žiadne produkty",
          oneResultHeadline: "Nájdený jeden produkt",
          resultsHeadline: "${resultsCount} produktov bolo nájdených",
          seeAll: "Pozrite si všetky výsledky (${count})",
        },
        searchInput: {
          placeholder: "Hľadať",
        },
      },
    },
    notification: {
      imageUploaded: "Obrázok bol úspešne nahraný!",
      fileSizeExceeded: "Veľkosť súboru prekračuje limit 10MB.",
    },
  },
};
