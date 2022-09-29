/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */

export default {
  features: {
    cart: {
      containers: {
        cartbox: {
          cart: "大车",
        },
      },
    },
    cookieBanner: {
      containers: {
        cookieBanner: {
          info: "本网站使用cookies.",
          acknowledge: "好，知道了",
          more: "更多信息",
        },
      },
    },
    search: {
      components: {
        searchResults: {
          noResultsHeadline: "未找到产品",
          oneResultHeadline: "找到一个产品",
          resultsHeadline: "找到 ${resultsCount} 个产品",
          seeAll: "查看所有结果 (${count})",
        },
        searchInput: {
          placeholder: "搜索",
        },
      },
    },
  },
};
