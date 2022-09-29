/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "Корзина",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "Этот веб-сайт использует файлы cookie.",
          acknowledge: "Хорошо, понял",
          more: "Дополнительная информация",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "Товары не найдены",
          oneResultHeadline: "Один продукт найден",
          resultsHeadline: "Найдено товаров: ${resultsCount}",
          seeAll: "Просмотреть все результаты (${count})",
        },
        searchInput: {
          placeholder: "Поиск",
        },
      },
    },
  },
};
