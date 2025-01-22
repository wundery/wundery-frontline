/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "Carrinho",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "Este site usa cookies.",
          acknowledge: "Ok, entendi",
          more: "Mais Informações",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "Nenhum produto encontrado",
          oneResultHeadline: "Um produto encontrado",
          resultsHeadline: "${resultsCount} produtos foram encontrados",
          seeAll: "Ver todos os resultados (${count})",
        },
        searchInput: {
          placeholder: "Procurar",
        },
      },
    },
    notification: {
      imageUploaded: "Imagem enviada com sucesso!",
      fileSizeExceeded: "O tamanho do arquivo excede o limite de 10MB.",
    },
  },
};
