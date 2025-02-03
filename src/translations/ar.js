/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "عربة التسوق",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "هذا الموقع يستخدم ملفات تعريق الارتباط.",
          acknowledge: "حسنًا، لقد حصلت عليه",
          more: "المزيد من المعلومات",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "لم يتم العثور على أي منتجات",
          oneResultHeadline: "تم العثور على منتج واحد",
          resultsHeadline: "${resultsCount} تم العثور على منتج..",
          seeAll: "مشاهدة كل النتائج (${count})",
        },
        searchInput: {
          placeholder: "بحث",
        },
      },
    },
    notification: {
      imageUploaded: "تم تحميل الصورة بنجاح!",
      fileSizeExceeded: "حجم الملف يتجاوز الحد الأقصى 10 ميجابايت.",
    },
  },
};
