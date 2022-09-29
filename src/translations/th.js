/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "รถเข็น",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "เว็บไซต์นี้ใช้คุกกี้",
          acknowledge: "โอเค เข้าใจแล้ว",
          more: "ข้อมูลมากกว่านี้",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "ไม่พบสินค้า",
          oneResultHeadline: "พบสินค้าหนึ่งรายการ",
          resultsHeadline: "พบผลิตภัณฑ์ ${resultsCount} รายการ",
          seeAll: "ดูผลลัพธ์ทั้งหมด (${count})",
        },
        searchInput: {
          placeholder: "ค้นหา",
        },
      },
    },
  },
};
