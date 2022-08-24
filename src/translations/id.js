/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "Keranjang",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "Situs web ini menggunakan cookie.",
          acknowledge: "OK saya mengerti",
          more: "Informasi lebih lanjut",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "Tidak ada produk yang ditemukan",
          oneResultHeadline: "Satu produk ditemukan",
          resultsHeadline: "${resultsCount} produk ditemukan",
          seeAll: "Lihat semua hasil (${count})",
        },
        searchInput: {
          placeholder: "Mencari",
        },
      },
    },
  },
};
