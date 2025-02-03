/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "Carrello",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "Questo sito utilizza cookies.",
          acknowledge: "Ok, ho capito",
          more: "Maggiori informazioni",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "Nessun prodotto trovato",
          oneResultHeadline: "Un prodotto trovato",
          resultsHeadline: "Sono stati trovati ${resultsCount} prodotti",
          seeAll: "Visualizza tutti i (${count}) risultati",
        },
        searchInput: {
          placeholder: "Ricerca",
        },
      },
    },
    notification: {
      imageUploaded: "Immagine caricata con successo!",
      fileSizeExceeded: "La dimensione del file supera il limite di 10MB.",
    },
  },
};
