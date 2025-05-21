import has from "lodash/has";
import { Cart, CookieBanner, Search } from "services";
import { config, translation } from "globals";
import "core-js/stable";
import "regenerator-runtime/runtime";

class Frontline {
  static defaultOptions = {
    debug: false,
    mock: false,
  };

  constructor(options = {}) {
    /**
     * Client options
     * @type {Object}
     */
    this.options = { ...Frontline.defaultOptions, ...options };

    /**
     * Tracks info about auth status
     * @type {String}
     */
    this.authStatus = "encoded";

    /**
     * Containes the decoded auth information
     * @type {Object}
     */
    this.decodedAuthData = null;

    this.decodeAuthData();
    this.logInfo();

    if (typeof LOAD_INFINITY_CLASSES !== "undefined") {
      this.page = 1;
      this.pagination();
    }

    translation.locale = this.options["locale"];

    this.renderUploadedImages();
    this.initImageUpload();
  }

  requireOption(name) {
    if (!has(this.options, name)) {
      throw new Error(`Option '${name}' does not exist`);
    }

    return this.options[name];
  }

  newSearch(options = {}) {
    this.log("Building new search instance");

    return new Search(this, options);
  }

  newCookieBanner(options = {}) {
    this.log("Building new cookie banner instance");

    return new CookieBanner(this, options);
  }

  newCart(options = {}) {
    this.log("Building new cart instance");

    return new Cart(this, options);
  }

  decodeAuthData() {
    if (this.decodedAuthData) {
      return this.decodedAuthData;
    }

    try {
      this.decodedAuthData = JSON.parse(
        window.atob(this.requireOption("auth"))
      );
      this.authStatus = "decoded";
      return this.decodedAuthData;
    } catch (error) {
      this.authStatus = "decoding-failed";
      return {};
    }
  }

  insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  appendTextNextToCopyright(locale) {
    document.addEventListener("DOMContentLoaded", (event) => {
      var branchbobLink =
        "https://www.branchbob.com/" + (locale == "de" ? "" : "en");
      var element = document.querySelector(
        ".footer-wrapper .credits, .copy-right .container p"
      );
      if (element) {
        element.innerHTML +=
          " | <a href='" + branchbobLink + "'>Powered by branchbob</a>";
      }
      var elemenInBobAlice = document.querySelector(
        ".footer .list-inline:last-child"
      );
      if (elemenInBobAlice) {
        var el = document.createElement("a");
        el.href = branchbobLink;
        el.innerHTML = "Powered by branchbob";
        this.insertAfter(elemenInBobAlice, el);
      }
    });
  }

  /**
   * Log important information
   */
  logInfo() {
    const { storeId } = this.options;

    this.log("Building new Frontline instance");
    this.log(`Version: ${config.get("version")}`);
    this.log(`Used locale: ${translation.locale}`);
    this.log(`Auth: ${this.authStatus}`);
    this.log(`storeId: ${storeId}`);
  }

  /**
   * Log-wrapper
   */
  log(...args) {
    if (this.options.debug) {
      if (args && typeof args[0] === "string") {
        const newArgs = args;
        newArgs[0] = `[Frontline] ${newArgs[0]}`;
        // eslint-disable-next-line no-console
        console.log(...newArgs);
      } else {
        // eslint-disable-next-line no-console
        console.log(...args);
      }
    }
  }

  /**
   * Load Infinity
   */

  async getProducts(apiEndpoint, params) {
    const response = await fetch(`${apiEndpoint}/products.json?${params}`, {
      method: "GET",
    });

    return response.json();
  }

  getCookieValue = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : "";
  };

  loadProducts = (designId, storeId, categoryId, apiEndpoint) => {
    if (this.loadingNow) {
      return;
    }
    this.loadingNow = true;

    const params = new URLSearchParams();
    params.set("store_id", storeId);
    params.set("category_id", categoryId);
    params.set("customer_id", this.getCookieValue("secure_customer_sig"));
    params.set("page", this.page + 1);
    params.set("design_id", designId);
    params.set("q", new URLSearchParams(document.location.search).get("q"));

    const loadMoreBtn = document.querySelector(".load-more-btn");
    const loadingSpinner = loadMoreBtn && loadMoreBtn.querySelector("img");
    const loadMoreBtnText =
      loadMoreBtn && loadMoreBtn.querySelector(".load-more-btn-text");

    this.getProducts(apiEndpoint, params)
      .then((response) => {
        this.page = this.page + 1;
        this.populateUI(response.html);

        if (this.page == response.total_pages) {
          const loadMore = document.querySelector(
            LOAD_INFINITY_CLASSES.loadMore
          );
          if (loadMore) {
            loadMore.remove();
          }

          const loadMoreBtnWrapper = document.querySelector(
            ".load-more-btn-wrapper"
          );
          if (loadMoreBtnWrapper) {
            loadMoreBtnWrapper.remove();
          }
        } else {
          if (loadMoreBtn) {
            loadingSpinner.classList.add("display-off");
            loadMoreBtnText.classList.remove("display-off");
            loadMoreBtn.disabled = false;
          }
        }

        this.loadingNow = false;
      })
      .catch((error) => {
        console.error("Error loading products:", error);

        if (loadMoreBtn) {
          loadingSpinner.classList.add("display-off");
          loadMoreBtnText.classList.remove("display-off");
          loadMoreBtn.disabled = false;
        }

        this.loadingNow = false;
      });
  };

  createObserver = (designId, storeId, categoryId, apiEndpoint) => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadProducts(designId, storeId, categoryId, apiEndpoint);
        }
      });
    });

    const loadMoreElement = document.querySelector(
      LOAD_INFINITY_CLASSES.loadMore
    );

    if (loadMoreElement) {
      intersectionObserver.observe(loadMoreElement);
    }
  };

  populateUI = (newProducts) => {
    const products = document.querySelector(
      LOAD_INFINITY_CLASSES.appendProducts
    );

    products.insertAdjacentHTML("beforeend", newProducts);
  };

  pagination() {
    document.addEventListener("DOMContentLoaded", () => {
      const category = document.querySelector(LOAD_INFINITY_CLASSES.category);
      if (!category) {
        console.warn("Category element not found");
        return;
      }

      const categoryId = category.getAttribute("data-id");
      const { designId, storeId, apiEndpoint } = this.options;
      if (categoryId) {
        this.createObserver(designId, storeId, categoryId, apiEndpoint);
      }

      const loadMoreBtn = document.querySelector(".load-more-btn");
      const loadingSpinner = loadMoreBtn && loadMoreBtn.querySelector("img");
      const loadMoreBtnText =
        loadMoreBtn && loadMoreBtn.querySelector(".load-more-btn-text");
      if (loadMoreBtn && loadingSpinner && loadMoreBtnText) {
        loadMoreBtn.addEventListener("click", () => {
          loadingSpinner.classList.remove("display-off");
          loadMoreBtnText.classList.add("display-off");
          loadMoreBtn.disabled = true;
          this.loadProducts(designId, storeId, categoryId, apiEndpoint);
        });
      }
    });
  }

  renderUploadedImages() {
    document.addEventListener("DOMContentLoaded", () => {
      const previewContainer = document.getElementById("preview-container");
      const urlsElement = document.getElementById("uploaded-file-urls");
      if (!previewContainer || !urlsElement) {
        console.warn("Required elements for image upload not found");
        return;
      }

      previewContainer.innerHTML = "";

      if (urlsElement && urlsElement.value) {
        try {
          const uploadedUrls = JSON.parse(urlsElement.value);
          if (Array.isArray(uploadedUrls)) {
            uploadedUrls.forEach((url) => {
              const imgElement = document.createElement("img");
              imgElement.src = url;
              imgElement.className = "w-full h-auto rounded-lg";
              previewContainer.appendChild(imgElement);
            });
          }
        } catch (error) {
          console.error("Error parsing uploaded URLs:", error);
        }
      }
    });
  }

  showNotification(message, type = "success", duration = 3000) {
    const notification = document.createElement("div");
    notification.className = `fixed top-[80px] right-[40px] bg-white border p-[5px_10px] rounded-[3px] text-[13px] font-normal border-[1px_solid_var(--error-color)] text-[var(--error-color)] shadow-md transition-opacity duration-300 opacity-0`;

    if (type === "success") {
      notification.style.borderColor = "var(--success-color)";
      notification.style.color = "var(--success-color)";
    } else {
      notification.style.borderColor = "var(--error-color)";
      notification.style.color = "var(--error-color)";
    }

    notification.innerHTML = `
      <div class="wundery-cart-notification-message flex items-center gap-2">
        <i class="fa-regular ${
          type === "success" ? "fa-circle-check" : "fa-circle-xmark"
        }"></i>
        ${message}
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "1";
    }, 100);

    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, duration);
  }

  initImageUpload() {
    document.addEventListener("DOMContentLoaded", () => {
      const chooseFileBtn = document.getElementById("choose-file-btn");
      const uploadFileInput = document.getElementById("upload-file-input");
      if (!chooseFileBtn || !uploadFileInput) {
        console.warn("Required elements for image upload not found");
        return;
      }

      const spinnerImg = chooseFileBtn.querySelector("img");

      chooseFileBtn.addEventListener("click", function () {
        uploadFileInput.click();
      });

      uploadFileInput.addEventListener("change", async (event) => {
        const previewContainer = document.getElementById("preview-container");
        const urlsElement = document.getElementById("uploaded-file-urls");
        let uploadedUrls = urlsElement.value
          ? JSON.parse(urlsElement.value)
          : [];

        const files = event.target.files;

        if (files.length) {
          chooseFileBtn.disabled = true;
          spinnerImg.classList.remove("hidden");

          for (const file of files) {
            try {
              const response = await this.uploadImage(file);
              if (response) {
                uploadedUrls.push(response);
                urlsElement.value = JSON.stringify(uploadedUrls);

                this.showNotification(
                  translation.value("features.notification.imageUploaded"),
                  "success"
                );

                const reader = new FileReader();
                reader.onload = function (e) {
                  // Create image wrapper
                  const imgWrapper = document.createElement("div");
                  imgWrapper.className = "relative inline-block w-32 h-32";
                  // Create image element
                  const imgElement = document.createElement("img");
                  imgElement.src = e.target.result;
                  imgElement.className =
                    "object-cover w-full h-auto rounded-lg md:h-32";
                  // Create remove button
                  const removeButton = document.createElement("button");
                  removeButton.innerHTML = "&times;";
                  removeButton.className =
                    "absolute top-0 right-0 flex items-center justify-center w-6 h-6 mt-1 mr-1 rounded-full cursor-pointer bg-[var(--button-color)] text-white";
                  removeButton.onclick = function () {
                    // Get the latest uploadedUrls
                    let latestUploadedUrls = urlsElement.value
                      ? JSON.parse(urlsElement.value)
                      : [];
                    latestUploadedUrls = latestUploadedUrls.filter(
                      (url) => url !== response
                    );
                    // Update hidden input with new values
                    urlsElement.value = JSON.stringify(latestUploadedUrls);
                    // Remove the image wrapper from UI
                    imgWrapper.remove();
                  };
                  // Append elements
                  imgWrapper.appendChild(imgElement);
                  imgWrapper.appendChild(removeButton);
                  previewContainer.appendChild(imgWrapper);
                };
                reader.readAsDataURL(file);
              }
            } catch (error) {
              console.error("Image upload failed:", error);
            }
          }
          chooseFileBtn.disabled = false;
          spinnerImg.classList.add("hidden");
        }
      });
    });
  }

  async uploadImage(file) {
    const { storeId, apiEndpoint } = this.options;
    const urlsElement = document.querySelector("#uploaded-file-urls");
    const existingUrls = urlsElement.value ? JSON.parse(urlsElement.value) : [];

    try {
      // Step 1: Get signed URL
      const signResponse = await fetch(`${apiEndpoint}/uploads/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: file.name,
          content_type: file.type,
          asset_type: "product_image",
          imagable_title: file.name,
          file_size: file.size,
          store_id: storeId,
        }),
      });
      const signData = await signResponse.json();
      if (signResponse.status === 422) {
        this.showNotification(
          translation.value("features.notification.fileSizeExceeded"),
          "error"
        );
        return;
      }
      const { url, fields } = signData;

      // Step 2: Upload file to S3
      const formData = new FormData();
      Object.keys(fields).forEach((key) => {
        formData.append(key, fields[key]);
      });
      formData.append("file", file);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!uploadResponse.ok) {
        throw new Error(
          `Failed to upload file to S3: ${uploadResponse.statusText}`
        );
      }

      const fileUrl = `${url}/${fields.key}`;
      existingUrls.push(fileUrl);
      urlsElement.value = JSON.stringify(existingUrls);

      return fileUrl;
    } catch (error) {
      throw error;
    }
  }
}

export default Frontline;
