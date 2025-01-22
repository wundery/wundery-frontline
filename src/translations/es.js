/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "Carrito",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "Este sitio web utiliza cookies.",
          acknowledge: "Okay, entiendo",
          more: "Más información",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "No se encontraron productos",
          oneResultHeadline: "Un producto encontrado",
          resultsHeadline: "${resultsCount} productos encontrados",
          seeAll: "Ver todos los resultados (${count})",
        },
        searchInput: {
          placeholder: "Buscar",
        },
      },
    },
    notification: {
      imageUploaded: "¡Imagen subida con éxito!",
      fileSizeExceeded: "El tamaño del archivo supera el límite de 10 MB.",
    },
  },
};
