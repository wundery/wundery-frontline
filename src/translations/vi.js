/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "Giỏ hàng",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "Trang web này sử dụng cookie.",
          acknowledge: "Được rồi, đã rõ",
          more: "Thêm thông tin",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "Không tìm thấy sản phẩm",
          oneResultHeadline: "Một sản phẩm được tìm thấy",
          resultsHeadline: "${resultsCount} sản phẩm đã được tìm thấy",
          seeAll: "Xem tất cả kết quả (${count})",
        },
        searchInput: {
          placeholder: "Tìm kiếm",
        },
      },
    },
    notification: {
      imageUploaded: "Ảnh đã được tải lên thành công!",
      fileSizeExceeded: "Kích thước tệp vượt quá giới hạn 10MB.",
    },
  },
};
