/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "কার্ট",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "এই ওয়েবসাইট কুকিজ ব্যবহার করে.",
          acknowledge: "আচ্ছা আমি বুঝে গেছি",
          more: "অধিক তথ্য",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "কোন পণ্য পাওয়া যায়নি",
          oneResultHeadline: "একটি পণ্য পাওয়া গেছে",
          resultsHeadline: "${resultsCount} পণ্য পাওয়া গেছে",
          seeAll: "সব ফলাফল দেখুন (${count})",
        },
        searchInput: {
          placeholder: "অনুসন্ধান করুন",
        },
      },
    },
    notification: {
      imageUploaded: "ছবি সফলভাবে আপলোড করা হয়েছে!",
      fileSizeExceeded: "ফাইলের আকার 10MB সীমা অতিক্রম করেছে।",
    },
  },
};
