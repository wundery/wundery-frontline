/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "कार्ट",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "यह वेबसाइट कुकीज़ का उपयोग करती है।",
          acknowledge: "ठीक है समझ आ गया",
          more: "अधिक जानकारी",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "कोई उत्पाद नहीं मिला",
          oneResultHeadline: "एक उत्पाद मिला",
          resultsHeadline: "${resultsCount} उत्पाद मिले",
          seeAll: "सभी परिणाम देखें (${count})",
        },
        searchInput: {
          placeholder: "खोज",
        },
      },
    },
    notification: {
      imageUploaded: "छवि सफलतापूर्वक अपलोड की गई!",
      fileSizeExceeded: "फाइल का आकार 10MB की सीमा से अधिक है।",
    },
  },
};
