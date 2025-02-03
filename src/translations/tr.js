/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "Araba",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "Bu web sitesi çerezleri kullanır.",
          acknowledge: "Tamam anladım",
          more: "Daha fazla bilgi",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "Ürün bulunamadı",
          oneResultHeadline: "Bir ürün bulundu",
          resultsHeadline: "${resultsCount} ürün bulundu",
          seeAll: "Tüm sonuçları görün (${count})",
        },
        searchInput: {
          placeholder: "Arama",
        },
      },
    },
    notification: {
      imageUploaded: "Görsel başarıyla yüklendi!",
      fileSizeExceeded: "Dosya boyutu 10MB sınırını aşıyor.",
    },
  },
};
