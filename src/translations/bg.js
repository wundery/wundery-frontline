/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "Количка",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "Този уебсайт използва бисквитки.",
          acknowledge: "Разбирам и приемам",
          more: "Повече информация",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "Няма намерени продукти",
          oneResultHeadline: "Един продукт е открит",
          resultsHeadline: "${resultsCount} продукти са открити",
          seeAll: "Виж всички (${count}) резултати",
        },
        searchInput: {
          placeholder: "Търси",
        },
      },
    },
    notification: {
      imageUploaded: "Изображението беше качено успешно!",
      fileSizeExceeded: "Размерът на файла надвишава ограничението от 10MB.",
    },
  },
};
